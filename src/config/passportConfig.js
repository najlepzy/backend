import passport from "passport"
import local from 'passport-local';
import UserManager from "../Dao/userManager.js";
import {createHash, isValidPassword} from "../utils/bcrypt.js"

const LocalStrategy = local.Strategy;

const register = new LocalStrategy({passrequestToCallback: true, usernameField: 'email'}, async (request, username, password, done)=> {
    try
    {
      const manager = new UserManager();
      let user = await manager.getOneByEmail(request.body.email);

      if(user.id)
      {
        console.log('User already exists.');
        return done(null, false);
      }

      const dto = {
        ...request.body,
        password: await createHash(request.body.password)
      }
      
      let result = await manager.create(dto);
      return done(null, result);
    }
    catch (e)
    {
        done('Error getting user  : ' + e);
    }
});

const login2 = new LocalStrategy({usernameField: 'email'}, async (username, password, done)=> {
    try
    {
      const manager = new UserManager();
      let user = await manager.getOneByEmail(username);

      if(!user.id)
      {
        console.log('User doesnt exist.');
        return done(null, false);
      }

      if(!await isValidPassword(password, user.password)) return done (null, false);
      return done(null, user);
    }
    catch (e)
    {
        done(e);
    }
});

const initializePassport = () => {
  passport.use('register', register);
  passport.use('login2', login2);

  passport.serializeUser((user, done)=>
  {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) =>
  {
     const manager = new UserManager();
     let user = await manager.getOne(id);
     done(null, user);
  });
}

export default initializePassport;