import express from "express";
import { Router } from "express";
import { uploader } from "../utils/Multer.js";

let users = [];

const userRouter = Router();

userRouter.get("/", (request, response) => {
  response.send({ status: "success", users });
});

userRouter.post("/", uploader.single("profilePicture"), (request, response) => {
  if (!request.file) {
    response

      .status(400)

      .send({ status: error, error: "No file has been uploaded." });
  } else {
    console.log("File uploaded successfully.");

    let user = request.body;

    user.profilePicture = request.file.path;

    users.push(user);

    response.status(200).send({
      status: "success",

      message: "User created & file has been uploaded.",
    });
  }
});

export default userRouter;
