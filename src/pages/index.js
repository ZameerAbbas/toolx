import { Inter } from "next/font/google";
import Chat from "./Chat";
import WordToPdf from "./WordToPdf";
import ImageToPdf from "./ImagetoPDF/ImageToPdf";
import ImageCompresser from "./ImageCompresser/imageCompression";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`p-24 ${inter.className}`}>
      {/* <Chat /> */}
      {/* <WordToPdf /> */}
      {/* <ImageToPdf /> */}
      <ImageCompresser />
    </main>
  );
}
