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
import { fork } from "child_process";

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
    /* Mongoose*/
    this.app.use("/api/products", ProductsRouter);
    this.app.use("/api/carts", cartRouter);
    this.app.use("/api/sessions", sessionRouter);
    this.app.use("/api/users", userRouter);
    this.app.use("/api/roles", roleRouter);
    /* Mongoose*/
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
