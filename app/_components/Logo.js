import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flux items-center gap-4 z-10">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Image src="/logo.png" height="60" width="60" alt="logo" />
        <p>The Wild Oasis</p>
      </div>
    </Link>
  );
}

export default Logo;
