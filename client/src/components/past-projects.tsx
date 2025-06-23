import { Snippet } from "./ui/snippet";
import Image from "next/image";
import { GitHubLogoIcon, Link1Icon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function PastProjects() {
  return (
    <>
      <h4>SOME OF MY PAST PROJECTS</h4>
      <Snippet title="ROAD ANOMALY DETECTION" className="">
        <p>road anomaly detection was a part of my 6 semester minor project that leverages advanced CV techniques to identify and classify road anomalies, such as potholes, cracks, and other surface irregularities.</p>

        <p>team #22, my awesome teamates
          <a href="https://nav9v.me" target="_blank">nav9v</a>
          && 
          <a href="https://iamnikitaa.github.io/" target="_blank">nikita</a> </p>

        <Image src="/projects/rad.avif" alt="road anomaly detection" width={800} height={450} className="rounded-sm" />

        <div className="">
          <Link href="https://github.com/collabdoor/Road-Anomaly-Detection" target="_blank"><GitHubLogoIcon className="inline-block mr-2" />
          source
          </Link>
          <Link href="https://road-anomaly-detection.streamlit.app/" target="_blank"><Link1Icon className="inline-block mx-2" />
          visit
          </Link>
        </div>
      </Snippet>

      <Snippet title="COLLABDOOR && DUMBAF">
        <p>this community is made by CS undergrad students with intention to build cool stuff that touches a few hundread of lives if not thousand. started the community to provide course relevant resources for CS majors.</p>

        <p>my awesome teamates <a href="https://nav9v.me" target="_blank">nav9v</a> && <a href="https://www.github.com/iamnikitaa" target="_blank">nikita</a> && <a href="https://portfolio-priyam-srivastavas-projects-a9e142b7.vercel.app/" target="_blank">priyam</a></p>

        <Image src="/projects/dumbaf.avif" alt="collabdoor and dumbaf" width={800} height={450} className="rounded-sm" />

        <div className="">
          <Link href="https://github.com/collabdoor/dumbAF" target="_blank"><GitHubLogoIcon className="inline-block mr-2" />source</Link>
          <Link href="https://collabdoor.github.io/dumbAF" target="_blank"><Link1Icon className="inline-block mx-2" />visit</Link>
        </div>
      </Snippet>

      <Snippet title="GOPHER GOLANG">
        <p>i wanted to practice to grow out of web dev and not restrict myself to javascript frameworks. golang was a suggested language from a friend <a href="https://sanyam.xyz" target="_blank">sanyam</a>.</p>
        <p><a>project gomini</a> - a backend api built with go and gemini 2.5 to generate intelligent responses based on user prompts. </p>
        <p><a>project strip-go</a> - implementation of stripe's payment intent API integrated with go backend.</p>

        <Image src="/projects/gogo.webp" alt="gopher and go" width={800} height={450} className="rounded-sm" />
        <Link href="https://github.com/ojuss/gemini-go" target="_blank"><GitHubLogoIcon className="inline-block mr-2" />source</Link>
        <Link href="https://github.com/ojuss/stripe-payment-intent" target="_blank"><GitHubLogoIcon className="inline-block mx-2" />source</Link>
      </Snippet>

      <Snippet title="SCIENTIFIC ILLUSTRATOR PORTFOLIO">
        <p>a professionally designed portfolio website for a scientific illustrator, showcasing their work with a clean, modern interface.</p>

        <Image src="/projects/illustrations.webp" alt="gopher and go" width={800} height={450} className="rounded-sm" />

        <Link href="https://oshgupta.com" target="_blank"><Link1Icon className="inline-block mx-2" />visit</Link>
      </Snippet>
    </>
  );
}
