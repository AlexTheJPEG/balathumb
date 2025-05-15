"use client";

import { ThumbJoker } from "../data/jokers";
import JokerImage from "./JokerImage";
import { useState, useEffect } from "react";

interface JokerEditorProps {
    isVisible: boolean;
    tJoker: ThumbJoker | null;
    onClose: () => void;
    onSave: (updatedJoker: ThumbJoker) => void;
}

const JokerEditor: React.FC<JokerEditorProps> = ({ isVisible, tJoker, onClose, onSave }) => {
    const [localJoker, setLocalJoker] = useState<ThumbJoker | null>(null);

    // Update local state when joker changes
    useEffect(() => {
        if (tJoker) {
            setLocalJoker({ ...tJoker });
        }
    }, [tJoker]);

    // Handle clicking outside the modal
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Handle save button click
    const handleSave = () => {
        if (localJoker) {
            onSave(localJoker);
            onClose();
        }
    };

    if (!tJoker || !localJoker) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 ease-in-out ${isVisible ? "opacity-100" : "pointer-events-none opacity-0"} `}
            onClick={handleBackdropClick}
        >
            <div
                className={`max-h-[80vh] w-[600px] overflow-auto rounded-lg bg-gray-800 p-6 transition-transform duration-200 ease-in-out ${isVisible ? "scale-100 transform" : "scale-95 transform"} `}
            >
                <div className="flex items-start justify-between">
                    <h2 className="mb-4 text-2xl font-bold">{tJoker.joker.name}</h2>
                    <button onClick={onClose} className="text-xl text-gray-400 hover:text-white">
                        ×
                    </button>
                </div>

                <div className="flex gap-8">
                    {/* Joker image on the left */}
                    <div className="flex-shrink-0">
                        <JokerImage joker={tJoker.joker} width={146} height={194} edition={localJoker.edition} />
                    </div>

                    {/* Settings on the right */}
                    <div className="flex-grow space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-300">Edition</label>
                            <select
                                value={localJoker.edition}
                                onChange={(e) => setLocalJoker({ ...localJoker, edition: e.target.value })}
                                className="w-full rounded-md bg-gray-700 px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="">None</option>
                                <option value="foil">Foil</option>
                                <option value="holographic">Holographic</option>
                                <option value="polychrome">Polychrome</option>
                                <option value="negative">Negative</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-300">Sticker</label>
                            <select
                                value={localJoker.sticker}
                                onChange={(e) => setLocalJoker({ ...localJoker, sticker: e.target.value })}
                                className="w-full rounded-md bg-gray-700 px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="">None</option>
                                <option value="eternal">Eternal</option>
                                <option value="perishable">Perishable</option>
                                <option value="rental">Rental</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-300">Stake</label>
                            <select
                                value={localJoker.stake}
                                onChange={(e) => setLocalJoker({ ...localJoker, stake: e.target.value })}
                                className="w-full rounded-md bg-gray-700 px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="">None</option>
                                <option value="white">White</option>
                                <option value="red">Red</option>
                                <option value="green">Green</option>
                                <option value="black">Black</option>
                                <option value="blue">Blue</option>
                                <option value="purple">Purple</option>
                                <option value="orange">Orange</option>
                                <option value="gold">Gold</option>
                            </select>
                        </div>

                        <div className="pt-4">
                            <button
                                onClick={handleSave}
                                className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JokerEditor;
