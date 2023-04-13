const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : process.env.LIVE_HELP_DB,
      port : 3306,
      user : process.env.USER_LIVE,
      password : process.env.PASSWORD_LIVE,
      database : process.env.DB_LIVE
    }
  });

export default knex