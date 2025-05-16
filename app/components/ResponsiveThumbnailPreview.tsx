import { useEffect, useState } from 'react';
import ThumbnailPreview from './ThumbnailPreview';
import { ThumbJoker } from '../data/jokers';

interface ResponsiveThumbnailPreviewProps {
    jokerList: ThumbJoker[];
}

export default function ResponsiveThumbnailPreview({ jokerList }: ResponsiveThumbnailPreviewProps) {
    const [dimensions, setDimensions] = useState({ width: 640, height: 360 });

    useEffect(() => {
        const updateDimensions = () => {
            const containerWidth = Math.min(window.innerWidth - 32, 640);
            const aspectRatio = 16/9;
            setDimensions({
                width: containerWidth,
                height: containerWidth / aspectRatio
            });
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    return (
        <ThumbnailPreview 
            jokerList={jokerList} 
            width={dimensions.width} 
            height={dimensions.height} 
        />
    );
}