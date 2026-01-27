import { Metadata } from "next";
import RadioPlayer from "../../components/radio-player";

export const metadata: Metadata = {
  title: "radio",
  description: "classic ipod-style music player",
};

export default function RadioPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-4">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-medium text-foreground mb-2">radio</h1>
        <p className="text-sm text-muted-foreground font-mono">
          shuffled ambient music
        </p>
      </div>
      <RadioPlayer />
    </div>
  );
}
