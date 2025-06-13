import CurrentProjects from "@/components/sections/current-projects";
import TLDR from "@/components/sections/tldr";
import Experience from "@/components/sections/experience";
import PastProjects from "@/components/sections/past-projects";
import MdxLayout from "@/components/mdx-layout";
import Intro from "@/components/sections/intro";

export default async function HomePage() {
  return (
    <MdxLayout>
      <Intro />
      <CurrentProjects />
      <Experience />
      <PastProjects />
      <TLDR />
    </MdxLayout>
  );
}