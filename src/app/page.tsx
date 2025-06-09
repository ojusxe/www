// import ComponentContainer from "@/components/component-container";
// import { Badge } from "@/components/dris/badge";
// import { Button } from "@/components/dris/button";

import { calculateAge } from "@/lib/utils";
import Achievements from "@/components/sections/achievements";
import CurrentProjects from "@/components/sections/current-projects";
import TLDR from "@/components/sections/tldr";
import PreviousVentures from "@/components/sections/previous-ventures";
import PastProjects from "@/components/sections/past-projects";
import Directory from "@/components/sections/directory";
import Snippets from "@/components/sections/snippets";
import MdxLayout from "@/components/mdx-layout";

export default async function HomePage() {
  return (
    <MdxLayout>
      <h2>CIAO! I&apos;M OJUS<span className="animate-caret-blink">.</span></h2>
      <p>i&apos;m {calculateAge()}, from <a href="https://www.exploreminnesota.com/media/facts-figures">panipat (india)</a>.</p>
      <p>i&apos;ve been building things and working for startups for over an year now.</p>
      <Achievements />
      <CurrentProjects />
      <p>i start lots of projects and finish very few. i don&apos;t believe in sunk cost. this list will probably be pretty different next time you see it.</p>
      <TLDR />
      <Snippets />
      <PreviousVentures />
      <PastProjects />
      <Directory />
    </MdxLayout>
  );
}