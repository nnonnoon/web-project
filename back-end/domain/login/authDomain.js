const authDomain = {}

authDomain.fetchUser = async(auth, username) => {
    try{
        const info = `
            SELECT index, username, password, role, name_title, first_name, last_name, gender
            FROM "login"
            WHERE username ILIKE '%${username}%'
        `
        const response = await auth.query(info);
        return response.rows;
    }catch(err){
        throw err;
    }
}

authDomain.updateAccessToken = async(auth, token) => {
    try{
        await auth.query(`
            UPDATE "tokens_access"
            SET access_token = '${token.access_token}'
            WHERE login_index = ${token.login_index}`);
    }catch(err){
        throw err;
    }
}

authDomain.updateRefreshToken = async(auth, token) => {
    try{
        await auth.query(`
            UPDATE "tokens_refresh"
            SET refresh_token = '${token.refresh_token}'
            WHERE login_index = ${token.login_index}`);
    }catch(err){
        throw err;
    }
}

export default authDomain;