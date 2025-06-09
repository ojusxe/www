import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { IoDocument } from "react-icons/io5";
import { calculateAge } from "@/lib/utils";
import config from "@/constants/config";

export default function Contact() {
  return (
    <>
        <h2>CIAO! I&apos;M OJUS<span className="animate-caret-blink">.</span></h2>
        <p>i&apos;m {calculateAge()}, from <a href="https://panipat.gov.in/">panipat (india)</a>. i'm a computer science undergrad <Link href="https://ptu.ac.in/">@punjab technical university. </Link><br />
        <br/>
        reach out:{" "}
        <Link
          href="mailto:ojusxe@gmail.com"
          className="text-gray-300 relative group hover:underline"
        >
          ojusxe@gmail.com
        </Link>{" "}
      </p>
      <div className="flex items-center font-mono opacity-80 hover:opacity-100 gap-4">
        <div className="">
          find me:{" "}
          <span className="flex sm:flex-row flex-col gap-3 pt-2">
            {socials.map(({ icon: Icon, label, href }) => (
              <div key={label}>
              <Link
                key={label}
                href={href}
                target="_blank"
                className="flex items-center transition-colors gap-2"
              >
               [<Icon/>]<span className="">{label}</span> 
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
    href: "https://github.com/ojuss",
  },
  {
    icon: FaXTwitter,
    label: "X.COM",
    href: "https://twitter.com/ojussw",
  },
  {
    icon: FaLinkedin,
    label: "LINKEDIN",
    href: "https://linkedin.com/in/ojuss",
  },
  {
    icon: IoDocument,
    label: "RESUME",
    href: "/ojusmarchcv.pdf",
  },
];