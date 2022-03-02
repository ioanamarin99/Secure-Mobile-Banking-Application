import db from '../dbConfig.js';
import sequelize from 'sequelize';

const CardType = db.define("CardType",
    {
        CardTypeID:
        {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        CardTypeDescription:
        {
            type: sequelize.STRING,
            allowNull: false
        }
    });

export default CardType;