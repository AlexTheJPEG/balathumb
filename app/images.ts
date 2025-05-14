import { Jimp } from "jimp";
import { ResizeStrategy } from "@jimp/plugin-resize";

export async function loadImage(numJokers: number = 1): Promise<string> {
    const jokerImage = await Jimp.read("/jokers/joker.png");
    const bgImage = await Jimp.read("/bg/bg_green.png");

    const result = bgImage.clone();

    const joker1 = jokerImage.clone();
    const joker2 = jokerImage.clone();
    const joker3 = jokerImage.clone();
    const joker4 = jokerImage.clone();
    const joker5 = jokerImage.clone();

    let x1, y1, x2, y2, x3, y3, x4, y4, x5, y5;
    switch (numJokers) {
        case 1:
            joker1.scaleToFit({ w: 1200, h: 1200, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            x1 = Math.floor((bgImage.width - joker1.width) / 2);
            y1 = Math.floor((bgImage.height - joker1.height) / 2);

            result.composite(joker1, x1, y1);
            break;
        case 2:
            joker1.scaleToFit({ w: 1100, h: 1100, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            x1 = Math.floor((bgImage.width - joker1.width) / 4);
            y1 = Math.floor((bgImage.height - joker1.height) / 2);

            joker2.scaleToFit({ w: 1100, h: 1100, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            x2 = Math.floor((bgImage.width - joker2.width) * 3 / 4);
            y2 = Math.floor((bgImage.height - joker2.height) / 2);

            result.composite(joker1, x1, y1);
            result.composite(joker2, x2, y2);
            break;
        case 3:
            joker1.scaleToFit({ w: 1100, h: 1100, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            joker1.rotate(5);
            x1 = Math.floor((bgImage.width - joker1.width) / 8);
            y1 = Math.floor((bgImage.height - joker1.height) / 2);

            joker2.scaleToFit({ w: 1200, h: 1200, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            x2 = Math.floor((bgImage.width - joker2.width) / 2);
            y2 = Math.floor((bgImage.height - joker2.height) / 2);

            joker3.scaleToFit({ w: 1100, h: 1100, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            joker3.rotate(-5);
            x3 = Math.floor((bgImage.width - joker3.width) * 7 / 8);
            y3 = Math.floor((bgImage.height - joker3.height) / 2);

            result.composite(joker1, x1, y1);
            result.composite(joker3, x3, y3);
            result.composite(joker2, x2, y2);
            break;
        case 4:
            joker1.scaleToFit({ w: 800, h: 800, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            joker1.rotate(5);
            x1 = Math.floor((bgImage.width - joker1.width) / 9);
            y1 = Math.floor((bgImage.height - joker1.height) / 2);

            joker2.scaleToFit({ w: 850, h: 850, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            x2 = Math.floor((bgImage.width - joker2.width) / 3);
            y2 = Math.floor((bgImage.height - joker2.height) / 2);

            joker3.scaleToFit({ w: 850, h: 850, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            x3 = Math.floor((bgImage.width - joker3.width) * 2 / 3);
            y3 = Math.floor((bgImage.height - joker3.height) / 2);

            joker4.scaleToFit({ w: 800, h: 800, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            joker4.rotate(-5);
            x4 = Math.floor((bgImage.width - joker4.width) * 8 / 9);
            y4 = Math.floor((bgImage.height - joker4.height) / 2);

            result.composite(joker1, x1, y1);
            result.composite(joker4, x4, y4);
            result.composite(joker2, x2, y2);
            result.composite(joker3, x3, y3);
        case 5:
            joker1.scaleToFit({ w: 600, h: 600, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            joker1.rotate(7.5);
            x1 = Math.floor((bgImage.width - joker1.width) / 9);
            y1 = Math.floor((bgImage.height - joker1.height) / 2);

            joker2.scaleToFit({ w: 800, h: 800, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            joker2.rotate(5);
            x2 = Math.floor((bgImage.width - joker2.width) / 4);
            y2 = Math.floor((bgImage.height - joker2.height) / 2);

            joker3.scaleToFit({ w: 1000, h: 1000, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            x3 = Math.floor((bgImage.width - joker3.width) / 2);
            y3 = Math.floor((bgImage.height - joker3.height) / 2);

            joker4.scaleToFit({ w: 800, h: 800, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            joker4.rotate(-5);
            x4 = Math.floor((bgImage.width - joker4.width) * 3 / 4);
            y4 = Math.floor((bgImage.height - joker4.height) / 2);

            joker5.scaleToFit({ w: 600, h: 600, mode: ResizeStrategy.NEAREST_NEIGHBOR });
            joker5.rotate(-7.5);
            x5 = Math.floor((bgImage.width - joker5.width) * 8 / 9);
            y5 = Math.floor((bgImage.height - joker5.height) / 2);

            result.composite(joker1, x1, y1);
            result.composite(joker5, x5, y5);
            result.composite(joker2, x2, y2);
            result.composite(joker4, x4, y4);
            result.composite(joker3, x3, y3);
            break;
    }

    return result.getBase64("image/png");
}