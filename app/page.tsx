"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { loadImage } from "./images";

export default function Home() {
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  useEffect(() => {
    const processImage = async () => {
      try {
        const image = await loadImage(5);
        setProcessedImage(image);
      } catch (error) {
        console.error("Error processing image:", error);
      }
    };

    processImage();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-5xl font-bold">Balathumb</h1>
      {processedImage && (<div className="mt-16 flex items-start -ml-64">
        <Image
          className="mr-8"
          src={processedImage}
          alt="Thumbnail"
          width={640}
          height={360}
          quality={100}
        />
        <h2 className="text-3xl font-semibold pt-0">Jokers</h2>
      </div>)}
    </main>
  );
}
