"use client";

import { ThumbJoker, EDITIONS, STICKERS, STAKES } from "../data/jokers";
import JokerImage from "./JokerImage";
import Image from "next/image";
import { useState, useEffect } from "react";
import { titleCase } from "title-case";

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
            // Ensure sticker is always a Set by converting it if needed
            const sticker =
                tJoker.sticker instanceof Set
                    ? new Set(tJoker.sticker)
                    : new Set(Array.isArray(tJoker.sticker) ? tJoker.sticker : []);

            setLocalJoker({
                ...tJoker,
                sticker,
            });
        }
    }, [tJoker]);

    // Handle clicking outside the modal
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    // Handle close with automatic save
    const handleClose = () => {
        if (localJoker) {
            onSave(localJoker);
        }
        onClose();
    };

    if (!tJoker || !localJoker) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 transition-opacity duration-200 ease-in-out ${
                isVisible ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            onClick={handleBackdropClick}
        >
            <div
                className={`max-h-[90vh] w-full max-w-[800px] overflow-auto rounded-lg bg-gray-800 p-3 sm:p-6 transition-transform duration-200 ease-in-out ${
                    isVisible ? "scale-100 transform" : "scale-95 transform"
                }`}
            >
                <div className="flex items-start justify-between">
                    <h2 className="mb-4 text-xl sm:text-2xl font-bold">{tJoker.joker.name}</h2>
                    <button onClick={handleClose} className="text-2xl sm:text-3xl leading-none text-gray-400 hover:text-white">
                        ×
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                    {/* Joker image on the left */}
                    <div className="flex justify-center sm:justify-start flex-shrink-0">
                        <JokerImage
                            joker={tJoker.joker}
                            width={146}
                            height={194}
                            edition={localJoker.edition}
                            sticker={localJoker.sticker}
                            stake={localJoker.stake}
                        />
                    </div>

                    {/* Settings on the right */}
                    <div className="flex-grow space-y-4">
                        {/* Edition selection */}
                        <div>
                            <label className="mb-2 sm:mb-4 block text-base sm:text-lg font-bold text-white">Edition</label>
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-4">
                                {["", ...EDITIONS].map((edition) => (
                                    <div
                                        key={edition}
                                        className="text-center flex flex-col items-center cursor-pointer"
                                        onClick={() => setLocalJoker({ ...localJoker, edition })}
                                    >
                                        <div className="flex-shrink-0 w-[58px] sm:w-[73px]">
                                            <JokerImage joker={tJoker.joker} edition={edition} />
                                        </div>
                                        <label className="flex items-center justify-center mt-1 sm:mt-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                checked={localJoker.edition === edition}
                                                onChange={() => {
                                                    setLocalJoker({ ...localJoker, edition });
                                                }}
                                                className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                            <span className="text-xs sm:text-sm text-gray-300">
                                                {edition ? titleCase(edition) : "None"}
                                            </span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sticker selection */}
                        <div>
                            <label className="mb-2 sm:mb-4 block text-base sm:text-lg font-bold text-white">Stickers</label>
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-4">
                                {STICKERS.map((sticker) => {
                                    const toggleSticker = () => {
                                        const newSticker = new Set(localJoker.sticker);
                                        if (newSticker.has(sticker)) {
                                            newSticker.delete(sticker);
                                        } else {
                                            if (sticker === "eternal") {
                                                newSticker.delete("perishable");
                                            } else if (sticker === "perishable") {
                                                newSticker.delete("eternal");
                                            }
                                            newSticker.add(sticker);
                                        }
                                        setLocalJoker({ ...localJoker, sticker: newSticker });
                                    };

                                    return (
                                        <div
                                            key={sticker}
                                            className="text-center flex flex-col items-center cursor-pointer"
                                            onClick={toggleSticker}
                                        >
                                            <Image
                                                src={`/stickers/${sticker}_icon.png`}
                                                alt={`${sticker} sticker`}
                                                width={24}
                                                height={24}
                                                className="mb-1 sm:mb-2 w-6 h-6 sm:w-8 sm:h-8"
                                                unoptimized={true}
                                            />
                                            <label className="flex items-center justify-center mt-1 sm:mt-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={localJoker.sticker.has(sticker)}
                                                    onChange={toggleSticker}
                                                    className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                                <span className="text-xs sm:text-sm text-gray-300">{titleCase(sticker)}</span>
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Stake selection */}
                        <div>
                            <label className="mb-2 sm:mb-4 block text-base sm:text-lg font-bold text-white">Stake</label>
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-4">
                                {["", ...STAKES].map((stake) => (
                                    <div
                                        key={stake}
                                        className="text-center flex flex-col items-center cursor-pointer"
                                        onClick={() => setLocalJoker({ ...localJoker, stake })}
                                    >
                                        <Image
                                            src={`/stickers/${stake ? stake : "none"}_icon.png`}
                                            alt={`${stake} sticker`}
                                            width={24}
                                            height={24}
                                            className="mb-1 sm:mb-2 w-6 h-6 sm:w-8 sm:h-8"
                                            unoptimized={true}
                                        />
                                        <label className="flex items-center justify-center mt-1 sm:mt-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                checked={localJoker.stake === stake}
                                                onChange={() => {
                                                    setLocalJoker({ ...localJoker, stake });
                                                }}
                                                className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                            <span className="text-xs sm:text-sm text-gray-300">
                                                {stake ? titleCase(stake) : "None"}
                                            </span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JokerEditor;
