import pool from '../../database/database'
import userDomain from '../../domain/login/userDomain'
import generator from 'generate-password';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';

const userController = {};

userController.addUser = async(req, res, next) => {
    const { username } = req.body;
    const { role } = req.user
    const auth = await pool.connect();

    try{
        if( role != 'admin'){
            res.status(400).json({
                message: "You don't have permission"
            });
        }else{
            await auth.query("BEGIN");
            const checkUser = await userDomain.selectUser(auth, username);

            if(checkUser.length > 0 ){
                res.status(400).json({
                    message: "Dupicate key error"
                });
            }else{
                const genPassword = generator.generate({
                    length: 6,
                    uppercase: true
                });
                
                const keepPassword = genPassword;
                const salt = genSaltSync(10);
                const payload = {}
                payload["username"] = username;
                payload["password"] = hashSync(genPassword, salt);
                payload["role"] = req.body.role;


                const login_index = await userDomain.insertUser(auth, payload);
                await userDomain.insertTokenAccessTable(auth, login_index);
                await userDomain.insertTokenRefreshTable(auth, login_index);


                res.status(200).json({
                    username: username,
                    password: keepPassword
                });
            }
            await auth.query("COMMIT");
        }
    }catch(err){
        await auth.query('ROLLBACK');
        console.log(err);
        res.status(500).json({
            message: "Add user error"
        });
    }finally{
        auth.release();
    }
}

export default userController;