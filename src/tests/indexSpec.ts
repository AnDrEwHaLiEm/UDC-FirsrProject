import supertest from "supertest";
import app from '../index';
import * as myfun from "../index";

const request = supertest(app);


describe("Image Project", () => {
    describe("add image", () => {
   
        it("image is exist", async () => {
            const response = await request.get("/image/fjord.jpg/200");
            expect(response.status).toBe(200);
            expect(response.text).toBe('<img src="http://localhost:3000/public/fjord_200.jpg" />');
        });

        it("image isn't exist", async () => {
            const response = await request.get("/image/not found image.jpg/200");
            expect(response.status).toBe(404);
            expect(response.text).toBe("Not found");
        });


        it("Image exist in my public folder", async () => {
            expect(await myfun.checkPhotoExistInPublicFolder("palmtunnel_400.jpg")).toBe(true);
        });

        it("Image Not exist in my public folder", async () => {
            expect(await myfun.checkPhotoExistInPublicFolder("~!@$%&*()(*&^%$).jpg")).toBe(false);
        });

        it("Make file name", () => {
            expect(myfun.MakeImageName(200, "Andrew.jpg")).toBe("Andrew_200.jpg");
        });

        it("Process Image exist", async () =>{
            const { state, text } = await myfun.processeImage("fjord.jpg", "fjord_200.jpg", 200);
            expect(text).toBe('<img src="http://localhost:3000/public/fjord_200.jpg" />');
            expect(state).toBe(200);
        })

        it("Process Image Not exist", async () => {
            const { state, text } = await myfun.processeImage("~!@$%&*()(*&^%$).jpg", "~!@$%&*()(*&^%$).jpg_200.jpg", 200);
            expect(text).toBe('Not found');
            expect(state).toBe(404);
        })
        
    });
});
