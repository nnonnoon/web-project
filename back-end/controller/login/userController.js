import pool from '../../database/database'
import userDomain from '../../domain/login/userDomain'
import generator from 'generate-password';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';

const userController = {};

userController.fetchAllUser = async(req, res, next) => {
    const { role } = req.user;
    const auth = await pool.connect();
    try{
        if( role != "admin"){
            res.status(400).json({
                message: "You don't have permission"
            });
        }else{
            await auth.query("BEGIN");
            const allUser = await userDomain.fetchAllUser(auth);
            res.status(200).json({
                users: allUser
            });
        }
        await auth.query("COMMIT");
    }catch(err){
        await auth.query('ROLLBACK');
        console.log(err);
        res.status(500).json({
            message: "Fetch all user error"
        });
    }finally{
        auth.release();
    }
}

userController.addUser = async(req, res, next) => {
    var { username } = req.body;
    const { role } = req.user
    const auth = await pool.connect();

    var username = username.toLowerCase();

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
                payload["role"] = req.body.role.toLowerCase();


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

userController.changePassword = async( req, res, next ) => {
    var { old_password, new_password, confirm_password } = req.body;
    const { login_index } = req.user;
    const auth = await pool.connect();

    try{
        await auth.query("BEGIN");
        const info = await userDomain.findUser(auth, login_index);
        const checkPassword = compareSync(old_password, info[0].password);

        if(checkPassword){
            if( new_password == confirm_password ){
                const salt = genSaltSync(10);
                new_password = hashSync(new_password, salt);
                await userDomain.changePassword(auth, login_index, new_password);

                res.status(200).json({
                    massage: "Change password is success"
                });
            }else{
                res.status(400).json({
                    massage: "Password isn't matching"
                });
            }
        }else{
            res.status(400).json({
                massage: "wrong password"
            });
        }
        await auth.query("COMMIT");

    }catch(err){
        await auth.query("ROLLBACK");
        res.status(500).json({
            message: "Change password is error"
        });
    }finally{
        auth.release();
    }
}

userController.deleteUser = async ( req, res, next ) => {
    const { index } = req.params;
    const { role } = req.user;
    const auth = await pool.connect();
    try{   
        await auth.query("BEGIN");
        if( role != "admin"){
            res.status(400).json({
                message: "You don't have permission"
            });
        }else{
            await userDomain.deleteUser(auth, index);
            res.status(200).json({
                message: "Delete user is success"
            });
        }
        await auth.query("COMMIT");
    }catch(err){
        await auth.query("ROLLBACK");
        res.status(500).json({
            message: "Delete user is error"
        });
    }finally{
        auth.release();
    }
}

export default userController;