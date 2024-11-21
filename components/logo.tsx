import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Logo = ({
  fontSize = "text-2xl",
  iconSize = 20,
}: {
  fontSize?: string;
  iconSize?: number;
}) => {
  return (
    <Link
      href="/"
      className={cn(
        "text-2xl font-extrabold flex items-center gap-2",
        fontSize
      )}
    >
      <div className="rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 p-2">
        <Image
          src="/logo.svg"
          alt="logo"
          width={iconSize}
          height={iconSize}
          className="rounded-xl"
        />
      </div>
      <div>
        <span className="bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">
          Data
        </span>
        <span className="text-stone-700 dark:text-stone-500">Scrape</span>
      </div>
    </Link>
  );
};
export default Logo;
