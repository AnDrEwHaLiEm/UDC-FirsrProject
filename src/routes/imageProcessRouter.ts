import express, { Request, Response } from 'express';
import ImageProcessClass from '../utilities/ImageProcess';

const imageRouter = express.Router();

imageRouter.get(
  '/process/:image/:size',
  async (req: Request, res: Response): Promise<void> => {
    const image = req.params.image;
    const size = parseInt(req.params.size);

    const imageProcess = new ImageProcessClass(image, size);

    if ((await imageProcess.checkPhotoExistInPublicFolder()) === true) {
      res.send(
        `<img src="http://localhost:3000/public/${imageProcess.getImageName()}" />`
      );
    } else {
      const returnResponse = await imageProcess.processeImage();
      res.status(returnResponse.state).send(returnResponse.text);
    }
  }
);

imageRouter.get(
  '/ShowAll',
  async (req: Request, res: Response): Promise<void> => {
    const imageProcess = new ImageProcessClass('imageName', 200);
    const returnResponse = await imageProcess.showAllImage();
    res.status(returnResponse.state).send(returnResponse.text);
  }
);

export default imageRouter;
