import { getJokerLayout, calculateZOrders } from "./data/jokerLayouts";
import { LEGENDARY_JOKERS, ThumbJoker } from "./data/jokers";

const SPRITE_WIDTH = 142;
const SPRITE_HEIGHT = 190;
const SPRITES_PER_ROW = 10;

function loadAsset(source: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error(`Unable to load image: ${source}`));
        image.src = source;
    });
}

function getStickerPath(jokerId: number, stickerName: string): string {
    if (jokerId === 16) return `/stickers/exceptions/half_joker_${stickerName}.png`;
    if (jokerId === 65) return `/stickers/exceptions/square_joker_${stickerName}.png`;
    if (jokerId === 78) return `/stickers/exceptions/photograph_${stickerName}.png`;
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

export async function loadImage(jokerList: ThumbJoker[]): Promise<string> {
    const assetCache = new Map<string, HTMLImageElement>();
    const getAsset = async (source: string) => {
        const cachedAsset = assetCache.get(source);
        if (cachedAsset) return cachedAsset;

        const asset = await loadAsset(source);
        assetCache.set(source, asset);
        return asset;
    };

    const background = await getAsset("/bg/bg_green.png");
    const [result, resultContext] = createCanvas(background.naturalWidth, background.naturalHeight);
    resultContext.drawImage(background, 0, 0);

    const jokerImages = await Promise.all(
        jokerList.map(async (tJoker) => {
            const isWeeJoker = tJoker.joker.id === 124;
            const spriteId = isWeeJoker ? 1 : tJoker.joker.id;
            const editionSuffix = tJoker.edition ? `_${tJoker.edition}` : "";
            const spritesheet = await getAsset(`/jokers/spritesheet${editionSuffix}.png`);
            const [jokerCanvas, jokerContext] = createCanvas(SPRITE_WIDTH, SPRITE_HEIGHT);
            const spriteX = ((spriteId - 1) % SPRITES_PER_ROW) * SPRITE_WIDTH;
            const spriteY = Math.floor((spriteId - 1) / SPRITES_PER_ROW) * SPRITE_HEIGHT;

            jokerContext.drawImage(
                spritesheet,
                spriteX,
                spriteY,
                SPRITE_WIDTH,
                SPRITE_HEIGHT,
                0,
                0,
                SPRITE_WIDTH,
                SPRITE_HEIGHT,
            );

            if (LEGENDARY_JOKERS.includes(tJoker.joker.filename.toLowerCase())) {
                jokerContext.drawImage(await getAsset(`/jokers/${tJoker.joker.filename}_sprite.png`), 0, 0);
            }

            for (const sticker of [...tJoker.sticker, tJoker.stake].filter(Boolean)) {
                jokerContext.drawImage(await getAsset(getStickerPath(spriteId, sticker)), 0, 0);
            }

            return jokerCanvas;
        }),
    );

    const baseJokerWidth = Math.floor(result.width * 0.11);
    const baseJokerHeight = Math.floor(baseJokerWidth * (97 / 73));
    const { scales, positions } = getJokerLayout(jokerList.length);
    const zOrders = calculateZOrders(jokerList.length);
    const sortedIndices = Array.from({ length: jokerList.length }, (_, index) => index).sort(
        (a, b) => zOrders[a] - zOrders[b],
    );

    for (const index of sortedIndices) {
        const { scale, rotation } = scales[index];
        const isWeeJoker = jokerList[index].joker.id === 124;
        const jokerWidth = Math.floor(baseJokerWidth * scale * (isWeeJoker ? 0.6 : 1));
        const jokerHeight = Math.floor(baseJokerHeight * scale * (isWeeJoker ? 0.6 : 1));
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
