import { Jimp } from "jimp";
import { ResizeStrategy } from "@jimp/plugin-resize";

export async function loadImage() {
    const jokerImage = await Jimp.read("/jokers/joker.png");
    const bgImage = await Jimp.read("/bg/bg_green.png");

    const result = bgImage.clone();

    jokerImage.scaleToFit({ w: 1200, h: 1200, mode: ResizeStrategy.NEAREST_NEIGHBOR });
    const x = Math.floor((bgImage.width - jokerImage.width) / 2);
    const y = Math.floor((bgImage.height - jokerImage.height) / 2);
    result.composite(jokerImage, x, y);

    return result.getBase64("image/png");
}