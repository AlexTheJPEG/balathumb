import { getJokerLayout, calculateZOrders } from "./data/jokerLayouts";
import { ThumbJoker, LEGENDARY_JOKERS } from "./data/jokers";
import { ResizeStrategy } from "@jimp/plugin-resize";
import { Jimp } from "jimp";
import { calculateSpriteStyle } from "./components/JokerImage";

export async function loadImage(jokerList: ThumbJoker[]): Promise<string> {
    const bgImage = await Jimp.read("/bg/bg_green.png");
    const result = bgImage.clone();

    const baseSpritesheetCache = new Map<string, typeof Jimp.prototype>();
    const stickerCache = new Map<string, typeof Jimp.prototype>();
    
    // Load base spritesheet
    const getBaseSpritsheet = async (edition = "") => {
        const key = edition ? `_${edition}` : "";
        if (!baseSpritesheetCache.has(key)) {
            baseSpritesheetCache.set(key, await Jimp.read(`/jokers/spritesheet${key}.png`));
        }
        return baseSpritesheetCache.get(key);
    };

    // Load sticker image with caching
    const getStickerImage = async (stickerName: string) => {
        if (!stickerCache.has(stickerName)) {
            stickerCache.set(stickerName, await Jimp.read(`/stickers/${stickerName}.png`));
        }
        return stickerCache.get(stickerName);
    };

    const jokerImages = [];
    for (const tJoker of jokerList) {
        const edition = tJoker.edition || "";
        const originalWidth = 142;  // Original size in spritesheet
        const originalHeight = 190;
        
        // Use calculateSpriteStyle to get the spritesheet position
        const spriteStyle = calculateSpriteStyle(
            tJoker.joker.id,
            originalWidth,
            originalHeight,
            edition
        );

        const [backgroundPositionX, backgroundPositionY] = spriteStyle.backgroundPosition.split(" ");
        const bgPosX = -parseInt(backgroundPositionX.replace("px", ""));
        const bgPosY = -parseInt(backgroundPositionY.replace("px", ""));
        
        // Extract the joker from the spritesheet
        const baseSheet = await getBaseSpritsheet(edition);
        const finalJokerImage = baseSheet.clone();
        finalJokerImage.crop({
            x: bgPosX,
            y: bgPosY,
            w: originalWidth,
            h: originalHeight
        });

        // For legendary jokers, add the sprite overlay
        if (LEGENDARY_JOKERS.includes(tJoker.joker.filename.toLowerCase())) {
            const spriteImage = await Jimp.read(`/jokers/${tJoker.joker.filename}_sprite.png`);
            finalJokerImage.composite(spriteImage, 0, 0);
        }

        // Add stickers
        for (const sticker of tJoker.sticker) {
            const stickerImage = await getStickerImage(sticker);
            finalJokerImage.composite(stickerImage, 0, 0);
        }
        
        if (tJoker.stake) {
            const stakeImage = await getStickerImage(tJoker.stake);
            finalJokerImage.composite(stakeImage, 0, 0);
        }

        jokerImages.push(finalJokerImage);
    }

    // Base sizes and positions calculations
    const baseJokerWidth = Math.floor(bgImage.width * 0.11);
    const baseJokerHeight = Math.floor(baseJokerWidth * (97 / 73)); // Maintain aspect ratio

    // Get layout data from shared module
    const { scales, positions } = getJokerLayout(jokerList.length);

    // Get z-order information from shared module
    const zOrders = calculateZOrders(jokerList.length);

    // Sort joker indices by z-order (lower z-order gets drawn first)
    const sortedIndices = Array.from({ length: jokerList.length }, (_, i) => i).sort((a, b) => zOrders[a] - zOrders[b]);

    // Apply transformations and composite images in the correct order
    for (const idx of sortedIndices) {
        const jokerWidth = Math.floor(baseJokerWidth * scales[idx].scale);
        const jokerHeight = Math.floor(baseJokerHeight * scales[idx].scale);

        // Resize the joker
        jokerImages[idx].resize({
            w: jokerWidth,
            h: jokerHeight,
            mode: ResizeStrategy.NEAREST_NEIGHBOR,
        });

        // Apply rotation
        if (scales[idx].rotation !== 0) {
            jokerImages[idx].rotate(-scales[idx].rotation);
        }

        // Calculate position (converting percentages to pixels and accounting for joker dimensions)
        const xPos = Math.floor((bgImage.width * positions[idx].x) / 100 - jokerImages[idx].width / 2);
        const yPos = Math.floor((bgImage.height * positions[idx].y) / 100 - jokerImages[idx].height / 2);

        // Composite the joker onto the result
        result.composite(jokerImages[idx], xPos, yPos);
    }

    return result.getBase64("image/png");
}
