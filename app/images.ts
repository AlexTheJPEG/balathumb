import { Jimp } from "jimp";
import { ResizeStrategy } from "@jimp/plugin-resize";
import { ThumbJoker, LEGENDARY_JOKERS } from "./data/jokers";
import { getJokerLayout, calculateZOrders } from "./data/jokerLayouts";

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
    
    // Get layout data from shared module
    const { scales, positions } = getJokerLayout(jokerList.length);
    
    // Get z-order information from shared module
    const zOrders = calculateZOrders(jokerList.length);

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