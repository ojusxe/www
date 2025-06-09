import Achievements from "@/components/sections/achievements";
import CurrentProjects from "@/components/sections/current-projects";
import TLDR from "@/components/sections/tldr";
import PreviousVentures from "@/components/sections/previous-ventures";
import PastProjects from "@/components/sections/past-projects";
import Directory from "@/components/sections/directory";
import Snippets from "@/components/sections/snippets";
import MdxLayout from "@/components/mdx-layout";
import Contact from "@/components/sections/contacts";

export default async function HomePage() {
  return (
    <MdxLayout>
      <Contact />
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