import db from '../dbConfig.js';
import sequelize from 'sequelize';

const AccountType = db.define("AccountType",
    {
        AccountTypeID:
        {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        AccountTypeDescription:
        {
            type: sequelize.STRING,
            allowNull: false
        }

    });

export default AccountType;