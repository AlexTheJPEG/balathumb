import { getJokerLayout, calculateZOrders } from "../data/jokerLayouts";
import { ThumbJoker } from "../data/jokers";
import JokerImage from "./JokerImage";
import Image from "next/image";

interface ThumbnailPreviewProps {
    jokerList: ThumbJoker[];
    width?: number;
    height?: number;
}

const ThumbnailPreview: React.FC<ThumbnailPreviewProps> = ({ jokerList, width = 640, height = 360 }) => {
    const { scales, positions } = getJokerLayout(jokerList.length);
    const zOrders = calculateZOrders(jokerList.length);

    // Calculate the base joker size based on thumbnail width
    const baseJokerWidth = Math.floor(width * 0.11);
    const baseJokerHeight = Math.floor(baseJokerWidth * (97 / 73)); // Maintain aspect ratio

    return (
        <div className="relative" style={{ width: `${width}px`, height: `${height}px` }}>
            {/* Background image */}
            <Image
                // TODO: More backgrounds
                src="/bg/bg_green.png"
                alt="Background"
                width={width}
                height={height}
                className="absolute top-0 left-0"
            />

            {/* Joker images */}
            {jokerList.map((tJoker, index) => {
                if (index >= positions.length) return null;

                const position = positions[index];
                const scaleInfo = scales[index];
                const jokerWidth = Math.floor(baseJokerWidth * scaleInfo.scale);
                const jokerHeight = Math.floor(baseJokerHeight * scaleInfo.scale);

                return (
                    <div
                        key={`thumbnail-joker-${index}`}
                        className="absolute"
                        style={{
                            left: `${position.x}%`,
                            top: `${position.y}%`,
                            transform: `translate(-50%, -50%) rotate(${scaleInfo.rotation}deg)`,
                            zIndex: zOrders[index],
                            width: `${jokerWidth}px`,
                            height: `${jokerHeight}px`,
                        }}
                    >
                        <JokerImage
                            joker={tJoker.joker}
                            width={jokerWidth}
                            height={jokerHeight}
                            edition={tJoker.edition}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default ThumbnailPreview;
