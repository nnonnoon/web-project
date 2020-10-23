import pool from '../../database/database'
import authDomain from '../../domain/login/authDomain'
import jwt from 'jsonwebtoken';
import { compareSync } from 'bcrypt';

const authController = {};

const jwtSecrect = process.env.SECRET_KEY

const accessTokenLifeTime = process.env.ACCESS_TOKEN_LIFETIME;

const refreshTokenLifeTime = process.env.REFRESH_TOKEN_LIFETIME || 43200000;

authController.login = async(req, res, next) => {
    var { username, password } = req.body;
    const auth = await pool.connect();

    try{
        await auth.query("BEGIN")
        const info = await authDomain.fetchUser(auth, username);
        if(info.length > 0 ){
            const login_index = info[0].index;
            const username = info[0].username;
            const checkPassword = compareSync(password, info[0].password);
            const role = info[0].role;
            
            if(checkPassword){
                const accessToken = jwt.sign(
                    {
                        login_index,
                        username,
                        role
                    },
                    jwtSecrect,
                    { expiresIn: accessTokenLifeTime }
                );
                const refreshToken = jwt.sign(
                    {
                        login_index
                    },
                    jwtSecrect,
                    { expiresIn: refreshTokenLifeTime }
                );

                const token = {}
                token["login_index"] = login_index;
                token["refresh_token"] = refreshToken;
                token["access_token"] = accessToken;
                
                await authDomain.updateAccessToken(auth, token);
                await authDomain.updateRefreshToken(auth, token);

                res.status(200).json({
                    accessToken: accessToken,
                    refreshToken: refreshToken
                });
            }else{
                res.status(400).json({
                    message: "wrong password"
                });
            }
        }else{
            res.status(400).json({
                message: "User not found!!"
            });
        }
        await auth.query("COMMIT")
    }catch(err){
        await auth.query("ROLLBACK")
        console.log(err);
        res.status(500).json({
            Register: "FetchUserAll is error"
        });

    }finally{
        auth.release();
    }
}

authController.logout = async(req, res, next) => {
    const { login_index = -1 } = req.body;
    const auth = await pool.connect();

    try{
        if(login_index == -1){
            res.status(400).json({
                message: "Haven't user user index!!"
            })
        }else{
            const token = {}
            token["login_index"] = login_index;
            token["refresh_token"] = null;
            token["access_token"] = null;

            await auth.query("BEGIN");
            await authDomain.updateAccessToken(auth, token);
            await authDomain.updateRefreshToken(auth, token);
            await auth.query("COMMIT");

            res.status(200).json({
                message: "logout"
            });

            // res.status(200).redirect('/');
        }

    }catch(err){
        await auth.query("ROLLBACK");
        console.log(err);
        res.status(500).json({
            Register: "FetchUserAll is error"
        });
    }finally{
        auth.release();
    }
}

export default authController;