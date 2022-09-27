import sharp from 'sharp';
import { promises as fs } from 'fs';
import DefaultRespons from './DefaultRespons';
import ImageProcessInterface from './ImageProcessInterface';
import DefaultResponseInterface from './DefaultResponseInterface';

export default class ImageProcessClass implements ImageProcessInterface {
  private imageName: string;
  public image: string;
  public imageSize: number;
  public constructor(image: string, size: number) {
    this.image = image ?? '';
    this.imageSize = Math.max(50, size ? (size <= 1400 ? size : 200) : 200);
    const splitImageName = image.split('.');
    const joinImageName = splitImageName.slice(0, -1).join();
    this.imageName = `${joinImageName}_${this.imageSize}.${
      splitImageName[splitImageName.length - 1]
    }`;
  }

  async checkPhotoExistInPublicFolder(): Promise<boolean> {
    const images = await fs.readdir('public');
    if (images.includes(this.imageName as string)) return true;
    else return false;
  }

  getImageName(): string {
    return this.imageName;
  }

  async processeImage(): Promise<DefaultResponseInterface> {
    const respnseDataValue = new DefaultRespons();
    await sharp(this.image as string)
      .resize(this.imageSize as number)
      .toFile(`public/${this.imageName}`)
      .then(() => {
        respnseDataValue.text = `<img src="http://localhost:3000/public/${this.imageName}" />`;
      })
      .catch(() => {
        respnseDataValue.state = 404;
        respnseDataValue.text = 'Not found';
      });
    return respnseDataValue;
  }

  async showAllImage(): Promise<DefaultResponseInterface> {
    const images = await fs.readdir('public');
    const responseDataValue = new DefaultRespons();

    const countImages = images.length;
    const mrg = countImages == 1 ? 30 : 4;
    let response = '';
    images.forEach(async (element) => {
      response += `<img src="http://localhost:3000/public/${element}" style="margin-left : ${mrg}% ; margin-top : 5%;}%" />`;
    });
    if (!response) {
      responseDataValue.text = 'there is not any image';
      responseDataValue.state = 404;
    }
    responseDataValue.text = response;
    return responseDataValue;
  }
}
