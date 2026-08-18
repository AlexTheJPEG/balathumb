import { Background, getBackgroundPath } from "./data/backgrounds";
import { getJokerLayout, calculateZOrders } from "./data/jokerLayouts";
import {
    JOKER_SPRITE_HEIGHT,
    JOKER_SPRITE_WIDTH,
    JOKER_SPRITES_PER_ROW,
    LEGENDARY_JOKERS,
    STICKER_OFFSET_Y,
    ThumbJoker,
    WEE_JOKER_ID,
    WEE_JOKER_SCALE,
    WEE_JOKER_SPRITE_ID,
} from "./data/jokers";
import { JOKER_DISPLAY_ASPECT_RATIO, THUMBNAIL_JOKER_WIDTH_RATIO } from "./data/thumbnail";

function loadAsset(source: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error(`Unable to load image: ${source}`));
        image.src = source;
    });
}

function getStickerPath(stickerName: string): string {
    return `/stickers/${stickerName}.png`;
}

function createCanvas(width: number, height: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas 2D context is unavailable");

    context.imageSmoothingEnabled = false;
    return [canvas, context];
}

export async function loadImage(jokerList: ThumbJoker[], backgroundName: Background): Promise<string> {
    const assetCache = new Map<string, HTMLImageElement>();
    const getAsset = async (source: string) => {
        const cachedAsset = assetCache.get(source);
        if (cachedAsset) return cachedAsset;

        const asset = await loadAsset(source);
        assetCache.set(source, asset);
        return asset;
    };

    const background = await getAsset(getBackgroundPath(backgroundName));
    const [result, resultContext] = createCanvas(background.naturalWidth, background.naturalHeight);
    resultContext.drawImage(background, 0, 0);

    const jokerImages = await Promise.all(
        jokerList.map(async (tJoker) => {
            const isWeeJoker = tJoker.joker.id === WEE_JOKER_ID;
            const spriteId = isWeeJoker ? WEE_JOKER_SPRITE_ID : tJoker.joker.id;
            const editionSuffix = tJoker.edition ? `_${tJoker.edition}` : "";
            const spritesheet = await getAsset(`/jokers/spritesheet${editionSuffix}.png`);
            const [jokerCanvas, jokerContext] = createCanvas(JOKER_SPRITE_WIDTH, JOKER_SPRITE_HEIGHT);
            const spriteX = ((spriteId - 1) % JOKER_SPRITES_PER_ROW) * JOKER_SPRITE_WIDTH;
            const spriteY = Math.floor((spriteId - 1) / JOKER_SPRITES_PER_ROW) * JOKER_SPRITE_HEIGHT;

            jokerContext.drawImage(
                spritesheet,
                spriteX,
                spriteY,
                JOKER_SPRITE_WIDTH,
                JOKER_SPRITE_HEIGHT,
                0,
                0,
                JOKER_SPRITE_WIDTH,
                JOKER_SPRITE_HEIGHT,
            );

            if (LEGENDARY_JOKERS.includes(tJoker.joker.filename.toLowerCase())) {
                jokerContext.drawImage(await getAsset(`/jokers/${tJoker.joker.filename}_sprite.png`), 0, 0);
            }

            for (const sticker of [...tJoker.sticker, tJoker.stake].filter(Boolean)) {
                jokerContext.drawImage(
                    await getAsset(getStickerPath(sticker)),
                    0,
                    STICKER_OFFSET_Y[tJoker.joker.id] ?? 0,
                );
            }

            return jokerCanvas;
        }),
    );

    const baseJokerWidth = Math.floor(result.width * THUMBNAIL_JOKER_WIDTH_RATIO);
    const baseJokerHeight = Math.floor(baseJokerWidth * JOKER_DISPLAY_ASPECT_RATIO);
    const { scales, positions } = getJokerLayout(jokerList.length);
    const zOrders = calculateZOrders(jokerList.length);
    const sortedIndices = Array.from({ length: jokerList.length }, (_, index) => index).sort(
        (a, b) => zOrders[a] - zOrders[b],
    );

    for (const index of sortedIndices) {
        const { scale, rotation } = scales[index];
        const isWeeJoker = jokerList[index].joker.id === WEE_JOKER_ID;
        const jokerWidth = Math.floor(baseJokerWidth * scale * (isWeeJoker ? WEE_JOKER_SCALE : 1));
        const jokerHeight = Math.floor(baseJokerHeight * scale * (isWeeJoker ? WEE_JOKER_SCALE : 1));
        const centerX = (result.width * positions[index].x) / 100;
        const centerY = (result.height * positions[index].y) / 100;

        resultContext.save();
        resultContext.translate(centerX, centerY);
        resultContext.rotate((rotation * Math.PI) / 180);
        resultContext.drawImage(jokerImages[index], -jokerWidth / 2, -jokerHeight / 2, jokerWidth, jokerHeight);
        resultContext.restore();
    }

    return result.toDataURL("image/png");
}
