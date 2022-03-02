import db from '../dbConfig.js';
import sequelize from 'sequelize';

const TransactionType = db.define("TransactionType",
    {
        TransactionTypeID:
        {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        TransactionTypeDescription:
        {
            type: sequelize.STRING,
            allowNull: false
        }
    });

export default TransactionType;