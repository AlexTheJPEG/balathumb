"use client";

import { Joker, LEGENDARY_JOKERS } from "../data/jokers";
import Image from "next/image";
import { useMemo } from "react";

interface JokerImageProps {
    joker: Joker;
    width?: number;
    height?: number;
    edition?: string;
    sticker?: Set<string>;
    stake?: string;
}

const JokerImage: React.FC<JokerImageProps> = ({
    joker,
    width = 73,
    height = 97,
    edition = "",
    sticker = new Set(),
    stake = "",
}) => {
    const isLegendaryJoker = LEGENDARY_JOKERS.includes(joker.filename);

    // Calculate sprite position based on joker ID
    const getSpriteStyle = useMemo(() => {
        const cols = 10;
        const rows = 15;

        // Original size in spritesheet
        const origWidth = 142;
        const origHeight = 190;

        // Calculate position in spritesheet
        const tileX = (joker.id - 1) % cols;
        const tileY = Math.floor((joker.id - 1) / cols);

        // Calculate the scale ratio for proper rendering
        const scaleX = width / origWidth;
        const scaleY = height / origHeight;

        // The total dimensions of the scaled spritesheet
        const totalWidth = cols * origWidth * scaleX;
        const totalHeight = rows * origHeight * scaleY;

        // Scale background-position based on the same ratio as the background-size
        return {
            backgroundImage: `url('/jokers/spritesheet${edition ? `_${edition}` : ""}.png')`,
            backgroundPosition: `${-tileX * width}px ${-tileY * height}px`,
            backgroundSize: `${totalWidth}px ${totalHeight}px`, // Specify both width and height
            width: `${width}px`,
            height: `${height}px`,
            display: "block",
        };
    }, [joker.id, width, height, edition]);

    if (isLegendaryJoker) {
        return (
            <div className="relative" style={{ width: `${width}px`, height: `${height}px` }}>
                {/* Base image from spritesheet */}
                <div className="absolute top-0 left-0" style={getSpriteStyle} aria-label={`${joker.name} base`} />

                {/* Sprite overlay - still using individual image for legendary jokers */}
                <Image
                    src={`/jokers/${joker.filename}_sprite.png`}
                    alt={`${joker.name} sprite`}
                    width={width}
                    height={height}
                    quality={100}
                    unoptimized={true}
                    className="absolute top-0 left-0"
                />

                {/* Stickers */}
                {Array.from(sticker).map((s, index) => (
                    <Image
                        key={index}
                        src={`/stickers/${s}.png`}
                        alt={s}
                        width={width}
                        height={height}
                        quality={100}
                        unoptimized={true}
                        className="absolute top-0 left-0"
                    />
                ))}

                {/* Stake stickers */}
                {stake && (
                    <Image
                        src={`/stickers/${stake}.png`}
                        alt={stake}
                        width={width}
                        height={height}
                        quality={100}
                        unoptimized={true}
                        className="absolute top-0 left-0"
                    />
                )}
            </div>
        );
    }

    // Regular joker from spritesheet
    return (
        <div className="relative" style={{ width: `${width}px`, height: `${height}px` }}>
            {/* Base image from spritesheet */}
            <div className="absolute top-0 left-0" style={getSpriteStyle} aria-label={joker.name} />

            {/* Stickers */}
            {Array.from(sticker).map((s, index) => (
                <Image
                    key={index}
                    src={`/stickers/${s}.png`}
                    alt={s}
                    width={width}
                    height={height}
                    quality={100}
                    unoptimized={true}
                    className="absolute top-0 left-0"
                />
            ))}

            {/* Stake stickers */}
            {stake && (
                <Image
                    src={`/stickers/${stake}.png`}
                    alt={stake}
                    width={width}
                    height={height}
                    quality={100}
                    unoptimized={true}
                    className="absolute top-0 left-0"
                />
            )}
        </div>
    );
};

export default JokerImage;
