import { Background } from "../data/backgrounds";
import { ThumbJoker } from "../data/jokers";
import { THUMBNAIL_ASPECT_RATIO, THUMBNAIL_HEIGHT, THUMBNAIL_WIDTH } from "../data/thumbnail";
import ThumbnailPreview from "./ThumbnailPreview";
import { useEffect, useState } from "react";

interface ResponsiveThumbnailPreviewProps {
    jokerList: ThumbJoker[];
    background: Background;
}

export default function ResponsiveThumbnailPreview({ jokerList, background }: ResponsiveThumbnailPreviewProps) {
    const [dimensions, setDimensions] = useState({ width: THUMBNAIL_WIDTH, height: THUMBNAIL_HEIGHT });

    useEffect(() => {
        const updateDimensions = () => {
            const containerWidth = Math.min(window.innerWidth - 32, THUMBNAIL_WIDTH);
            setDimensions({
                width: containerWidth,
                height: containerWidth / THUMBNAIL_ASPECT_RATIO,
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
