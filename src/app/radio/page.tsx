import { Metadata } from "next";
import RadioPlayer from "../../components/radio-player";

export const metadata: Metadata = {
  title: "radio",
  description: "classic ipod-style music player",
};

export default function RadioPage() {
  return (
    <div className="flex flex-col items-center justify-center max-h-screen p-4">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-medium text-foreground mb-2 font-mono">RADIO</h1>
        <p className="text-sm text-muted-foreground">
          shuffled ambient music
        </p>
      </div>
      <RadioPlayer />
    </div>
  );
}
