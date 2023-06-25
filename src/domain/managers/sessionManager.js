import {createHash, generateToken, isValidPassword} from "../../utils/bcrypt.js";
import userCreateValidation from "../validation/user/userCreateValidation.js";
import loginValidation from "../validation/session/loginValidation.js";
import container from "../../container.js";

class SessionManager
{
  constructor()
  {
     this.userRepository = container.resolve('UserRepository');
  }

  async login(email, password)
  {
    await loginValidation.parseAsync({ email, password });

    const user = await this.userRepository.getOneByEmail(email);
    const isHashedPassword = await isValidPassword(password, user.password);

    if (!isHashedPassword)
    {
        throw new Error('Login failed, invalid password.');
    }

    return await generateToken(user);
  }

  async signup(payload)
  {
    await userCreateValidation.parseAsync(payload);

    const dto = {
      ...payload,
      password: await createHash(payload.password, 10)
    }

    const user  = await this.userRepository.create(dto);

    return { ...user, password: undefined};
  }
}

export default SessionManager;