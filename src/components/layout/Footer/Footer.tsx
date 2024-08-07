import Link from "next/link";

import GitHub from "@/components/icons/GitHub";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1920px] px-6 ">
      <div className="grid grid-cols-1 gap-8 py-12 transition-colors duration-150 border-b lg:grid-cols-12 border-zinc-600 ">
        <div className="col-span-1 lg:col-span-2">
          <Link
            href="/"
            className="flex items-center flex-initial font-bold md:mr-24"
          >
            <span className="mr-2 border rounded-full ">VNS.BLUE</span>
          </Link>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-col flex-initial md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/" className="transition duration-150 ease-in-out ">
                {/* hover:text-zinc-200 */}
                Home
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/" className="transition duration-150 ease-in-out ">
                About
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/" className="transition duration-150 ease-in-out ">
                Careers
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/" className="transition duration-150 ease-in-out ">
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-col flex-initial md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <p className="font-bold transition duration-150 ease-in-out ">
                LEGAL
              </p>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/" className="transition duration-150 ease-in-out ">
                Privacy Policy
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link href="/" className="transition duration-150 ease-in-out ">
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-start col-span-1 lg:col-span-6 lg:justify-end">
          <div className="flex items-center h-10 space-x-6">
            <a
              aria-label="Github Repository"
              href="https://github.com/masakinihirota/vns-masakinihirota"
            >
              <GitHub />
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between py-12 space-y-4 md:flex-row ">
        <div>
          <span>
            &copy; {new Date().getFullYear()} ACME, Inc. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
