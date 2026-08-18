import { Background } from "../data/backgrounds";
import { ThumbJoker } from "../data/jokers";
import ThumbnailPreview from "./ThumbnailPreview";
import { useEffect, useState } from "react";

interface ResponsiveThumbnailPreviewProps {
    jokerList: ThumbJoker[];
    background: Background;
}

export default function ResponsiveThumbnailPreview({ jokerList, background }: ResponsiveThumbnailPreviewProps) {
    const [dimensions, setDimensions] = useState({ width: 640, height: 360 });

    useEffect(() => {
        const updateDimensions = () => {
            const containerWidth = Math.min(window.innerWidth - 32, 640);
            const aspectRatio = 16 / 9;
            setDimensions({
                width: containerWidth,
                height: containerWidth / aspectRatio,
            });
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    return (
        <ThumbnailPreview
            jokerList={jokerList}
            background={background}
            width={dimensions.width}
            height={dimensions.height}
        />
    );
}
