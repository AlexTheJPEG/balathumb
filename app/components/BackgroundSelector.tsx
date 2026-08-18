"use client";

import { backgrounds, Background, getBackgroundName, getBackgroundPath } from "../data/backgrounds";
import Image from "next/image";

interface BackgroundSelectorProps {
    isVisible: boolean;
    onSelect: (background: Background) => void;
    onClose: () => void;
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ isVisible, onSelect, onClose }) => {
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) onClose();
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ease-in-out ${
                isVisible ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            onClick={handleBackdropClick}
        >
            <div
                className={`relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-lg bg-gray-800 p-4 sm:p-6 transition-transform duration-200 ease-in-out ${
                    isVisible ? "scale-100 transform" : "scale-95 transform"
                }`}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-400 transition duration-150 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 sm:top-5 sm:right-5"
                    aria-label="Close background selector"
                    title="Close"
                >
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="m6 6 12 12M18 6 6 18" />
                    </svg>
                </button>

                <h2 className="mb-4 text-xl font-bold sm:text-2xl">Select a Background</h2>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {backgrounds.map((background) => (
                        <button
                            key={background}
                            type="button"
                            onClick={() => onSelect(background)}
                            className="overflow-hidden rounded-md text-left transition-transform duration-150 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                        >
                            <Image
                                src={getBackgroundPath(background)}
                                alt=""
                                width={320}
                                height={180}
                                className="h-auto w-full"
                            />
                            <span className="block bg-gray-700 px-2 py-1.5 text-center text-sm">
                                {getBackgroundName(background)}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BackgroundSelector;
