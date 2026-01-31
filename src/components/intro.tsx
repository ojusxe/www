import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { IoDocument } from "react-icons/io5";
import { CgMailForward } from "react-icons/cg";
import { calculateAge } from "../lib/utils";

export default function Intro() {
  return (
    <>
      <h2>
        CIAO! I&apos;M OJUS<span className="">.</span>
      </h2>
      <p>
        i'm a frontend-first full stack developer and final semester CS undergrad{" "}
        <Link href="https://ptu.ac.in/">@ punjab technical university</Link>,{" "}
        {calculateAge()} y/o, from{" "}
        <a href="https://panipat.gov.in/">panipat, HR (india)</a>.<br />
        <br />
        reach out <CgMailForward className="h-5 w-5 inline-block" />
        <Link
          href="mailto:ojusxe@gmail.com"
          className="text-gray-300 relative group hover:underline"
        >
          ojusxe@gmail.com
        </Link>{" "}
      </p>
      <div className="flex items-center font-mono opacity-80 hover:opacity-100 gap-4">
        <div className="">
          <span className="flex md:flex-row flex-col gap-1 md:gap-3 pt-2">
            {socials.map(({ icon: Icon, label, href }) => (
              <div key={label} className="flex items-center">
                [ <Icon /> ]{" "}
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  className="flex items-center transition-colors gap-2"
                >
                  <span className="">{label.toLocaleUpperCase()}</span>
                </Link>
              </div>
            ))}
          </span>
        </div>
      </div>
    </>
  );
}

const socials = [
  {
    icon: FaGithub,
    label: "GITHUB",
    href: "https://github.com/ojusxe",
  },
  {
    icon: FaXTwitter,
    label: "TWITTER",
    href: "https://x.com/ojusxe",
  },
  {
    icon: FaLinkedin,
    label: "LINKEDIN",
    href: "https://linkedin.com/in/ojusxe",
  },
  {
    icon: Pageo,
    label: "PAGEO",
    href: "https://pageo.me/ojus",
  },
  {
    icon: IoDocument,
    label: "RÉSUMÉ",
    href: "https://drive.google.com/file/d/1f4YXh2QCQdbWx-j72nVZMJQtrPfK1UQi/view?usp=sharing",
  },
];

function Pageo ({ size = 16 }: { size?: number }) {
  return (
    <svg
      role="img"
      viewBox="0 0 375 375"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
    >
      <title>pageo</title>
      <path
        d="M 324.714844 137.515625 C 269.128906 148.441406 263.117188 151.394531 253.21875 201.871094 C 240.304688 267.722656 151.53125 207.359375 137.808594 272.441406 C 136 281.019531 116.058594 375.59375 48.253906 335.554688 C 14.429688 315.582031 0.339844 131.222656 112.832031 81.964844 C 300.019531 0 402.910156 122.148438 324.714844 137.515625 Z M 324.714844 137.515625"
        fillRule="evenodd"
      />
    </svg>
  );
};