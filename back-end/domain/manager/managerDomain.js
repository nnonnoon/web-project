const managerDomain = {}

//---Competition---//

managerDomain.fetchInfo = async(manager, index) => {
    try{
        const managerInfo = await manager.query(`
            SELECT index, name_title, first_name, last_name
            FROM "login"
            WHERE index = ${index}
        `);
        return managerInfo.rows[0];
    }catch(err){
        throw err;
    }
}

managerDomain.addCompetition = async(manager, payload) => {
    try{
        await manager.query(`
            INSERT INTO "competition" (competition_name, location, date, manager_index, time_start, time_end)
            VALUES ('${payload.competition_name}', '${payload.location}', '${payload.date}', 
                    '${payload.index}', '${payload.time_start}', '${payload.time_end}')
        `);
    }catch(err){
        throw err;
    }
}

managerDomain.fetchCompetition = async(manager, competition_index) => {
    try{
        const competition = await manager.query(`
            SELECT index, competition_name, location, date, manager_index, time_start, time_end
            FROM competition
            WHERE index = ${competition_index}
        `);

        return competition.rows[0];
    }catch(err){
        throw err;
    }
}

managerDomain.fetchAllCompetition = async(manager) => {
    try{
        const allCompetition = await manager.query(`
            SELECT index, competition_name, location, date, manager_index, time_start, time_end
            FROM competition
            ORDER BY index DESC
        `)
        return allCompetition.rows;
    }catch(err){
        throw err;
    }
}

managerDomain.updateCompetition = async(manager, payload) => {
    try{
        var queryStr = `
            UPDATE "competition" SET
            `
        var setStr = "";

        if(payload.competition_name !== undefined){
            setStr = setStr +`competition_name = '${payload.competition_name}', `
        }

        if(payload.location!== undefined){
            setStr = setStr +`location = '${payload.location}', `
        }

        if(payload.date !== undefined){
            setStr = setStr +`date = '${payload.date}'`
        }

        var setStr = setStr + `  WHERE index = ${payload.index}`
        var queryStr = queryStr + setStr;

        await manager.query(queryStr);

    }catch(err){
        throw err;
    }
}

managerDomain.deleteCompetition = async(manager, competition_index) => {
    try{
        await manager.query(`DELETE FROM "competition" WHERE index = ${competition_index}`);

    }catch(err){
        throw err;
    }
}

managerDomain.deleteUserOfCompetition = async(manager, competition_index) => {
    try{
        await manager.query(`DELETE FROM "user" WHERE competition_index = ${competition_index}`);

    }catch(err){
        throw err;
    }
}


//---User---//

managerDomain.addUser = async(manager, payload) => {
    try{
        if(payload.tag_name === undefined){
            payload.tag_name = null
        }
        if(payload.status === undefined){
            payload.status = "Pending"
        }
        await manager.query(`
            INSERT INTO "user" (competition_index, name_title, first_name, last_name, gender, tag_name, status)
            VALUES (${payload.competition_index}, '${payload.name_title}', '${payload.first_name}', 
                    '${payload.last_name}', '${payload.gender}', '${payload.tag_name}', 
                    '${payload.status}')
        `);

    }catch(err){
        throw err;
    }
}

managerDomain.fetchUser = async(manager, user_index) => {
    try{
        const user = await manager.query(`
            SELECT index, competition_index, name_title, 
                   first_name, last_name, gender, 
                   tag_name, status
            FROM "user"
            WHERE index = ${user_index}
        `);

        return user.rows[0];
    }catch(err){
        throw err;
    }
}

managerDomain.fetchAllUser = async(manager, competition_index) => {
    try{
        const dataAllUser = await manager.query(`
            SELECT  index, competition_index, name_title, 
                    first_name, last_name, gender, 
                    tag_name, status
            FROM "user"
            WHERE competition_index = ${competition_index}
            ORDER BY index DESC
        `);
        return dataAllUser.rows;
    }catch(err){
        throw err;
    }
}

managerDomain.updateUser = async(manager, payload) => {
    try{
        var queryStr = `
            UPDATE "user" SET
            `
        var setStr = "";

        if(payload.name_title !== undefined){
            setStr = setStr +`name_title = '${payload.name_title}', `
        }

        if(payload.first_name !== undefined){
            setStr = setStr +`first_name = '${payload.first_name}', `
        }

        if(payload.last_name !== undefined){
            setStr = setStr +`last_name = '${payload.last_name}', `
        }

        if(payload.gender !== undefined){
            setStr = setStr +`gender = '${payload.gender}', `
        }

        if(payload.tag_name !== undefined){
            setStr = setStr +`tag_name = '${payload.tag_name}', `
        }

        if(payload.status !== undefined){
            setStr = setStr +`status = '${payload.status}'`
        }
        var setStr = setStr + `  WHERE index = ${payload.index}`
        var queryStr = queryStr + setStr;

        await manager.query(queryStr);

    }catch(err){
        throw err;
    }
}

managerDomain.deleteUser = async(manager, user_index) => {
    try{
        await manager.query(`DELETE FROM "user" WHERE index = ${user_index}`);
    }catch(err){
        throw err;
    }
}

managerDomain.duplicateTag = async(manager, payload) => {
    try{
        const duplicate_tag  = await manager.query(`
            SELECT index, competition_index, name_title, 
                first_name, last_name, gender, 
                tag_name, status
            FROM "user"
            WHERE competition_index= ${payload.competition_index}  AND tag_name = '${payload.tag_name}'
        `);
        return  duplicate_tag.rows;
    }catch(err){
        throw err;
    }
}

//---Tag---//

managerDomain.tag = async(manager, tag_name) => {
    try{
        const tag = await manager.query(`
            SELECT index, tag_name, tag_number
            FROM "tag"
            WHERE tag_name = '${tag_name}'
        `);
        return tag.rows;

    }catch(err){
        throw err;
    }
}

//---Gate---//

managerDomain.addGate = async(manager, payload) => {
    try{
        await manager.query(`
            INSERT INTO "gate" (gate_number, gate_ip)
            VALUES (${payload.gate_number}, '${payload.gate_ip}')`);
    }catch(err){
        throw err;
    }
}

managerDomain.fetchAllGate = async(manager) => {
    try{
        const allGate = await manager.query(`
            SELECT gate_number, gate_ip
            FROM gate`);
        return allGate.rows;
    }catch(err){
        throw err;
    }
}

managerDomain.checkGateNo = async(manager, payload) => {
    try{
        const checkGateNo = await manager.query(`
            SELECT gate_number, gate_ip
            FROM gate
            WHERE gate_number = ${payload.gate_number}`);
        return checkGateNo.rows;
    }catch(err){
        throw err;
    }
}

managerDomain.checkGateIp = async(manager, payload) => {
    try{
        const checkGateIp = await manager.query(`
            SELECT gate_number, gate_ip
            FROM gate
            WHERE gate_ip = '${payload.gate_ip}'`);
        return checkGateIp.rows;
    }catch(err){
        throw err;
    }
}

managerDomain.deleteGate = async(manager, gate_index) => {
    try{
        await manager.query(`DELETE FROM "gate" WHERE index = ${gate_index}`);
    }catch(err){
        throw err;
    }
}

export default managerDomain;