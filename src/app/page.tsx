import CurrentProjects from "@/components/current-projects";
import TLDR from "@/components/tldr";
import Experience from "@/components/experience";
import PastProjects from "@/components/past-projects";
import MdxLayout from "@/components/ui/mdx-layout";
import Intro from "@/components/intro";

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