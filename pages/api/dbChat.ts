import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: process.env.LIVE_HELP_DB,
    user: process.env.USER_LIVE,
    password: process.env.PASSWORD_LIVE,
    database: process.env.DB_LIVE
});

export default connection

