const managerDomain = {}

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
            INSERT INTO "competition" (competition_name, location, date, manager_index)
            VALUES ('${payload.competition_name}', '${payload.location}', '${payload.date}', '${payload.index}')
        `);
    }catch(err){
        throw err;
    }
}

managerDomain.fetchAllCompetition = async(manager) => {
    try{
        const allCompetition = await manager.query(`
            SELECT index, competition_name, location, date, manager_index
            FROM competition
        `)
        return allCompetition.rows;
    }catch(err){
        throw err;
    }
}

export default managerDomain;