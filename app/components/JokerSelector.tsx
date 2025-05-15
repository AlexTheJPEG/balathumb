"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface JokerSelectorProps {
  onSelect: (joker: string) => void;
  onClose: () => void;
  isVisible: boolean;
}

export default function JokerSelector({ onSelect, onClose, isVisible }: JokerSelectorProps) {
  const [jokers, setJokers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadJokers() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/jokers');
        if (!response.ok) throw new Error('Failed to fetch jokers');
        const data = await response.json();
        setJokers(data.jokers);
      } catch (error) {
        console.error("Error loading jokers:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (isVisible) {
      loadJokers();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-300 text-gray-600 rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Select a Joker</h2>
          <button 
            onClick={onClose}
            className="hover:text-gray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {jokers.map((joker) => (
              <div 
                key={joker} 
                className="cursor-pointer hover:opacity-80 transition-opacity transform hover:scale-105 duration-200"
                onClick={() => onSelect(joker)}
              >
                <Image
                  src={`/jokers/${joker}.png`}
                  alt={joker}
                  width={73}
                  height={97}
                  quality={100}
                  unoptimized={true}
                  className="mx-auto"
                />
                <p className="text-center text-sm mt-1 truncate">{joker}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}