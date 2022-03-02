import db from '../dbConfig.js';
import sequelize from 'sequelize';

const Transactions = db.define("Transactions",
    {
        TransactionID:
        {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        TransactionTypeID:
        {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false
        },
        TransactionDate:
        {
            type: sequelize.DATE,
            allowNull: false
        },
        ValueDate:
        {
            type: sequelize.DATE,
            allowNull: false
        },
        Amount:
        {
            type: sequelize.DECIMAL,
            allowNull: false
        },
        BeneficiaryOrRemitter:
        {
            type: sequelize.STRING,
            allowNull: false,
        },
        AssociatedIAccountNumber:
        {
            type: sequelize.STRING,
            allowNull: false,
        },
        Description:
        {
            type: sequelize.STRING,
            allowNull: false,
        },
        UserID:
        {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false
        },
        AccountID:
        {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false
        }
    });

export default Transactions;