const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool ({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    database: process.env.PG_DB,
    port: process.env.DB_PORT,
    max: 100
});

pool.connect()
.then(() => console.log("connected"));

module.exports = pool;


