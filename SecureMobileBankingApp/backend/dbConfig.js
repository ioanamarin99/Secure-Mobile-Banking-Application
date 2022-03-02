import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const db=new Sequelize({
    dialect: 'mariadb',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PSSWD,
    validateBulkLoadParameters: true,
    define:{
        timestamps:true,
        freezeTableName: true
    }

})

export default db;