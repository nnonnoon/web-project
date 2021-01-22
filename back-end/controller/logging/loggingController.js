import pool from '../../database/database'
import loggingDomain from '../../domain/logging/loggingDomain'

const loggingController = {}

loggingController.fetchResult = async(req, res, next) => {
    const { competition_index } =  req.params;
    const logging = await pool.connect();

    try{
        await logging.query("BEGIN");
        const data_logging = await loggingDomain.fetchResult(logging, competition_index);
        await logging.query("COMMIT");

        var Result = [];
        var visitTag = {};


        for(let i = 0; i < data_logging.length ; i ++){
            var tag_number = data_logging[i].tag_number;
            var time_stamp = data_logging[i].timestamp;
            const map_tag = await loggingDomain.mapTags(logging, tag_number);

            var tag_name = map_tag.tag_name;

            if (!(tag_name in visitTag)){
                visitTag[tag_name] = [];
            }
            visitTag[tag_name].push(time_stamp);
        }  

        //---Keep---//
        for(var key in visitTag) {
            var obj = {};
            const user_detail = await loggingDomain.userDetail(logging, key, competition_index);
            obj["index"] = user_detail.index;
            obj["name_title"] = user_detail.name_title;
            obj["first_name"] = user_detail.first_name;
            obj["last_name"] = user_detail.last_name;
            obj["gender"] = user_detail.gender;

            var value = visitTag[key];
            var round = value.length - 1 

            var dt1 = new Date(value[0]);
            var dt2 = new Date(value[round]);

            var t2 = dt2.getTime();
            var t1 = dt1.getTime();

            var time_total = parseFloat((t2-t1)/(60*1000)).toFixed(3);

            obj["round_total"] = round;
            obj["times_total"] = time_total

            Result.push(obj);
        }


        res.status(200).json({
            results: Result
        });

    }catch(err){
        await logging.query("ROLLBACK");
        console.log(err);
        res.status(500).json({
            message: "Fetch result error"
        });

    }finally{
        await logging.release();
    }

}

export default loggingController;