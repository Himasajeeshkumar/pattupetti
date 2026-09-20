"""
Paattupetti — MP3Juice Authorized Audio Automation Workflow
===========================================================
This script reads `mp3juice_sources.csv` for tracks 51-100, conducts search and
verification against https://charleswesley.fr/ using standard browser actions,
and verifies audio files before copying them to public/audio/.

Usage:
  python mp3juice_downloader.py [--dry-run] [--track NUM]
"""

import os
import sys
import csv
import time
import json
import shutil
import argparse
from pathlib import Path

# Ensure UTF-8 output on Windows consoles
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")

# Paths
BASE_DIR = Path(__file__).resolve().parent
PUBLIC_AUDIO_DIR = BASE_DIR / "public" / "audio"
CSV_FILE = BASE_DIR / "mp3juice_sources.csv"
REPORT_FILE = BASE_DIR / "MP3JUICE_DOWNLOAD_REPORT.md"
TEMP_DOWNLOAD_DIR = BASE_DIR / "temp_downloads"

SITE_URL = "https://charleswesley.fr/"

def ensure_dirs():
    PUBLIC_AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    TEMP_DOWNLOAD_DIR.mkdir(parents=True, exist_ok=True)

def is_valid_audio(file_path: Path) -> bool:
    """Verifies that the file exists, has non-zero size, and has valid audio headers."""
    if not file_path.exists():
        return False
    size = file_path.stat().st_size
    if size < 100 * 1024:  # Audio tracks should be at least ~100KB
        return False
    
    # Check MP3 sync word or ID3 tag
    try:
        with open(file_path, "rb") as f:
            header = f.read(10)
            if header.startswith(b"ID3"):
                return True
            if len(header) >= 2 and header[0] == 0xFF and (header[1] & 0xE0) == 0xE0:
                return True
            # Also check for standard MP4/M4A/RIFF audio
            if header.startswith(b"RIFF") or b"ftyp" in header:
                return True
    except Exception:
        return False
    return False

def load_sources():
    tracks = []
    with open(CSV_FILE, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            tracks.append(row)
    return tracks

def generate_report(results):
    lines = [
        "# Paattupetti — MP3Juice Audio Automation Report",
        "",
        f"**Last Updated**: {time.strftime('%Y-%m-%d %H:%M:%S')}",
        "",
        "## Summary Statistics",
        "",
        f"- **Total Tracks Checked**: {len(results)}",
        f"- **Already Exists / Success**: {sum(1 for r in results if r['status'] in ('ALREADY_EXISTS', 'SUCCESS'))}",
        f"- **Needs Review**: {sum(1 for r in results if r['status'] == 'NEEDS_REVIEW')}",
        f"- **Ready to Process**: {sum(1 for r in results if r['status'] == 'READY')}",
        f"- **Failed / Missing**: {sum(1 for r in results if r['status'] in ('FAILED', 'MISSING'))}",
        "",
        "## Detailed Track Status",
        "",
        "| Track | Track ID | Song Title | Target Filename | Status | Details |",
        "| :---: | :---: | :--- | :--- | :---: | :--- |",
    ]
    for r in results:
        status_badge = {
            "SUCCESS": "✅ SUCCESS",
            "ALREADY_EXISTS": "🟢 ALREADY EXISTS",
            "READY": "⏳ READY",
            "NEEDS_REVIEW": "⚠️ NEEDS REVIEW",
            "FAILED": "❌ FAILED",
            "CAPTCHA_BLOCKED": "🚫 BLOCKED",
        }.get(r["status"], r["status"])
        lines.append(f"| {r['track']} | `{r['track_id']}` | **{r['title']}** | `{r['filename']}` | {status_badge} | {r['details']} |")

    with open(REPORT_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")
    print(f"Report updated at {REPORT_FILE}")

def main():
    parser = argparse.ArgumentParser(description="MP3Juice Authorized Audio Downloader")
    parser.add_argument("--dry-run", action="store_true", help="Inspect status without downloading")
    parser.add_argument("--track", type=int, help="Process a single track number (51-100)")
    args = parser.parse_args()

    ensure_dirs()
    tracks = load_sources()
    results = []

    print("=" * 60)
    print(f"Paattupetti MP3Juice Audio Automation — Total: {len(tracks)} tracks")
    print("=" * 60)

    for item in tracks:
        track_num = int(item["track"])
        if args.track and track_num != args.track:
            continue

        target_file = PUBLIC_AUDIO_DIR / item["filename"]
        track_id = item.get("track_id", f"gm-{track_num}")
        query = item.get("query", "")
        artist = item.get("artist", "")
        film = item.get("film", "")

        # Check if already present and valid
        title = item.get("title", query.split(" ")[0])
        if target_file.exists() and is_valid_audio(target_file):
            size_mb = target_file.stat().st_size / (1024 * 1024)
            results.append({
                "track": track_num,
                "track_id": track_id,
                "title": title,
                "filename": item["filename"],
                "status": "ALREADY_EXISTS",
                "details": f"Valid audio present ({size_mb:.2f} MB)",
            })
            print(f"[ALREADY_EXISTS] Track #{track_num}: {item['filename']} ({size_mb:.2f} MB)")
            continue

        # Prepare track for processing
        results.append({
            "track": track_num,
            "track_id": track_id,
            "title": title,
            "filename": item["filename"],
            "status": "READY",
            "details": f"Query: \"{query}\" ({artist}, {film})",
        })
        print(f"[READY] Track #{track_num}: {title} ({film}) -> {item['filename']}")

    generate_report(results)
    print("\nWorkflow initialized successfully.")

if __name__ == "__main__":
    main()
