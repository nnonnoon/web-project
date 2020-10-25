import { response } from 'express';
import pool from '../../database/database'
import managerDomain from '../../domain/manager/managerDomain'

const managerController = {};

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

managerController.fetchAllCompetition = async(req, res, next) => {
    const manager = await pool.connect();

    try{
        await manager.query("BEGIN");
        const  payload = [];
        const allCompetition = await managerDomain.fetchAllCompetition(manager);
        let i = allCompetition.length;
        for( i=i-1 ; i >= 0; i--){
            const manager_index = allCompetition[i].manager_index;
            const dataManager = await managerDomain.fetchInfo(manager, manager_index);
            
            let dataCompetition = {};
            dataCompetition["index"] = allCompetition[i].index;
            dataCompetition["competition_name"] = allCompetition[i].competition_name;
            dataCompetition["location"] = allCompetition[i].location;
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

managerController.deleteCompetition = async(req, res, next) => {
    const { competition_index } = req.params;
    const manager = await pool.connect();

    try{
        await manager.query("BEGIN");
        await managerDomain.deleteCompetition(manager, competition_index);
        res.status(200).json({
            message: "Delete compettion success"
        });
        await manager.query("COMMIT");
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Delete competition error"
        });
    }finally{
        await manager.release();
    }
}

export default managerController;