import { Passport } from 'passport';
import passportJwt, { Strategy as JwtStrategy } from 'passport-jwt';
import userDomain from '../domain/login/userDomain';
import pool from '../database/database';

require("dotenv").config();

const passport = new Passport();

const option = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}

passport.use(
    new JwtStrategy(option, async(jwtPayload, done) => {
        const auth = await pool.connect();
        try{
            const { login_index, username} = jwtPayload;
            const findUser = await userDomain.findUser(auth, login_index);

            if(findUser.length > 0 && username == findUser[0].username){
                done(null, jwtPayload);
            }else{
                const err = new Error("Error");
                err.status = 500;
                throw err;
            }
        }catch(err){
            done(err, null);
        }
    }
));

export default passport;