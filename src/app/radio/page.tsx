import { Metadata } from "next";
import RadioPlayer from "../../components/radio-player";
import { publicClient } from "../../lib/sanity";
import { MusicTrack } from "../../types/sanity";
import { formatDate } from "../../lib/utils";

export const metadata: Metadata = {
  title: "radio",
  description: "music to cope with",
};

export const revalidate = 3600;

export default async function RadioPage() {
  let tracks: MusicTrack[] = [];

  try {
    const query = `*[_type == "musicTrack"]{
      _id,
      title,
      "url": audioFile.asset->url,
      _updatedAt
    }`;
    tracks = await publicClient.fetch(query);
  } catch (error) {
    console.error("Error fetching music tracks:", error);
  }

  // most recent update date
  const lastUpdated = tracks.reduce((latest, track) => {
    const trackDate = new Date(track._updatedAt);
    return trackDate > latest ? trackDate : latest;
  }, new Date(0));

  const formattedDate =
    tracks.length > 0
      ? formatDate(lastUpdated)
      : "N/A";

  return (
    <div className="flex flex-col items-center justify-center max-h-screen p-4">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-medium text-foreground mb-2 font-mono">RADIO</h1>
         <p className="text-[10px] text-muted-foreground/60 font-mono mt-1 uppercase tracking-widest">
          last updated library {formattedDate}
        </p>
      </div>
      <RadioPlayer initialTracks={tracks} />
    </div>
  );
}
