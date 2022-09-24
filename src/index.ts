import express from 'express'
import { promises as fs } from 'fs';
import sharp from 'sharp';
const app = express();
const port = 3000;


app.use('/public', express.static('public'));

app.get('/image/:image/?:size', async (req, res) => {
    const image = req.params.image;
    const size = parseInt(req.params.size);
    await sharp(image).resize((size ? (size < 1000 ? size : 200) : 200)).toFile(`public/${image}`)
        .then(() => {
            res.send(`<img src="http://localhost:${port}/public/${image}" />`);
        }).
        catch(() => {
            res.status(404).send("Not found")
        });
});


app.get('/images', async (req, res) => {
    const images = await fs.readdir('public');
    let response: string = "";
    let stat = 200;
    const countImages = images.length;
    const sz = 80 / (countImages >= 7 ? 4 : (countImages > 4 ? 3 : 2));
    const mrg = (countImages == 1 ? 30 : 4);
    images.forEach(async element => {
        response += `<img src="http://localhost:${port}/public/${element}" style="margin-left : ${mrg}% ; margin-top : 5%; max-width:${sz}%" />`;
    });
    if (!response) {
        response = "there is't any image";
        stat = 404;
    }
    res.status(stat).send(response);
});

app.listen(port, () => {
    console.log(`server run at http://localhost:${port}`)
});

export default app;