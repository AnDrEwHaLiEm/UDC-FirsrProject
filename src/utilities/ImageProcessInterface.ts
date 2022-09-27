import DefaultResponseInterface from './DefaultResponseInterface';

export default interface ImageProcessInterface {
  checkPhotoExistInPublicFolder(): Promise<boolean>;
  processeImage(): Promise<DefaultResponseInterface>;
  getImageName(): string;
  showAllImage(): Promise<DefaultResponseInterface>;
}
