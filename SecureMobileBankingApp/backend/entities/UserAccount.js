import db from '../dbConfig.js';
import sequelize from 'sequelize';

const UserAccount = db.define("UserAccount",
    {
        UserID:
        {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        UserName:
        {
            type: sequelize.STRING,
            allowNull: false,
        },
        UserLoginID:
        {
            type: sequelize.STRING,
            allowNull: false,
            unique: true
        },
        UserPassword:
        {
            type: sequelize.STRING,
            allowNull: false
        }
    });

  

export default UserAccount;