import express from "express";
import session from "express-session";
import cartRouter from "../routes/CartRouter.js";
import ProductViews from "../routes/ProductViews.js";
import ProductsRouter from "../routes/ProductsRouter.js";
import cookieRouter from "../routes/CookieRouter.js";
import sessionRouter from "../routes/SessionRouter.js";
import errorHandler from "../../utils/errorHandler.js";
import logger from "../../utils/logger.js";
import userRouter from "../../presentation/routes/userRouter.js";
import roleRouter from "../../presentation/routes/RoleRouter.js";
import handlebars from "express-handlebars";
import nodemailer from "nodemailer";
import { resolve } from "path";
import dotenv from "dotenv";
class AppExpress {
  init() {
    this.app = express();
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    /* CookieParser */
    this.app.use("/api/cookies", cookieRouter);
    /* CookieParser */
    this.app.use("/public", express.static("public"));
  }

  build() {
    /* Mongoose */
    this.app.use("/api/products", ProductsRouter);
    this.app.use("/api/carts", cartRouter);
    this.app.use("/api/sessions", sessionRouter);
    this.app.use("/api/users", userRouter);
    this.app.use("/api/roles", roleRouter);
    /* Mongoose */
    this.app.use("/home", ProductViews);

    /* logger */
    this.app.use(logger);
    /* logger */
    this.app.use(errorHandler);

    this.app.get("/", (req, res) => {
      const childProcess = fork("./presentation/middlewares/worker");

      childProcess.send({ num1: 2, num2: 3 });

      childProcess.on("message", (result) => {
        res.send(`Result: ${result}`);
        childProcess.kill();
      });

      childProcess.on("error", (error) => {
        console.error(error);
        res.status(500).send("Error occurred");
      });
    });

    this.app.get("/email", (req, res) => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_KEY,
        },
      });

      const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: "lautanaj@hotmail.com",
        subject: "Subject of the email",
        html: "<h1>HELLO</h1>",
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res.status(500).send("Error sending email");
        } else {
          console.log("Email sent: " + info.response);
          res.send("Email sent");
        }
      });
    });

    this.app.get("/send-sms", (req, res) => {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

      const client = twilio(accountSid, authToken);

      client.messages
        .create({
          body: "Hello from Argentina!",
          from: twilioPhoneNumber,
          to: "+54 1161330379",
        })
        .then((message) => {
          console.log("Message sent:", message.sid);
          res.send("SMS sent");
        })
        .catch((error) => {
          console.error("Error sending SMS:", error);
          res.status(500).send("Error sending SMS");
        });
    });

    /* Starting Handlebars */

    /* app.engine("handlebars", handlebars.engine());
    app.set("view engine", "handlebars");
    app.set("views", "src/views"); */

    /* Ending Handlebars */
  }

  listen() {
    const port = process.env.PORT;

    return this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

export default AppExpress;