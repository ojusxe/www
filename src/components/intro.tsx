import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { IoDocument } from "react-icons/io5";
import { CgMailForward } from "react-icons/cg";
import { calculateAge } from "../lib/utils";
import { PageoIcon } from "./directory";


export default function Intro() {
  return (
    <>
      <h2>
        CIAO! I&apos;M OJUS<span className="">.</span>
      </h2>
      <p>
        i'm a computer science undergrad{" "}
        <Link href="https://ptu.ac.in/">@punjab technical university</Link>,{" "}
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
                  <span className="">{label}</span>
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
    icon: PageoIcon,
    label: "PAGEO",
    href: "https://pageo.me/ojus",
  },
  {
    icon: IoDocument,
    label: "RESUME",
    href: "https://drive.google.com/file/d/1f4YXh2QCQdbWx-j72nVZMJQtrPfK1UQi/view?usp=sharing",
  },
];
