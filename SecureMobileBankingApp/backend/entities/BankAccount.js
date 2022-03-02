import db from '../dbConfig.js';
import sequelize from 'sequelize';

const BankAccount = db.define("BankAccount",
    {
        AccountID:
        {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        AccountTypeID:
        {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false
        },
        AccountOwner:
        {
            type: sequelize.STRING,
            allowNull:false 
        },
        AccountNumber:
        {
            type: sequelize.STRING,
            allowNull: false,
            unique: true
        },
        BIC_SWIFT:
        {
            type: sequelize.STRING,
            allowNull: false
        },
        AvailableBalance:
        {
            type: sequelize.DECIMAL,
            allowNull: true
        },
        AccountBalance:
        {
            type: sequelize.DECIMAL,
            allowNull: true
        },
        BlockedAmounts:
        {
            type: sequelize.DECIMAL,
            allowNull: true
        },
        AccountLimits:
        {
            type: sequelize.DECIMAL,
            allowNull: true
        },
        UserID:
        {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false
        }
    });

    export default BankAccount;