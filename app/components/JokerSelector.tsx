"use client";

import { jokers, ThumbJoker } from "../data/jokers";
import JokerImage from "./JokerImage";
import Fuse from "fuse.js";
import { useState, useEffect, useMemo, useRef } from "react";

interface JokerSelectorProps {
    isVisible: boolean;
    onSelect: (joker: ThumbJoker) => void;
    onClose: () => void;
}

const JokerSelector: React.FC<JokerSelectorProps> = ({ isVisible, onSelect, onClose }) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Create a memoized Fuse instance
    const fuse = useMemo(() => {
        return new Fuse(jokers, {
            keys: ["name", "effect"],
            threshold: 0.3,
            ignoreLocation: false,
            useExtendedSearch: false,
        });
    }, []);

    // Handle clicking outside the modal
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Only close if clicking the backdrop (not the modal content)
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Focus the search input when the modal becomes visible
    useEffect(() => {
        if (isVisible && searchInputRef.current) {
            // Short timeout to ensure the modal is fully rendered
            setTimeout(() => {
                if (searchInputRef.current) {
                    searchInputRef.current.focus();
                    searchInputRef.current.select();
                }
            }, 100);
        }
    }, [isVisible]);

    // Get filtered jokers using fuzzy search
    const filteredJokers = useMemo(() => {
        if (!searchQuery.trim()) return jokers;

        const results = fuse.search(searchQuery);
        return results.map((result) => result.item);
    }, [fuse, searchQuery]);

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 ease-in-out ${isVisible ? "opacity-100" : "pointer-events-none opacity-0"} `}
            onClick={handleBackdropClick}
        >
            <div
                className={`max-h-[80vh] w-[700px] max-w-3xl overflow-auto rounded-lg bg-gray-800 p-6 transition-transform duration-200 ease-in-out ${isVisible ? "scale-100 transform" : "scale-95 transform"} `}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-3xl leading-none text-gray-400 hover:text-white"
                >
                    ×
                </button>

                <h2 className="mb-4 text-2xl font-bold">Select a Joker</h2>

                {/* Search box */}
                <div className="mb-4">
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search by name or effect..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-md bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Joker grid */}
                <div className="grid min-h-[400px] grid-cols-5 gap-6">
                    {filteredJokers.map((joker) => (
                        <div
                            key={joker.id}
                            onClick={() =>
                                onSelect({
                                    joker,
                                    edition: "",
                                    sticker: new Set(),
                                    stake: "",
                                } as ThumbJoker)
                            }
                            className="relative flex h-[140px] w-full cursor-pointer flex-col items-center transition-all duration-200"
                        >
                            <div className="absolute inset-0 flex flex-col items-center transition-transform duration-200 hover:scale-105 hover:transform">
                                <div className="flex h-[97px] w-full items-center justify-center">
                                    <JokerImage joker={joker} sticker={new Set()} />
                                </div>
                                <div className="mt-2 flex h-[43px] w-full items-start justify-center overflow-hidden">
                                    <p className="w-full px-1 text-center text-sm" title={joker.name}>
                                        {joker.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredJokers.length === 0 && (
                        <div className="col-span-5 flex h-full items-center justify-center">
                            <p className="py-8 text-center text-gray-400">No jokers match your search.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JokerSelector;
