import dotenv from "dotenv";
import mongoose from "mongoose";

const env = dotenv.config().parsed;
/* Mongoose configuration vsc */

await mongoose
  .connect(env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected 🍕");
  });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log("CONNECTED");
});

/* Mongoose configuration vsc*/

export default mongoose;