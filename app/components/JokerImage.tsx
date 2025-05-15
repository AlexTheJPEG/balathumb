"use client";

import { Joker, LEGENDARY_JOKERS } from "../data/jokers";
import Image from "next/image";

interface JokerImageProps {
    joker: Joker;
    width?: number;
    height?: number;
    edition?: string;
    sticker?: Set<string>;
    stake?: string;
}

const JokerImage: React.FC<JokerImageProps> = ({ joker, width = 73, height = 97, edition = "", sticker = new Set(), stake = "" }) => {
    const isLegendaryJoker = LEGENDARY_JOKERS.includes(joker.filename);

    if (isLegendaryJoker) {
        return (
            <div className="relative" style={{ width: `${width}px`, height: `${height}px` }}>
                {/* Base image */}
                <Image
                    src={`/jokers/${joker.filename}${edition ? "_" : ""}${edition}.png`}
                    alt={`${joker.name} base`}
                    width={width}
                    height={height}
                    quality={100}
                    unoptimized={true}
                    className="absolute top-0 left-0"
                />
                {/* Sprite overlay */}
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
                {Array.from(sticker).map(
                    (s, index) => (
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
                    ),
                )}
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

    // Regular joker
    return (
        <div className="relative" style={{ width: `${width}px`, height: `${height}px` }}>
            <Image
                src={`/jokers/${joker.filename}${edition ? "_" : ""}${edition}.png`}
                alt={joker.name}
                width={width}
                height={height}
                quality={100}
                unoptimized={true}
            />
            {/* Stickers */}
            {Array.from(sticker).map(
                (s, index) => (
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
                ),
            )}
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
