import express from 'express';
import {createTransaction, getTransaction, getTransactionById, updateTransaction, deleteTransaction} from '../logic/TransactionsLogic.js';
import Transaction from '../entities/Transactions.js';
import UserAccount from '../entities/UserAccount.js';
import authorized from '../middleware/verifyToken.js';
import bcrypt from 'bcrypt';
import db from '../dbConfig.js';

const router = express.Router();

async function getReceipts(id){
return await db.query(`SELECT TransactionDate, SUM(Amount) Receipts FROM Transactions WHERE UserID=${id} AND TransactionDate between (DATE(NOW()) - INTERVAL 6 DAY) AND DATE(NOW()) GROUP BY TransactionDate;`,
{type: db.QueryTypes.SELECT})
}
router.route('/transaction').post(authorized,async (req, res) => {
    try {
        let transaction = await createTransaction(req.body);
        if (transaction.hasError) {
            res.status(400).json(transaction);
        }
        else {
            res.status(200).json(transaction);
        }
    }
    catch (e) {
        res.status(500).json({ hasErros: true, message: e.message })
    }
});

router.route('/transactionConfirmation').post(authorized, async(req, res) =>{
    try{
    const user = await UserAccount.findOne({where: {UserID : req.user.userID}});
    if(!user){
        res.status(400).json({message: 'No user available'});
    } else{
        console.log("PASSWORD"+ req.body.UserPassword + " " + user.UserPassword);
        const validPassword = await bcrypt.compare(req.body.UserPassword, user.UserPassword);
        if(!validPassword){
            res.status(420).json({hasErros: true, message: "Invalid password!"});
        } else{
            res.status(200).json({message: "Correct password!"});
        }
    }
    } catch(e) {
        res.status(500).json({hasErrors: true, message: e.message})
    }
});
router.route('/receipts').get(authorized,async (req,res) =>{
    try{
        res.status(200).json(await getReceipts(req.user.userID));
    } catch(e) {
        res.status(500).json({hasErrors: true, message: e.message})
    }
})
router.route('/transaction').get(async (req, res) => {
    try {
        res.status(200).json(await getTransaction());
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }
});

router.route('/transaction/:id').get(async (req, res) => {
    try {
        res.status(200).json(await getTransactionById(req.params.id));
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }
});

router.route('/userTransactions').get(authorized,async (req, res) => {
   
    try {
       console.log(req.body);
        const userTransactions = await Transaction.findAll({where: {UserID: req.user.userID }, order: [['CreatedAt', 'DESC']]});
        if(!userTransactions){
            res.status(400).json({message: "No transactions available for this user!"})
        } else{
        res.status(200).json(userTransactions);
        }
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }
});

router.route('/transaction/:id').put(async (req, res) => {
    try {
        let transaction = await updateTransaction(req.params.id, req.body);

        if (transaction.hasErrors) {
            res.status(400).json(transaction);
        }
        else {
            res.status(200).json(transaction);
        }
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }
});

router.route('/transaction/:id').delete(async (req, res) => {
    try {
        let transaction = await deleteTransaction(req.params.id);

        if (transaction.hasErrors) {
            res.status(400).json(transaction);
        }
        else {
            res.status(200).json(transaction);
        }
    }
    catch (e) {
        res.status(500).json({ hasError: true, message: e.message })
    }
});

export default router;