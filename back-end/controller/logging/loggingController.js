import pool from '../../database/database'
import loggingDomain from '../../domain/logging/loggingDomain'

const loggingController = {}

loggingController.fetchResult = async(req, res, next) => {
    const { competition_index } =  req.params;
    const logging = await pool.connect();

    try{
        await logging.query("BEGIN");
        const data_logging = await loggingDomain.fetchResult(logging, competition_index);

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

            // var t2 = dt2.getTime();
            // var t1 = dt1.getTime();

            // var time_total = parseFloat((t2-t1)/(60*1000)).toFixed(3);


            var time_base_minute = dt1.getMinutes();
            var time_base_second = dt1.getSeconds();
            var time_base_millisecond = dt1.getMilliseconds();

            var time_now_minute = dt2.getMinutes();
            var time_now_second = dt2.getSeconds();
            var time_now_millisecond = dt2.getMilliseconds();

            var time_total_minute = (time_now_minute - time_base_minute).toString();
            var time_total_second = (time_now_second - time_base_second).toString();
            var time_total_millisecond = (time_now_millisecond - time_base_millisecond).toString();

            obj["round_total"] = round;
            obj["times_total"] = time_total_minute + " m" + " : " + time_total_second + "." + time_total_millisecond + " ms"

            Result.push(obj);
        }

        await logging.query("COMMIT");


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

loggingController.fetchResultDetail = async(req, res, next) => {
    const { competition_index, user_index } = req.params;
    const logging = await pool.connect();

        
    try{
        await logging.query("BEGIN");
        const user_detail = await loggingDomain.userResultDetail(logging, user_index);

        var SELECT =  [];
        var FROM = [];
        var WHERE = [];
        SELECT.push("index", "tag_name", "tag_number");
        FROM.push("tags");
        WHERE.push(`tag_name = '${user_detail.tag_name}' `)
        const tags_tb = await loggingDomain.get(logging, SELECT, FROM, WHERE);

        // console.log(tags_tb);

        var SELECT =  [];
        var FROM = [];
        var WHERE = [];
        SELECT.push("index", "competition_index", "gate_id", "tag_number", "timestamp");
        FROM.push("logging");
        WHERE.push(`tag_number = '${tags_tb[0].tag_number}' and competition_index = '${competition_index}' `)
        const logging_tb = await loggingDomain.get(logging, SELECT, FROM, WHERE);

        var SELECT =  [];
        var FROM = [];
        var WHERE = [];
        SELECT.push("competition_name");
        FROM.push("competition");
        WHERE.push(`index = ${competition_index}`)
        const competition_tb = await loggingDomain.get(logging, SELECT, FROM, WHERE);


        var Result = [];
        var round = 1;

        var dt1 = new Date(logging_tb[0].timestamp);
        var time_base_minute = dt1.getMinutes();
        var time_base_second = dt1.getSeconds();
        var time_base_millisecond = dt1.getMilliseconds();

        for(let i = 1 ; i < logging_tb.length ; i++){
            var dt2 = new Date(logging_tb[i].timestamp);
            var date = dt2.getDate();
            var month = dt2.getMonth();
            var year = dt2.getFullYear();

            var time_now_minute = dt2.getMinutes();
            var time_now_second = dt2.getSeconds();
            var time_now_millisecond = dt2.getMilliseconds();

            month =  parseInt(month) + 1;
            month = month.toString();

            var time_per_lap_minute = (time_now_minute - time_base_minute).toString();
            var time_per_lap_second = (time_now_second - time_base_second).toString();
            var time_per_lap_millisecond = (time_now_millisecond - time_base_millisecond).toString();

            var obj = {};
            
            // obj["competition_name"] = competition_tb[0].competition_name;
            obj["competition_name"] = competition_tb[0].competition_name;
            obj["name_title"] = user_detail.name_title;
            obj["first_name"] = user_detail.first_name;
            obj["last_name"] = user_detail.last_name;
            obj["date"] = date + "/" + month + "/" + year;
            obj["round"] = round;
            obj["time"] = time_per_lap_minute + " m" + " : " + time_per_lap_second + "." + time_per_lap_millisecond + " ms"

            time_base_minute = time_now_minute;
            time_base_second = time_now_second;
            time_base_millisecond = time_now_millisecond;
            round = round + 1;

            Result.push(obj);
        }

        res.status(200).json({
            results: Result
        });

    }catch(err){
        await logging.query("ROLLBACK");
        console.log(err);
        res.status(500).json({
            message: "Fetch result detail error"
        });
    }finally{
        await logging.release();
    }
}

export default loggingController;