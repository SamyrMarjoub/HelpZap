import mysql from 'mysql2'

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

export default connection






