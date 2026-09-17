import Image from "next/image";

export default function BrandLogo() {
  return (
    <div className="flex flex-col items-center">
      <Image
        src="/logo.png"
        alt="പാട്ടുപെട്ടി"
        width={430}
        height={150}
        priority
        className="h-auto w-[250px] drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)] sm:w-[420px]"
      />
      <p className="-mt-1 text-center font-display text-[11px] text-cream/85 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-[15px]">
        പാട്ടുകൾക്കപ്പുറം, ഓർമ്മകളുടെ ഒരു പെട്ടി.
      </p>
    </div>
  );
}
