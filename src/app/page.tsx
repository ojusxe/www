import CurrentProjects from "../components/current-projects";
import TLDR from "../components/tldr";
import Experience from "../components/experience";
import PastProjects from "../components/past-projects";
import MdxLayout from "../components/ui/mdx-layout";
import Intro from "../components/intro";
import Achievements from "@/components/achievements";

export const revalidate = 60 // Revalidate every 60 seconds

export default async function HomePage() {
  return (
    <MdxLayout>
      <Intro />
      <CurrentProjects />
      <Experience />
      <Achievements />
      <TLDR />
    </MdxLayout>
  );
}
