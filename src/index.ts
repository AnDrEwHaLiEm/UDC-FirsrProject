import express, { Request, Response } from 'express'
import { promises as fs } from 'fs';
import sharp from 'sharp';
const app = express();
const port = 3000;


app.use('/public', express.static('public'));

interface ProcesseImageRetuenValueInterface {
    state: number;
    text: string;
}
class ProcesseImageRetuenValue implements ProcesseImageRetuenValueInterface {
    state = 200;
    text = "Response";
}


export const checkPhotoExistInPublicFolder = async (imageName: string): Promise<Boolean> => {
    const images = await fs.readdir('public');
    if (images.includes(imageName))
        return true;
    else
        return false;
}

export const processeImage = async (image: string, imageName: string, imageSize: number): Promise<ProcesseImageRetuenValueInterface> => {
    let returnResponse = new ProcesseImageRetuenValue();
    await sharp(image).resize(imageSize).toFile(`public/${imageName}`)
        .then(() => {
            returnResponse.state = 200;
            returnResponse.text = `<img src="http://localhost:${port}/public/${imageName}" />`;
        }).
        catch(() => {
            returnResponse.state = 404;
            returnResponse.text = "Not found";
        });
    return returnResponse;
}

export const MakeImageName = (imageSize: number, image: string): string => {
    const splitImageName = image.split('.');
    const imageName = `${splitImageName[0]}_${imageSize}.${splitImageName[1]}`;
    return imageName;
}

app.get('/image/:image/:size', async (req: Request, res: Response): Promise<void> => {
    const image = req.params.image;
    const size = parseInt(req.params.size);
    const imageSize = Math.max(50, (size ? (size < 1000 ? size : 200) : 200));

    const imageName = MakeImageName(imageSize, image);

    if (await checkPhotoExistInPublicFolder(imageName) === true) {
        res.send(`<img src="http://localhost:${port}/public/${imageName}" />`);
    }
    else {
        let returnResponse = await processeImage(image, imageName, imageSize);
        res.status(returnResponse.state).send(returnResponse.text);
    }
});


app.get('/images', async (req: Request, res: Response): Promise<void> => {
    const images = await fs.readdir('public');
    let response: string = "";
    let stat = 200;
    const countImages = images.length;
    const mrg = (countImages == 1 ? 30 : 4);
    images.forEach(async element => {
        response += `<img src="http://localhost:${port}/public/${element}" style="margin-left : ${mrg}% ; margin-top : 5%;}%" />`;
    });
    if (!response) {
        response = "there is not any image";
        stat = 404;
    }
    res.status(stat).send(response);
});

app.listen(port, () => {
    console.log(`server run at http://localhost:${port}`)
});

export default app;
