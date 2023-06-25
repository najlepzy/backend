import cookieParser from "cookie-parser";
import { Router } from "express";

const encript = process.env.encript;
const cookieRouter = Router();

cookieRouter.use(cookieParser(encript));

cookieRouter.get("/", (request, response) => {
  response.send(request.signedCookies);
});

cookieRouter.get("/:key", (request, response) => {
  const { key } = request.params;
  const value = request.signedCookies[key];
  response.send({ value });
});

cookieRouter.post("/", (request, response) => {
  const { key, value, maxAge } = request.body;
  response
    .cookie(key, value, { maxAge: maxAge, signed: true })
    .send({ key, value, maxAge });
});

cookieRouter.delete("/:key", (request, response) => {
  const { key } = request.params;
  response.clearCookie(key).send({ message: "Cookie Removed" });
});

export default cookieRouter;