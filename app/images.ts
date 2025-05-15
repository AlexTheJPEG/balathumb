import { Jimp } from "jimp";
import { ResizeStrategy } from "@jimp/plugin-resize";
import { LEGENDARY_JOKERS } from "./data/jokers";

export async function loadImage(jokerList: string[]): Promise<string> {
    const bgImage = await Jimp.read("/bg/bg_green.png");

    const result = bgImage.clone();

    const jokerImages = [];
    for (const joker of jokerList) {
        let jokerImage;

        if (LEGENDARY_JOKERS.includes(joker)) {
            const baseImage = await Jimp.read(`/jokers/${joker}.png`);
            const spriteImage = await Jimp.read(`/jokers/${joker}_sprite.png`);
            jokerImage = baseImage.clone();
            jokerImage.composite(spriteImage, 0, 0);
        } else {
            jokerImage = await Jimp.read(`/jokers/${joker}.png`);
        }
        
        jokerImages.push(jokerImage);
    }

    let x1, y1, x2, y2, x3, y3, x4, y4, x5, y5;
    switch (jokerList.length) {
        case 1:
            jokerImages[0].scaleToFit({ w: 1200, h: 1200, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            x1 = Math.floor((bgImage.width - jokerImages[0].width) / 2);
            y1 = Math.floor((bgImage.height - jokerImages[0].height) / 2);

            result.composite(jokerImages[0], x1, y1);
            break;
        case 2:
            jokerImages[0].scaleToFit({ w: 1100, h: 1100, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            x1 = Math.floor((bgImage.width - jokerImages[0].width) / 4);
            y1 = Math.floor((bgImage.height - jokerImages[0].height) / 2);

            jokerImages[1].scaleToFit({ w: 1100, h: 1100, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            x2 = Math.floor((bgImage.width - jokerImages[1].width) * 3 / 4);
            y2 = Math.floor((bgImage.height - jokerImages[1].height) / 2);

            result.composite(jokerImages[0], x1, y1);
            result.composite(jokerImages[1], x2, y2);
            break;
        case 3:
            jokerImages[0].scaleToFit({ w: 1100, h: 1100, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            jokerImages[0].rotate(5);
            x1 = Math.floor((bgImage.width - jokerImages[0].width) / 8);
            y1 = Math.floor((bgImage.height - jokerImages[0].height) / 2);

            jokerImages[1].scaleToFit({ w: 1200, h: 1200, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            x2 = Math.floor((bgImage.width - jokerImages[1].width) / 2);
            y2 = Math.floor((bgImage.height - jokerImages[1].height) / 2);

            jokerImages[2].scaleToFit({ w: 1100, h: 1100, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            jokerImages[2].rotate(-5);
            x3 = Math.floor((bgImage.width - jokerImages[2].width) * 7 / 8);
            y3 = Math.floor((bgImage.height - jokerImages[2].height) / 2);

            result.composite(jokerImages[0], x1, y1);
            result.composite(jokerImages[2], x3, y3);
            result.composite(jokerImages[1], x2, y2);
            break;
        case 4:
            jokerImages[0].scaleToFit({ w: 800, h: 800, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            jokerImages[0].rotate(5);
            x1 = Math.floor((bgImage.width - jokerImages[0].width) / 9);
            y1 = Math.floor((bgImage.height - jokerImages[0].height) / 2);

            jokerImages[1].scaleToFit({ w: 850, h: 850, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            x2 = Math.floor((bgImage.width - jokerImages[1].width) / 3);
            y2 = Math.floor((bgImage.height - jokerImages[1].height) / 2);

            jokerImages[2].scaleToFit({ w: 850, h: 850, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            x3 = Math.floor((bgImage.width - jokerImages[2].width) * 2 / 3);
            y3 = Math.floor((bgImage.height - jokerImages[2].height) / 2);

            jokerImages[3].scaleToFit({ w: 800, h: 800, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            jokerImages[3].rotate(-5);
            x4 = Math.floor((bgImage.width - jokerImages[3].width) * 8 / 9);
            y4 = Math.floor((bgImage.height - jokerImages[3].height) / 2);

            result.composite(jokerImages[0], x1, y1);
            result.composite(jokerImages[3], x4, y4);
            result.composite(jokerImages[1], x2, y2);
            result.composite(jokerImages[2], x3, y3);
            break;
        case 5:
            jokerImages[0].scaleToFit({ w: 600, h: 600, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            jokerImages[0].rotate(7.5);
            x1 = Math.floor((bgImage.width - jokerImages[0].width) / 9);
            y1 = Math.floor((bgImage.height - jokerImages[0].height) / 2);

            jokerImages[1].scaleToFit({ w: 800, h: 800, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            jokerImages[1].rotate(5);
            x2 = Math.floor((bgImage.width - jokerImages[1].width) / 4);
            y2 = Math.floor((bgImage.height - jokerImages[1].height) / 2);

            jokerImages[2].scaleToFit({ w: 1000, h: 1000, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            x3 = Math.floor((bgImage.width - jokerImages[2].width) / 2);
            y3 = Math.floor((bgImage.height - jokerImages[2].height) / 2);

            jokerImages[3].scaleToFit({ w: 800, h: 800, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            jokerImages[3].rotate(-5);
            x4 = Math.floor((bgImage.width - jokerImages[3].width) * 3 / 4);
            y4 = Math.floor((bgImage.height - jokerImages[3].height) / 2);

            jokerImages[4].scaleToFit({ w: 600, h: 600, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            jokerImages[4].rotate(-7.5);
            x5 = Math.floor((bgImage.width - jokerImages[4].width) * 8 / 9);
            y5 = Math.floor((bgImage.height - jokerImages[4].height) / 2);

            result.composite(jokerImages[0], x1, y1);
            result.composite(jokerImages[4], x5, y5);
            result.composite(jokerImages[1], x2, y2);
            result.composite(jokerImages[3], x4, y4);
            result.composite(jokerImages[2], x3, y3);
            break;
    }

    return result.getBase64("image/png");
}