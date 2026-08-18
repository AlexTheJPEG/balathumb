"use client";

import {
    Joker,
    JOKER_SPRITE_HEIGHT,
    JOKER_SPRITE_WIDTH,
    JOKER_SPRITE_ROWS,
    JOKER_SPRITES_PER_ROW,
    LEGENDARY_JOKERS,
    STICKER_OFFSET_Y,
    WEE_JOKER_ID,
    WEE_JOKER_SCALE,
    WEE_JOKER_SPRITE_ID,
} from "../data/jokers";
import { JOKER_DISPLAY_HEIGHT, JOKER_DISPLAY_WIDTH } from "../data/thumbnail";
import Image from "next/image";
import { useMemo } from "react";

export const calculateSpriteStyle = (id: number, width: number, height: number, edition: string = "") => {
    // Calculate position in spritesheet
    const tileX = (id - 1) % JOKER_SPRITES_PER_ROW;
    const tileY = Math.floor((id - 1) / JOKER_SPRITES_PER_ROW);

    // Calculate the scale ratio for proper rendering
    const scaleX = width / JOKER_SPRITE_WIDTH;
    const scaleY = height / JOKER_SPRITE_HEIGHT;

    // The total dimensions of the scaled spritesheet
    const totalWidth = JOKER_SPRITES_PER_ROW * JOKER_SPRITE_WIDTH * scaleX;
    const totalHeight = JOKER_SPRITE_ROWS * JOKER_SPRITE_HEIGHT * scaleY;

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
    width = JOKER_DISPLAY_WIDTH,
    height = JOKER_DISPLAY_HEIGHT,
    edition = "",
    sticker = new Set(),
    stake = "",
}) => {
    const isLegendaryJoker = LEGENDARY_JOKERS.includes(joker.filename);
    const isWeeJoker = joker.id === WEE_JOKER_ID;

    // For Wee Joker, use regular Joker's sprite position and scale down the dimensions
    const effectiveJokerId = isWeeJoker ? WEE_JOKER_SPRITE_ID : joker.id;
    const effectiveWidth = isWeeJoker ? width * WEE_JOKER_SCALE : width;
    const effectiveHeight = isWeeJoker ? height * WEE_JOKER_SCALE : height;

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
                        unoptimized={true}
                        style={{ width: `${effectiveWidth}px`, height: `${effectiveHeight}px` }}
                        className="absolute top-0 left-0"
                    />
                )}

                {/* Stickers and stakes */}
                {[...sticker, stake].filter(Boolean).map((s, index) => (
                    <Image
                        key={index}
                        src={`/stickers/${s}.png`}
                        alt={s}
                        width={effectiveWidth}
                        height={effectiveHeight}
                        unoptimized={true}
                        style={{
                            width: `${effectiveWidth}px`,
                            height: `${effectiveHeight}px`,
                            transform: `translateY(${(STICKER_OFFSET_Y[joker.id] ?? 0) * (effectiveHeight / JOKER_SPRITE_HEIGHT)}px)`,
                        }}
                        className="absolute top-0 left-0"
                    />
                ))}
            </div>
        </div>
    );
};

export default JokerImage;
