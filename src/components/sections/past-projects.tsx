import { Snippet } from "@/components/snippet";
import { tenYears } from "@/lib/utils";

export default function PastProjects() {
  return (
    <>
      <h4></h4>
      <Snippet title="HOW I STARTED">
        <p>i taught myself to code summer of 6th grade.</p>

        <p>i &quot;launched&quot; my first app, lemonayd (<a href="https://www.lemonaid.com/">lemonaid</a> was taken) later that year.</p>

        <p>it was a fundraising app for schools. i became one of the youngest winners of the <a href="https://www.congressionalappchallenge.us/">congressional app challenge</a> from my submission.</p>

        <p>i recently got into startups (mid-2023) after watching <a href="https://www.youtube.com/watch?v=4VDZRR07Eqw">this video</a>.</p>

        <p>one of my earliest ambitions was to &quot;invent&quot; something. the idea of creating things that other people could use seemed pretty interesting.</p>

        <p>i always knew this is what i wanted to do.</p>
      </Snippet>

      <Snippet title="MY GOAL">
        <p>creating a product so seamless you never notice it. something like a coffee cup, chair, street light, etc.</p>

        <p>something that provides value & is used so frequently it becomes a part of your life without questioning it.</p>

        <p><a href="https://en.wikipedia.org/wiki/Dieter_Rams">dieter rams</a> said &quot;the best design is invisible&quot;. i always think about that.</p>

        <p>probably something in tech/science.</p>
      </Snippet>

      <Snippet title="MY MOTIVATIONS">
        <p>i&apos;ve never really been driven by money. i read this on a fortune cookie from panda express a few years back. something like &quot;money is a means to an end, not the end itself&quot;.</p>

        <p>for now, i do it for the love of the game. i&apos;m always trying to be the best i can in everything i do.</p>

        <p>i&apos;ve been fortunate enough to never have to worry about food, money, housing, or education. so maybe this changes in the future. but i wasn&apos;t after fancy cars or nice watches like most people around my age.</p>

        <p>i think this mindset is becoming more common, but i&apos;d like to get to a point where i can live without having to worry about money.</p>

        <p>no mansion or private jet. i&apos;d just keep it simple.</p>
      </Snippet>

      <Snippet title={`WHERE I SEE MYSELF IN ${tenYears().toLocaleString()} DAYS`}>
        <p>in 10 years, running a company or in vc.</p>

        <p>i move around a lot, so not sure if i&apos;d get the most value sticking to 1 thing for many years. i enjoy creating & selling.</p>

        <p>maybe not going to college, so can&apos;t say for sure where i end up.</p>

        <p>i&apos;ve been hustling my whole life. im sure i&apos;ll figure something out.</p>
      </Snippet>
    </>
  );
}
