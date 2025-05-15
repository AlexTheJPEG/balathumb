"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { loadImage } from "./images";

export default function Home() {
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [jokerList, setJokerList] = useState<string[]>(["photograph", "square_joker", "wee_joker", "to_do_list", "joker"]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  useEffect(() => {
    const processImage = async () => {
      setIsLoading(true);
      try {
        const image = await loadImage(jokerList);
        setProcessedImage(image);
      } catch (error) {
        console.error("Error processing image:", error);
      } finally {
        setIsLoading(false);
        setInitialLoad(false);
      }
    };

    processImage();
  }, [jokerList]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-5xl font-bold">Balathumb</h1>

      {/* Big loading circle */}
      {isLoading && initialLoad && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* User interface */}
      {processedImage && (<div className="mt-16 flex items-start -ml-64">
        <div className="relative">
          {/* Thumbnail preview */}
          <Image
            className={`mr-8 ${isLoading ? "opacity-50" : ""}`}
            src={processedImage}
            alt="Thumbnail"
            width={640}
            height={360}
            quality={100}
          />
          {/* Small loading circle */}
          {isLoading && (
            <div className="absolute -ml-8 inset-0 flex items-center justify-center z-10">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
        {/* Card organization */}
        <div className="flex flex-col">
          <h2 className="text-3xl font-semibold pt-0 mb-4">Jokers</h2>
          {/* Joker list */}
          <div className="flex space-x-4" style={{ minWidth: '425px' }}>
            {jokerList.map((joker, index) => (
              <Image
                key={index}
                src={`/jokers/${joker}.png`}
                alt={joker}
                width={73}
                height={97}
                quality={100}
                unoptimized={true}
              />
            ))}
            {jokerList.length < 5 && <Image
              src="/jokers/add.png"
              alt="Add Joker"
              width={73}
              height={97}
              quality={100}
              unoptimized={true}
              className={`${isLoading ? "opacity-50 cursor-wait" : "cursor-pointer"}`}
              onClick={() => {
                if (isLoading) return;
                setJokerList([...jokerList, "joker"])
              }}
            />}
            {/* Add invisible placeholder jokers to maintain layout */}
            {Array.from({ length: Math.max(0, 5 - jokerList.length - (jokerList.length < 5 ? 1 : 0)) }).map((_, index) => (
              <div key={`placeholder-${index}`} className="w-[73px] h-[97px] invisible" />
            ))}
          </div>
        </div>
      </div>)}
    </main>
  );
}
