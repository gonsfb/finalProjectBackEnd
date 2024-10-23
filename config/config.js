require('dotenv').config();


module.exports={

  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.Db_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
  },
};
 