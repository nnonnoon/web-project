import pool from '../../database/database'
import managerDomain from '../../domain/manager/managerDomain'

const managerController = {};

//---Competition---//

managerController.addCompetition = async(req, res, next) => {
    const payload = req.body;
    const manager = await pool.connect();

    try{
        await manager.query("BEGIN");
        const managerInfo = await managerDomain.fetchInfo(manager, payload.index);
        await managerDomain.addCompetition(manager, payload);
        await manager.query("COMMIT");
        res.status(200).json({
            competition_name: payload.competition_name,
            location: payload.location,
            date: payload.date,
            time_start: payload.time_start,
            time_end: payload.time_end,
            name_title: managerInfo.name_title,
            first_name: managerInfo.first_name, 
            last_name: managerInfo.last_name
        });
    }catch(err){
        await manager.query('ROLLBACK');
        console.log(err);
        res.status(500).json({
            message: "Add competition error"
        });
    }finally{
        await manager.release();
    }
}

managerController.fetchCompetition = async(req, res, next) => {
    const { competition_index } = req.params;
    const manager = await pool.connect();

    try{
        await manager.query("BEGIN");
        const competition = await managerDomain.fetchCompetition(manager, competition_index);
        await manager.query("COMMIT");

        res.status(200).json({
            competition: competition

        });
        
    }catch(err){
        await manager.query('ROLLBACK');
        console.log(err);
        res.status(500).json({
            message: "Fetch competition error"
        });
    }finally{
        await manager.release();
    }
}

managerController.fetchAllCompetition = async(req, res, next) => {
    const manager = await pool.connect();

    try{
        await manager.query("BEGIN");
        const  payload = [];
        const allCompetition = await managerDomain.fetchAllCompetition(manager);
        for( let i= 0  ; i < allCompetition.length ; i++){
            const manager_index = allCompetition[i].manager_index;
            const dataManager = await managerDomain.fetchInfo(manager, manager_index);
            
            let dataCompetition = {};
            dataCompetition["index"] = allCompetition[i].index;
            dataCompetition["competition_name"] = allCompetition[i].competition_name;
            dataCompetition["location"] = allCompetition[i].location;
            dataCompetition["date"] = allCompetition[i].date;
            dataCompetition["time_start"] = allCompetition[i].time_start;
            dataCompetition["time_end"] = allCompetition[i].time_end;
            dataCompetition["date"] = allCompetition[i].date;
            dataCompetition["manager_name_title"] = dataManager.name_title;
            dataCompetition["manager_first_name"] = dataManager.first_name;
            dataCompetition["manager_last_name"] = dataManager.last_name;
            payload.push(dataCompetition);
        }
        
        await manager.query("COMMIT");
        res.status(200).json({
            competition: payload
        });
    }catch(err){
        await manager.query('ROLLBACK');
        console.log(err);
        res.status(500).json({
            message: "Add competition error"
        });
    }finally{
        await manager.release();
    }
}

managerController.updateCompetition = async(req, res, next) => {
    const { competition_index } = req.params;
    const payload = req.body;
    const manager = await pool.connect();

    try{
        await manager.query("BEGIN");
        payload["index"] = competition_index;
        await managerDomain.updateCompetition(manager, payload);
        await manager.query("COMMIT");
        res.status(200).json({
            message: "Update competition is success"
        });
    }catch(err){
        await manager.query('ROLLBACK');
        console.log(err);
        res.status(500).json({
            message: "Update user is error"
        });
    }finally{
        await manager.release();
    }
}

managerController.deleteCompetition = async(req, res, next) => {
    const { competition_index } = req.params;
    const manager = await pool.connect();

    try{
        await manager.query("BEGIN");
        await managerDomain.deleteUserOfCompetition(manager, competition_index)
        await managerDomain.deleteCompetition(manager, competition_index);
        await manager.query("COMMIT");
        res.status(200).json({
            message: "Delete compettion success"
        });
    }catch(err){
        await manager.query('ROLLBACK');
        console.log(err);
        res.status(500).json({
            message: "Delete competition error"
        });
    }finally{
        await manager.release();
    }
}

//---User---//

managerController.addUser = async(req, res, next) => {
    const payload = req.body;
    const manager = await pool.connect();

    try{
        await manager.query("BEGIN");
        const tag = await managerDomain.tag(manager, payload.tag_name);
        if(tag.length > 0){
            const duplicate_tag = await managerDomain.duplicateTag(manager, payload);
            if(duplicate_tag.length === 0){
                await managerDomain.addUser(manager, payload);
                await manager.query("COMMIT");
                res.status(200).json({
                    message: "Add user success"
                });
            }else{
                res.status(400).json({
                    message: "Duplicate tag!"
                });
            }
        }else{
            res.status(400).json({
                message: "Tag not found!"
            });
        }

    }catch(err){
        await manager.query('ROLLBACK');
        console.log(err);
        res.status(500).json({
            message: "Add user is error"
        });
    }finally{
        await manager.release();
    }
}

managerController.fetchUser = async(req, res, next) => {
    const { user_index } = req.params;
    const manager = await pool.connect();

    try{
        await manager.query("BEGIN");
        const user = await managerDomain.fetchUser(manager, user_index);
        await manager.query("COMMIT");

        res.status(200).json({
            user: user
        });
        
    }catch(err){
        await manager.query('ROLLBACK');
        console.log(err);
        res.status(500).json({
            message: "Fetch user is error"
        });
    }finally{
        await manager.release();
    }
}

managerController.fetchAllUser = async(req, res, next) => {
    const { competition_index } = req.params;
    const manager = await pool.connect();

    try{
        await manager.query("BEGIN");
        const dataAllUser = await managerDomain.fetchAllUser(manager, competition_index);
        const  payload = [];
        for(let i = 0 ; i < dataAllUser.length; i++){
            let user = {};
            user["index"] = dataAllUser[i].index;
            user["competition_index"] = dataAllUser[i].competition_index;
            user["name_title"] = dataAllUser[i].name_title;
            user["first_name"] = dataAllUser[i].first_name;
            user["last_name"] = dataAllUser[i].last_name;
            user["gender"] = dataAllUser[i].gender;
            user["tag_name"] = dataAllUser[i].tag_name;
            user["status"] = dataAllUser[i].status;
            payload.push(user);
        }
        await manager.query("COMMIT");

        res.status(200).json({
            user: payload
        });
    }catch(err){
        await manager.query('ROLLBACK');
        console.log(err);
        res.status(500).json({
            message: "Fetch all user is error"
        });
    }finally{
        await manager.release();
    }
}

managerController.updateUser = async(req, res, next) => {
    const { user_index } = req.params;
    const payload = req.body;
    const manager = await pool.connect();

    try{
        await manager.query("BEGIN");
        payload["index"] = user_index;
        const tag = await managerDomain.tag(manager, payload.tag_name);
        if(tag.length > 0){
            const duplicate_tag = await managerDomain.duplicateTag(manager, payload);
            if(duplicate_tag.length === 0 || duplicate_tag[0].index == user_index){
                await managerDomain.updateUser(manager, payload);
                await manager.query("COMMIT");
                res.status(200).json({
                    message: "Update user is success"
                });
            }else{
                res.status(400).json({
                    message: "Duplicate tag!"
                });
            }
        }else{
            res.status(400).json({
                message: "Tag not found!"
            });
        
        }
    }catch(err){
        await manager.query('ROLLBACK');
        console.log(err);
        res.status(500).json({
            message: "Update user is error"
        });
    }finally{
        await manager.release();
    }
}

managerController.deleteUser = async(req, res, next) => {
    const { user_index } = req.params; 
    const manager = await pool.connect();

    try{
        await manager.query("BEGIN");
        await managerDomain.deleteUser(manager, user_index);
        await manager.query("COMMIT");
        res.status(200).json({
            message: "Delete user success"
        });
    }catch(err){
        await manager.query('ROLLBACK');
        console.log(err);
        res.status(500).json({
            message: "Delete user is error"
        });
    }finally{
        await manager.release();
    }
}

//---Gate---//

managerController.addGate = async(req, res, next) => {
    const payload = req.body;
    const manager = await pool.connect();

    try{
        await manager.query("BEGIN");
        const checkGateNo = await managerDomain.checkGateNo(manager, payload);

        if(checkGateNo.length === 0){
            const checkGateIp = await managerDomain.checkGateIp(manager, payload);
            if(checkGateIp.length === 0){
                await managerDomain.addGate(manager, payload);
                await manager.query("COMMIT");
                res.status(200).json({
                    message: "Add gate success"
                });
            }else{
                res.status(400).json({
                    message: "Ip address is duplicate"
                });
            }
        }else{
            res.status(400).json({
                message: "Gate No is duplicate"
            });
        }

        
    }catch(err){
        await manager.query('ROLLBACK');
        console.log(err);
        res.status(500).json({
            message: "Add gate is error"
        });
    }finally{
        await manager.release();
    }
}

managerController.fetchAllGate = async(req, res, next) => {
    const manager = await pool.connect();

    try{
        await manager.query("BEGIN");
        const allGate = await managerDomain.fetchAllGate(manager);
        await manager.query("COMMIT");

        res.status(200).json({
            gate: allGate
        })

    }catch(err){
        await manager.query('ROLLBACK');
        console.log(err);
        res.status(500).json({
            message: "Fetch all gate is error"
        });
    }finally{
        await manager.release();
    }
}

managerController.deleteGate = async(req, res, next) => {
    const { gate_index } = req.params; 
    const manager = await pool.connect();
    
    try{
        await manager.query("BEGIN");
        await managerDomain.deleteGate(manager, gate_index);
        await manager.query("COMMIT");
        res.status(200).json({
            message: "Delete  gate success"
        });
    }catch(err){
        await manager.query('ROLLBACK');
        console.log(err);
        res.status(500).json({
            message: "Delete  gate is error"
        });
    }finally{
        await manager.release();
    }
}



export default managerController;