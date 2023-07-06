import { Poll } from "@/components/poll";
import clsx from "clsx";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function Home() {
  return (
    <div
      className={clsx(
        "bg-blue-600 text-white min-h-screen",
        spaceGrotesk.className
      )}
    >
      <main className="max-w-5xl p-8">
        <header className="mb-4">
          <h1 className="text-3xl underline underline-offset-2">
            Apollo Next.js 13 Poll Demo
          </h1>
        </header>

        <Link href="/1" className="text-2xl underline underline-offset-2">
          Poll 1
        </Link>
      </main>
    </div>
  );
}
