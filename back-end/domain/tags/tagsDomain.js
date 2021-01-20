const tagsDomain = {}

tagsDomain.get = async(tags, SELECT, FROM, WHERE) => {
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

        const all_tags = await tags.query(str);
        return all_tags.rows;
    }catch(err){
        throw err;
    }
}

tagsDomain.post = async(tags, payload) => {
    try{
        var str = `INSERT INTO "tags" (tag_name, tag_number)
                VALUES ('${payload.tag_name}', '${payload.tag_number}')`

        // console.log(str)

        await tags.query(str);

    }catch(err){
        console.log(err)
        throw err;
    }
}

export default tagsDomain;