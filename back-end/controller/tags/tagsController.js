import pool from '../../database/database'
import tagsDomain from '../../domain/tags/tagsDomain'

const tagsController = {}

tagsController.fetchTags = async(req, res, next) => {
    const tags = await pool.connect();

    try{
        await tags.query("BEGIN");
        var SELECT =  [];
        var FROM = [];
        var WHERE = [];
        SELECT.push("index", "tag_name", "tag_number");
        FROM.push("tags");
        const all_tags = await tagsDomain.get(tags, SELECT, FROM, WHERE);
        await tags.query("COMMIT");

        res.status(200).json({
            tags: all_tags
        });

    }catch{
        await tags.query('ROLLBACK');
        res.status(500).json({
            message: "Fetch tags error"
        });
    }finally{
        await tags.release();
    }
}

tagsController.addTags = async(req, res, next) => {
    const payload = req.body;
    const tags = await pool.connect();

    try{
        await tags.query("BEGIN");
        await tagsDomain.post(tags, payload);
        await tags.query("COMMIT");

        res.status(200).json({
            message: "Add tags success"
        });

    }catch{
        await tags.query('ROLLBACK');
        res.status(500).json({
            message: "Add tags error"
        });
    }finally{
        await tags.release();
    }
}

export default tagsController;