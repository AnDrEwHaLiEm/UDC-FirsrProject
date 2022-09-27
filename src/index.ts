import express from 'express';
import imageRouter from './routes/imageProcessRouter';
const app = express();
const port = 3000;

app.use('/public', express.static('public'));

app.use('/image', imageRouter);

app.listen(port, () => {
  console.log(`server run at http://localhost:${port}`);
});

export default app;
