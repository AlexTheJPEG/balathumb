"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Joker } from "../data/jokers";

interface JokerSelectorProps {
  isVisible: boolean;
  onSelect: (id: string) => void;
  onClose: () => void;
}

const JokerSelector: React.FC<JokerSelectorProps> = ({ isVisible, onSelect, onClose }) => {
  const [jokers, setJokers] = useState<Joker[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Add this function to handle clicking outside the modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking the backdrop (not the modal content)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    // Only fetch data when the component is visible and we don't have data yet
    if (isVisible && jokers.length === 0) {
      setIsLoading(true);
      fetch('/api/jokers')
        .then(res => res.json())
        .then(data => {
          setJokers(data.jokers);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching joker data:', error);
          setIsLoading(false);
        });
    }
  }, [isVisible, jokers.length]);

  // Add transition classes to make the modal appear smoothly
  return (
    <div 
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        transition-opacity duration-200 ease-in-out
        ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
      onClick={handleBackdropClick} // Add click handler here
    >
      <div 
        className={`
          bg-gray-800 rounded-lg p-6 max-w-3xl max-h-[80vh] overflow-auto
          transition-transform duration-200 ease-in-out
          ${isVisible ? 'transform scale-100' : 'transform scale-95'}
        `}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ×
        </button>
        
        <h2 className="text-2xl font-bold mb-4">Select a Joker</h2>
        
        {isLoading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-6">
            {jokers.map(joker => (
              <div 
                key={joker.id}
                onClick={() => onSelect(joker.filename)}
                className="cursor-pointer hover:scale-105 transition-transform flex flex-col items-center"
              >
                <div className="flex justify-center w-full h-[97px]">
                  <Image 
                    src={`/jokers/${joker.filename}.png`} 
                    alt={joker.name}
                    width={73} 
                    height={97}
                    quality={100}
                    unoptimized={true}
                  />
                </div>
                <p className="text-center text-sm mt-2 w-full truncate px-1" title={joker.name}>
                  {joker.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JokerSelector;