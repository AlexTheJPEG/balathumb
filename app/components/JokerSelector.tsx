"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Fuse from 'fuse.js';
import { ThumbJoker, Joker } from "../data/jokers";
import JokerImage from "./JokerImage";

interface JokerSelectorProps {
  isVisible: boolean;
  onSelect: (joker: ThumbJoker) => void;
  onClose: () => void;
}

const JokerSelector: React.FC<JokerSelectorProps> = ({ isVisible, onSelect, onClose }) => {
  const [jokers, setJokers] = useState<Joker[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Create a memoized Fuse instance
  const fuse = useMemo(() => {
    return new Fuse(jokers, {
      keys: ['name', 'effect'],
      threshold: 0.3,
      ignoreLocation: false,
      useExtendedSearch: false
    });
  }, [jokers]);

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

  // Add this effect to focus the search input when the modal becomes visible
  useEffect(() => {
    if (isVisible && searchInputRef.current) {
      // Short timeout to ensure the modal is fully rendered
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isVisible]);

  // Get filtered jokers using fuzzy search
  const filteredJokers = useMemo(() => {
    if (!searchQuery.trim()) return jokers;
    
    const results = fuse.search(searchQuery);
    return results.map(result => result.item);
  }, [fuse, searchQuery, jokers]);

  return (
    <div 
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        transition-opacity duration-200 ease-in-out
        ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
      onClick={handleBackdropClick}
    >
      <div 
        className={`
          bg-gray-800 rounded-lg p-6 max-w-3xl w-[700px] max-h-[80vh] overflow-auto
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
        
        {/* Search box */}
        <div className="mb-4">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search by name or effect..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {isLoading ? (
          <div className="flex justify-center p-12 min-h-[400px] items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-6 min-h-[400px]">
            {filteredJokers.map(joker => (
              <div 
                key={joker.id}
                onClick={() => onSelect({
                  joker,
                  edition: "none",
                  sticker: "none",
                  stake: "none"
                } as ThumbJoker)}
                className="cursor-pointer transition-all duration-200 flex flex-col items-center w-full h-[140px] relative"
              >
                <div 
                  className="absolute inset-0 hover:transform hover:scale-105 transition-transform duration-200 flex flex-col items-center"
                >
                  <div className="flex justify-center items-center w-full h-[97px]">
                    <JokerImage joker={joker} />
                  </div>
                  <div className="mt-2 h-[43px] flex items-start justify-center w-full overflow-hidden">
                    <p className="text-center text-sm w-full px-1" title={joker.name}>
                      {joker.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {!isLoading && filteredJokers.length === 0 && (
              <div className="col-span-5 flex items-center justify-center h-full">
                <p className="text-center py-8 text-gray-400">
                  No jokers match your search.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JokerSelector;