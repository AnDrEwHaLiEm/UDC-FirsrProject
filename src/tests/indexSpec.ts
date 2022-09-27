import ImageProcessClass from '../utilities/ImageProcess';
describe('Image Project', () => {
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
