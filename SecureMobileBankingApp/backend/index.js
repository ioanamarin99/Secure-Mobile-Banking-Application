import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './dbConfig.js';
import userAccount from './routes/UserAccountRoute.js';
import auth from './routes/auth.js';
import cardType from './routes/CardTypeRoute.js'
import card from './routes/CardRoute.js';
import bankAccount from './routes/BankAccountRoute.js';
import accountType from './routes/AccountTypeRoute.js';
import transactionType from './routes/TransactionTypeRoute.js';
import transactions from './routes/TransactionsRoute.js';
import {associations} from './associations/associations.js';

let app = express();

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api',userAccount);
app.use('/api/userAccount',auth);
app.use('/api',cardType);
app.use('/api',card);
app.use('/api',bankAccount);
app.use('/api',accountType);
app.use('/api',transactionType);
app.use('/api',transactions);

associations();

db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully!');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

let port = process.env.APP_PORT;
app.listen(port);
console.log('API IS RUNNING AT ' + port);