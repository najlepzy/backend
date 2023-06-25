import { Command } from "../../command.js";
import UserManager from "../data/Dao/userManager.js";

const AddUser = new Command("addUser");

AddUser.version("0.0.1")
  .description("Add user")
  .option("-e, --email <email>", "User`s email")
  .option("-fn, --firstName <firstName>", "User`s first name")
  .option("-ln, --lastName <lastName>", "User`s last name")
  .option("-p, --password <password>", "User`s password")
  .option("-a, --age <age>", "User`s age")
  .option("-ia, --isAdmin <isAdmin>", "User`s isAdmin")
  .action(async (env) => {
    const payload = {
      ...env,
      age: +env.age,
      isAdmin: env.isAdmin === "true",
    };

    const manager = new UserManager();
    const user = await manager.create(payload);

    if (user) {
      console.log("User created successfully");
    }
  });

export default AddUserCommand;
