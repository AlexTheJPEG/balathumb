import Image from "next/image";
import { ThumbJoker } from "../data/jokers";
import JokerImage from "./JokerImage";
import { useState, useEffect } from "react";

interface ThumbnailPreviewProps {
  jokerList: ThumbJoker[];
  width?: number;
  height?: number;
}

const ThumbnailPreview: React.FC<ThumbnailPreviewProps> = ({
  jokerList,
  width = 640,
  height = 360,
}) => {
  // Scale factor for joker sizes (adjust as needed)
  const getJokerScales = () => {
    switch (jokerList.length) {
      case 1: return [{ scale: 3, rotation: 0 }];
      case 2: return [
        { scale: 2.8, rotation: 0 },
        { scale: 2.8, rotation: 0 }
      ];
      case 3: return [
        { scale: 2.5, rotation: -5 },
        { scale: 3, rotation: 0 },
        { scale: 2.5, rotation: 5 }
      ];
      case 4: return [
        { scale: 2, rotation: -5 },
        { scale: 2.5, rotation: 0 },
        { scale: 2.5, rotation: 0 },
        { scale: 2, rotation: 5 }
      ];
      case 5: return [
        { scale: 2, rotation: -7.5 },
        { scale: 2.3, rotation: -5 },
        { scale: 2.5, rotation: 0 },
        { scale: 2.3, rotation: 5 },
        { scale: 2, rotation: 7.5 }
      ];
      default: return [];
    }
  };

  // Position calculations - now centered relative to background
  const getJokerPositions = () => {
    switch (jokerList.length) {
      case 1: return [{ x: 50, y: 50 }]; // Center of the background
      case 2: return [
        { x: 30, y: 50 }, // 25% from left
        { x: 70, y: 50 }  // 75% from left
      ];
      case 3: return [
        { x: 25, y: 50 }, // Left position
        { x: 50, y: 50 },   // Center position
        { x: 75, y: 50 }  // Right position
      ];
      case 4: return [
        { x: 16, y: 50 },  // Far left
        { x: 35, y: 50 },  // Center left
        { x: 65, y: 50 },  // Center right
        { x: 84, y: 50 }   // Far right
      ];
      case 5: return [
        { x: 16, y: 53 },  // Far left
        { x: 33, y: 50 },  // Left
        { x: 50, y: 50 },  // Center
        { x: 66, y: 50 },  // Right
        { x: 84, y: 53 }   // Far right
      ];
      default: return [];
    }
  };

  const scales = getJokerScales();
  const positions = getJokerPositions();

  // Calculate the base joker size based on thumbnail width
  const baseJokerWidth = Math.floor(width * 0.11);
  const baseJokerHeight = Math.floor(baseJokerWidth * (97/73)); // Maintain aspect ratio

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
        
        // Z-index order for proper layering
        const zIndex = jokerList.length <= 2 
          ? index + 1
          : (index === Math.floor(jokerList.length / 2)) 
            ? jokerList.length + 1  // Center card on top
            : jokerList.length - Math.abs(index - Math.floor(jokerList.length / 2));
        
        return (
          <div 
            key={`thumbnail-joker-${index}`}
            className="absolute"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: `translate(-50%, -50%) rotate(${scaleInfo.rotation}deg)`,
              zIndex,
              width: `${jokerWidth}px`,
              height: `${jokerHeight}px`
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