import Link from "next/link";

export default function Directory() {
  return (
    <>
      <h4>DIRECTORIES:</h4>
      <ul>
        <li>
          <Link href="/logs">logs</Link>
        </li>
        <li>
          <Link href="/resources">resources</Link>
        </li>
        <li>
          <Link href="/projects">past projects</Link>
        </li>
        <li>
          <Link href="/dreamspace">dreamspace</Link>
        </li>
        <li>
          <Link href="/radio">radio</Link>
        </li>
        <li>
          <Link href="/manage">manage</Link> (only for ojus)
        </li>
      </ul>
    </>
  );
}

