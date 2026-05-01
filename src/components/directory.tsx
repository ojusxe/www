import Link from "next/link";
import { DIRECTORY_LINKS } from "@/constants/config";

export default function Directory() {
  return (
    <>
      <h4>DIRECTORIES:</h4>
      <ul>
        {DIRECTORY_LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
            {"suffix" in link ? link.suffix : null}
          </li>
        ))}
      </ul>
    </>
  );
}

