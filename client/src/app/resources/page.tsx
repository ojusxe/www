import { Metadata } from "next";
import MdxLayout from "../../components/ui/mdx-layout";

export const metadata: Metadata = {
  title: "RESOURCES",
  description: "links i've found interesting, helpful, inspiring or cool (firefox bookmarks).",
};

const resources = [
  { url: "https://vinay.sh/", title: "vinay.sh", description: "cofounder of loom" },
  { url: "https://ion.design/", title: "ion.design", description: "cool design tool" },
  { url: "https://f.inc/", title: "f.inc", description: "startup accelerator" },
  { url: "https://taskformer.com/", title: "taskformer.com", description: "student internships" },
  { url: "https://delve.co/", title: "delve.co", description: "automated cybersecurity" },
  { url: "https://www.benchling.com/", title: "benchling.com", description: "biotech software (by 2 guys with 0 experience)" },
  { url: "https://www.memorisely.com/", title: "memorisely.com", description: "nice design" },
  { url: "https://out.so/", title: "out.so", description: "wish i thought of this" },
  { url: "https://www.poirrier.ca/", title: "poirrier.ca", description: "good courses" },
  { url: "http://suffe.cool/", title: "suffe.cool", description: "the goat" },
  { url: "https://github.com/orgs/sfcompute/repositories", title: "sfcompute/repositories", description: "sfcompute" },
  { url: "https://farza.com/", title: "farza.com", description: "pretty inspiring" },
  { url: "https://sr.a16z.com/", title: "sr.a16z.com", description: "i will finish my app i promise" },
  { url: "https://spacetypegenerator.com/", title: "spacetypegenerator.com", description: "make cool type animations" },
  { url: "https://tailscale.com/", title: "tailscale.com", description: "seems cool" },
  { url: "https://diskprices.com/", title: "diskprices.com", description: "function >>> form" },
  { url: "https://react-ui-libraries.vercel.app/", title: "react-ui-libraries", description: "react ui libraries" },
  { url: "https://mainfra.me/", title: "mainfra.me", description: "crazy site" },
  { url: "https://ui.3x.gl/", title: "ui.3x.gl", description: "simple components" },
  { url: "https://www.fullstory.com/", title: "fullstory.com", description: "interesting idea" },
  { url: "https://brutalistwebsites.com/", title: "brutalistwebsites.com", description: "some web inspiration" },
  { url: "https://beem.computer/", title: "beem.computer", description: "waiting to see what this is" },
  { url: "https://www.outerbase.com/", title: "outerbase.com", description: "nice site" },
  { url: "https://carter.red/", title: "carter.red", description: "could be the goat" },
  { url: "https://agpt.co/", title: "agpt.co", description: "very unique site" },
  { url: "https://makelemonade.gg/", title: "makelemonade.gg", description: "interesting idea" },
  { url: "https://www.formia.so/new", title: "formia.so", description: "gatekeeping from hudson" },
  { url: "https://www.prod.so/", title: "prod.so", description: "might apply" },
  { url: "https://ibuildmyideas.com/", title: "ibuildmyideas.com", description: "love his designs" },
  { url: "https://reactflow.dev/", title: "reactflow.dev", description: "cool library for automations" },
  { url: "https://sfcompute.com/", title: "sfcompute.com", description: "this is the type of company i'd want to start" },
  { url: "https://superwall.com/", title: "superwall.com", description: "simple app paywalls" },
  { url: "https://github.com/xitanggg/open-resume?tab=AGPL-3.0-1-ov-file", title: "xitanggg/open-resume", description: "resume builder" },
  { url: "https://www.linkup.so/", title: "linkup.so", description: "i like the site" },
  { url: "https://docs.google.com/document/d/1hzkXItqc3AuWs59QEP4V42fM45G4_jWJ73Uiqk62pjs/edit?tab=t.r8rc6wq6z6pb", title: "banderson/viral-app-playbook", description: "some insight here" },
  { url: "https://www.whitescreen.online/", title: "whitescreen.online", description: "i use this on video calls" },
  { url: "https://dayjob.work/", title: "dayjob.work", description: "cool site" },
  { url: "https://www.heymeta.com/", title: "heymeta.com", description: "check site metadata" },
  { url: "https://www.twohands.studio/", title: "twohands.studio", description: "site inspiration" },
  { url: "https://www.supergood.ai/", title: "supergood.ai", description: "interesting idea" },
  { url: "https://huzzler.so/", title: "huzzler.so", description: "new fav site" },
  { url: "https://betterstack.com/", title: "betterstack.com", description: "like the site" },
  { url: "https://www.swagmagic.com/", title: "swagmagic.com", description: "they cold emailed me" },
  { url: "https://wholesale.houseofblanks.com/catalogue", title: "wholesale.houseofblanks.com", description: "great ecom design" },
  { url: "https://776.org/", title: "776.org", description: "fellowship" },
  { url: "https://www.firecrawl.dev/", title: "firecrawl.dev", description: "interesting idea" },
  { url: "https://github.com/FelipeIzolan/mi.css", title: "mi.css", description: "lightweight css" },
  { url: "https://canine.sh/", title: "canine.sh", description: "heard about this" },
  { url: "https://horizon.netscout.com/", title: "horizon.netscout.com", description: "looks cool" },
  { url: "https://www.openstatus.dev/", title: "openstatus.dev", description: "all systems operational" },
  { url: "https://pointer.so/", title: "pointer.so", description: "cool idea" },
  { url: "https://www.usevelvet.com/", title: "usevelvet.com", description: "liked the site" },
  { url: "https://tradingeconomics.com/united-states/calendar", title: "tradingeconomics.com", description: "us economic calendar" },
  { url: "https://openchangelog.com/", title: "openchangelog.com", description: "make changelogs" },
  { url: "https://gsap.com/", title: "gsap.com", description: "haven't check out yet" },
  { url: "https://devicon.dev/", title: "devicon.dev", description: "other logo svgs" },
  { url: "https://www.brandbird.app/tools/svg-company-logos", title: "brandbird.app", description: "logo svgs" },
  { url: "https://stytch.com/", title: "stytch.com", description: "1 of 20 auth tools" },
  { url: "https://grafana.com/", title: "grafana.com", description: "observability dashboard" },
  { url: "https://icon.me/", title: "icon.me", description: "interesting" },
  { url: "https://realestic.framer.website/", title: "realestic.framer.website", description: "wonder how this went" },
  { url: "https://html.spec.whatwg.org/multipage/", title: "html.spec.whatwg.org", description: "html spec" },
  { url: "https://svg2ico.com/", title: "svg2ico.com", description: "convert svgs to ico" },
  { url: "https://www.graphicdesignforum.com/", title: "graphicdesignforum.com", description: "better than reddit" },
  { url: "https://www.mentara.io/user/home", title: "mentara.io", description: "actually a good site for mock interviews" },
  { url: "https://www.hyperbrowser.ai/", title: "hyperbrowser.ai", description: "shoutout shri" },
  { url: "https://mintlify.com/", title: "mintlify.com", description: "easy docs" },
  { url: "https://quant-next.com/the-merton-jump-diffusion-model/", title: "quant-next.com", description: "options price inefficiencies" },
  { url: "https://medium.datadriveninvestor.com/i-needed-money-so-i-started-qdata-trading-deb1c1f31efc", title: "medium.datadriveninvestor.com", description: "mjd implementation" },
  { url: "https://events.ycombinator.com/ai-sus", title: "events.ycombinator.com", description: "yc startup school" },
  { url: "https://dormroomfund.com/", title: "dormroomfund.com", description: "student fund" },
  { url: "https://emilkowal.ski/", title: "emilkowal.ski", description: "nice site + good resources" },
  { url: "https://refgrow.com/", title: "refgrow.com", description: "interesting idea" },
  { url: "https://gitingest.com/", title: "gitingest.com", description: "unique design" },
  { url: "https://www.nosu.io/", title: "nosu.io", description: "find hackathons" },
  { url: "https://sites.google.com/view/epicrhettmanifesto/home", title: "epicrhettmanifesto/home", description: "interesting" },
  { url: "https://panflights.com/en/", title: "panflights.com", description: "cheaper flights" },
  { url: "https://github.com/twilio-labs/call-gpt", title: "twilio-labs/call-gpt", description: "cool project" }
];

export default function ResourcesPage() {
  return (
    <MdxLayout>
      <h2>RESOURCES</h2>
      <h4>UPDATED 5/27/2025</h4>
      
      <ul>
        {resources.map((resource, index) => (
          <li key={index}>
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              {resource.title}
            </a>{" "}
            - {resource.description}
          </li>
        ))}
      </ul>
    </MdxLayout>
  );
}
