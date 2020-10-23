const userDomain = {}

userDomain.findUser = async(auth, login_index) => {
    try{
        const response = await auth.query(`
            SELECT index, username, password,role 
            FROM login
            WHERE index = ${login_index}
        `);
        return response.rows;
    }catch(err){
        throw err;
    }
}

userDomain.fetchAllUser = async(auth) => {
    try{
        const allUser = await auth.query(`
            SELECT index, username, role, name_title, first_name, last_name, gender
            FROM login
        `);
        return allUser.rows;
    }catch(err){
        throw err;
    }
}

userDomain.selectUser = async(auth, username) => {
    try{
        const response = await auth.query(`
            SELECT index, username, password,role, name_tiltle, first_name, last_name, gender 
            FROM login
            WHERE username = '${username}'
        `);
        return response.rows;
    }catch(err){    
        throw err;
    }
}

userDomain.insertUser = async(auth, payload) => {
    try{
        const response = await auth.query(`
            INSERT INTO "login" (username, password, role, name_title, first_name, last_name, gender)
            VALUES ('${payload.username}', '${payload.password}', '${payload.role}', '${name_title}', '${first_name}', '${last_name}', '${gender}') 
            RETURNING *
        `);
        return response.rows[0].index;
    }catch(err){
        throw err;
    }
}

userDomain.changePassword = async(auth, login_index, new_password) => {
    try{
        const  test = await auth.query(`
            UPDATE "login"
            SET password = '${new_password}'
            WHERE index = ${login_index}
        `);
    }catch(err){
        throw err;
    }
}

userDomain.deleteUser = async(auth, index) => {
    try{
        await auth.query(`DELETE FROM "login" WHERE index = '${index}'`);
    }catch(err){
        throw err;
    }
}

userDomain.insertTokenRefreshTable = async(auth, login_index) => {
    try{
        await auth.query(`
            INSERT INTO "tokens_refresh" (login_index, refresh_token)
            VALUES (${login_index}, null)
        `);
    }catch(err){
        throw err;
    }
}

userDomain.insertTokenAccessTable = async(auth, login_index) => {
    try{
        await auth.query(`
            INSERT INTO "tokens_access" (login_index, access_token)
            VALUES (${login_index}, null)
        `);
    }catch(err){
        throw err;
    }
}

export default userDomain;