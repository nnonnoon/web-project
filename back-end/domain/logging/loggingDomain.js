const loggingDomain = {}

loggingDomain.fetchResult = async(logging, competition_index) => {
    try{
        const data_logging = await logging.query(`
            SELECT index, competition_index, gate_id, tag_number, timestamp
            FROM "logging"
            WHERE competition_index = ${competition_index}
            ORDER BY timestamp ASC
        `);

        return data_logging.rows;

    }catch(err){
        console.log(err)
        throw err;
    }
}

loggingDomain.mapTags = async(logging, tag_number) => {
    try{
        const map_tags = await logging.query(`
            SELECT index, tag_name, tag_number
            FROM "tags"
            WHERE tag_number = '${tag_number}'
        `);

        return map_tags.rows[0];

    }catch(err){
        console.log(err)
        throw err;
    }
}

loggingDomain.userDetail = async(logging, tag_name, competition_index) => {
    try{
        const user_detail = await logging.query(`
            SELECT index, name_title, competition_index, first_name, last_name, gender, tag_name
            FROM "user"
            WHERE tag_name = '${tag_name}' and competition_index = ${competition_index}
        `);

        return user_detail.rows[0];

    }catch(err){
        console.log(err)
        throw err;
    }
}

loggingDomain.userResultDetail = async(logging, user_index) => {
    try{
        const user_result_detail = await logging.query(`
            SELECT index, name_title, competition_index, first_name, last_name, gender, tag_name
            FROM "user"
            WHERE index = ${user_index} 
        `);

        return user_result_detail.rows[0];

    }catch(err){
        console.log(err)
        throw err;
    }
}

loggingDomain.get = async(logging, SELECT, FROM, WHERE) => {
    try{
        var str = "SELECT ";
        for(let i = 0; i < SELECT.length ; i++){
            if(i == SELECT.length-1){
                str = str + SELECT[i];
            }else{
                str = str + SELECT[i] + ",";
            }
        }

        str = str + " FROM " + `${FROM[0]}`;

        if(WHERE.length > 0 ){
            str = str + " WHERE "+ `${WHERE[0]}`;
        }

        str = str + " ORDER BY index ASC"

        const all_tags = await logging.query(str);
        return all_tags.rows;
    }catch(err){
        throw err;
    }
}

export default loggingDomain;