import { Jimp } from "jimp";
import { ResizeStrategy } from "@jimp/plugin-resize";
import { ThumbJoker, LEGENDARY_JOKERS } from "./data/jokers";

export async function loadImage(jokerList: ThumbJoker[]): Promise<string> {
    const bgImage = await Jimp.read("/bg/bg_green.png");
    const result = bgImage.clone();

    const jokerImages = [];
    for (const tJoker of jokerList) {
        let jokerImage;

        const edition = tJoker.edition ? `_${tJoker.edition}` : "";
        if (LEGENDARY_JOKERS.includes(tJoker.joker.filename.toLowerCase())) {
            const baseImage = await Jimp.read(`/jokers/${tJoker.joker.filename}${edition}.png`);
            const spriteImage = await Jimp.read(`/jokers/${tJoker.joker.filename}_sprite.png`);
            jokerImage = baseImage.clone();
            jokerImage.composite(spriteImage, 0, 0);
        } else {
            jokerImage = await Jimp.read(`/jokers/${tJoker.joker.filename}${edition}.png`);
        }
        
        jokerImages.push(jokerImage);
    }

    // Base sizes and positions calculations
    const baseJokerWidth = Math.floor(bgImage.width * 0.11);
    const baseJokerHeight = Math.floor(baseJokerWidth * (97/73)); // Maintain aspect ratio
    
    interface Scale {
        scale: number;
        rotation: number;
    }
    interface Position {
        x: number;
        y: number;
    }
    let scales: Scale[] = [];
    let positions: Position[] = [];
    
    // Match the scaling and positioning from ThumbnailPreview
    switch (jokerList.length) {
        case 1:
            scales = [{ scale: 3, rotation: 0 }];
            positions = [{ x: 50, y: 50 }];
            break;
        case 2:
            scales = [
                { scale: 2.8, rotation: 0 },
                { scale: 2.8, rotation: 0 }
            ];
            positions = [
                { x: 30, y: 50 },
                { x: 70, y: 50 }
            ];
            break;
        case 3:
            scales = [
                { scale: 2.5, rotation: -5 },
                { scale: 3, rotation: 0 },
                { scale: 2.5, rotation: 5 }
            ];
            positions = [
                { x: 25, y: 50 },
                { x: 50, y: 50 },
                { x: 75, y: 50 }
            ];
            break;
        case 4:
            scales = [
                { scale: 2, rotation: -5 },
                { scale: 2.5, rotation: 0 },
                { scale: 2.5, rotation: 0 },
                { scale: 2, rotation: 5 }
            ];
            positions = [
                { x: 16, y: 50 },
                { x: 35, y: 50 },
                { x: 65, y: 50 },
                { x: 84, y: 50 }
            ];
            break;
        case 5:
            scales = [
                { scale: 2, rotation: -7.5 },
                { scale: 2.3, rotation: -5 },
                { scale: 2.5, rotation: 0 },
                { scale: 2.3, rotation: 5 },
                { scale: 2, rotation: 7.5 }
            ];
            positions = [
                { x: 16, y: 53 },
                { x: 33, y: 50 },
                { x: 50, y: 50 },
                { x: 66, y: 50 },
                { x: 84, y: 53 }
            ];
            break;
    }

    // Determine z-index order for layering (higher is drawn on top)
    const zOrders: number[] = [];
    for (let i = 0; i < jokerList.length; i++) {
        if (jokerList.length <= 2) {
            zOrders.push(i + 1);
        } else {
            const centerIndex = Math.floor(jokerList.length / 2);
            zOrders.push(
                i === centerIndex 
                    ? jokerList.length + 1  // Center card on top
                    : jokerList.length - Math.abs(i - centerIndex)
            );
        }
    }

    // Sort joker indices by z-order (lower z-order gets drawn first)
    const sortedIndices = Array.from({ length: jokerList.length }, (_, i) => i)
        .sort((a, b) => zOrders[a] - zOrders[b]);

    // Apply transformations and composite images in the correct order
    for (const idx of sortedIndices) {
        const jokerWidth = Math.floor(baseJokerWidth * scales[idx].scale);
        const jokerHeight = Math.floor(baseJokerHeight * scales[idx].scale);
        
        // Resize the joker
        jokerImages[idx].resize({
            w: jokerWidth,
            h: jokerHeight,
            mode: ResizeStrategy.NEAREST_NEIGHBOR
        });

        // Apply rotation
        if (scales[idx].rotation !== 0) {
            jokerImages[idx].rotate(-scales[idx].rotation);
        }
        
        // Calculate position (converting percentages to pixels and accounting for joker dimensions)
        const xPos = Math.floor((bgImage.width * positions[idx].x / 100) - (jokerImages[idx].width / 2));
        const yPos = Math.floor((bgImage.height * positions[idx].y / 100) - (jokerImages[idx].height / 2));
        
        // Composite the joker onto the result
        result.composite(jokerImages[idx], xPos, yPos);
    }

    return result.getBase64("image/png");
}