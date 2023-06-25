import { exit } from "shelljs";
import { program } from "commander";
import dotenv from "dotenv";
import mongoose from "../core/Connection.js";
import AddUser from "../presentation/commands/AddUser.js";

dotenv.config();

void (async () => {
  try {
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    program.addCommand(AddUser);

    await program.parseAsync(process.argv);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
