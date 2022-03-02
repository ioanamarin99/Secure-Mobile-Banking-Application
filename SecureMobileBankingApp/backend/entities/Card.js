import db from '../dbConfig.js';
import sequelize from 'sequelize';

const Card = db.define("Card",
    {
        CardID:
        {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        CardTypeID:
        {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false
        },
        CardNumber:
        {
            type: sequelize.STRING,
            allowNull: false,
            unique: true
        },
        CardHolder:
        {
            type: sequelize.STRING,
            allowNull: false,
        },
        CardStatus:
        {
            type: sequelize.ENUM,
            values: ['ACTIVE', 'INACTIVE'],
            allowNull: false
        },
        ExpiryDate:
        {
            type: sequelize.DATE,
            allowNull: false
        },
        CreditLimit:
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
        },
        AccountID:
        {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false
        }
   
    });

export default Card;