"use client";

import { Joker, LEGENDARY_JOKERS } from "../data/jokers";
import Image from "next/image";
import { useMemo } from "react";

export const calculateSpriteStyle = (id: number, width: number, height: number, edition: string = "") => {
    const cols = 10;
    const rows = 15;

    // Original size in spritesheet
    const origWidth = 142;
    const origHeight = 190;

    // Calculate position in spritesheet
    const tileX = (id - 1) % cols;
    const tileY = Math.floor((id - 1) / cols);

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
        backgroundSize: `${totalWidth}px ${totalHeight}px`,
        width: `${width}px`,
        height: `${height}px`,
        display: "block",
    };
};

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
    const isWeeJoker = joker.id === 124;

    // For Wee Joker, use regular Joker's sprite position and scale down the dimensions
    const effectiveJokerId = isWeeJoker ? 1 : joker.id;
    const effectiveWidth = isWeeJoker ? width * 0.6 : width;
    const effectiveHeight = isWeeJoker ? height * 0.6 : height;

    const getSpriteStyle = useMemo(() => {
        return calculateSpriteStyle(effectiveJokerId, effectiveWidth, effectiveHeight, edition);
    }, [effectiveJokerId, effectiveWidth, effectiveHeight, edition]);

    const containerStyle = isWeeJoker
        ? {
              width: `${width}px`,
              height: `${height}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
          }
        : {
              width: `${width}px`,
              height: `${height}px`,
          };

    const contentStyle = isWeeJoker
        ? {
              width: `${effectiveWidth}px`,
              height: `${effectiveHeight}px`,
              position: "relative" as const,
          }
        : undefined;

    return (
        <div className="relative" style={containerStyle}>
            <div style={contentStyle}>
                {/* Base image from spritesheet */}
                <div
                    className="absolute top-0 left-0"
                    style={getSpriteStyle}
                    aria-label={`${joker.name}${isLegendaryJoker ? " base" : ""}`}
                />

                {/* Sprite overlay for legendary jokers */}
                {isLegendaryJoker && (
                    <Image
                        src={`/jokers/${joker.filename}_sprite.png`}
                        alt={`${joker.name} sprite`}
                        width={effectiveWidth}
                        height={effectiveHeight}
                        quality={100}
                        unoptimized={true}
                        className="absolute top-0 left-0"
                    />
                )}

                {/* Stickers and stakes */}
                {[...sticker, stake].filter(Boolean).map((s, index) => (
                    <Image
                        key={index}
                        src={`/stickers/${
                            joker.id === 16
                                ? `exceptions/half_joker_${s}`
                                : joker.id === 65
                                  ? `exceptions/square_joker_${s}`
                                  : joker.id === 78
                                    ? `exceptions/photograph_${s}`
                                    : s
                        }.png`}
                        alt={s}
                        width={effectiveWidth}
                        height={effectiveHeight}
                        quality={100}
                        unoptimized={true}
                        className="absolute top-0 left-0"
                    />
                ))}
            </div>
        </div>
    );
};

export default JokerImage;
