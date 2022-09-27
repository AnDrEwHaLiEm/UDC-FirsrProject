import ImageProcessClass from '../utilities/ImageProcess';
import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('Process Image exist', async () => {
    const response = await request.get('/image/process/fjord.jpg/200');
    expect(response.status).toEqual(200);
    expect(response.text).toBe(
      '<img src="http://localhost:3000/public/fjord_200.jpg" />'
    );
  });
});

describe('Image Process', () => {
  describe('add image', () => {
    it('Image exist in my public folder', async () => {
      const imageProcess = new ImageProcessClass('palmtunnel.jpg', 400);
      expect(await imageProcess.checkPhotoExistInPublicFolder()).toBe(true);
    });

    it('Image Not exist in my public folder', async () => {
      const imageProcess = new ImageProcessClass('~!@$%&*()(*&^%$).jpg', 400);
      expect(await imageProcess.checkPhotoExistInPublicFolder()).toBe(false);
    });

    it('Make file name', () => {
      const imageProcess = new ImageProcessClass('Andrew.jpg', 200);
      expect(imageProcess.getImageName()).toBe('Andrew_200.jpg');
    });

    it('Process Image exist', async () => {
      const imageProcess = new ImageProcessClass('fjord.jpg', 200);
      const { state, text } = await imageProcess.processeImage();
      expect(text).toBe(
        '<img src="http://localhost:3000/public/fjord_200.jpg" />'
      );
      expect(state).toBe(200);
    });

    it('Process Image Not exist', async () => {
      const imageProcess = new ImageProcessClass('~!@$%&*()(*&^%$).jpg', 200);
      const { state, text } = await imageProcess.processeImage();
      expect(text).toBe('Not found');
      expect(state).toBe(404);
    });
  });
});
