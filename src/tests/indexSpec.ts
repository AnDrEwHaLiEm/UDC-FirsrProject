import supertest from "supertest";
import app from '../index';


const request = supertest(app);


describe("Image Project", () => {
    describe("add image", () => {
   
        it("image is exist", async () => {
            const response = await request.get("/image/fjord.jpg/200");
            expect(response.status).toBe(200);
            expect(response.text).toBe('<img src="http://localhost:3000/public/fjord.jpg" />');
        });

        it("image isn't exist", async () => {
            const response = await request.get("/image/not found image.jpg/200");
            expect(response.status).toBe(404);
            expect(response.text).toBe("Not found");
        });
    });
});
