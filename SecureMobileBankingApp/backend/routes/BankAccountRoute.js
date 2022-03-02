import express from 'express';

import {createBankAccount, getBankAccount, getBankAccountById, updateBankAccount, deleteBankAccount} from '../logic/BankAccountLogic.js';
import BankAccount from '../entities/BankAccount.js';
import authorized from '../middleware/verifyToken.js';

const router = express.Router();

router.route('/bankAccount').post(async (req, res) => {
    try {
        const bankAccountAlreadyExists = await BankAccount.findOne({ where: { AccountID: req.body.AccountID } });
        if (bankAccountAlreadyExists) {
            res.status(410).json({ hasErros: true, message: "Bank account already exists!" });
        }

        let bankAccount = await createBankAccount(req.body);
        if (bankAccount.hasError) {
            res.status(400).json(bankAccount);
        }
        else {
            res.status(200).json(bankAccount);
        }
    }
    catch (e) {
        res.status(500).json({ hasErros: true, message: e.message })
    }
});

router.route('/bankAccount').get(async (req, res) => {
    try {
        res.status(200).json(await getBankAccount());
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }
});

router.route('/bankAccount/:id').get(async (req, res) => {
    try {
        res.status(200).json(await getBankAccountById(req.params.id));
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }
});

router.route('/bankAccount/:id').put(authorized,async (req, res) => {
    try {
        let bankAccount = await updateBankAccount(req.params.id, req.body);

        if (bankAccount.hasErrors) {
            res.status(400).json(bankAccount);
        }
        else {
            res.status(200).json(bankAccount);
        }
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }
});

router.route('/bankAccount/:id').delete(async (req, res) => {
    try {
        let bankAccount = await deleteBankAccount(req.params.id);

        if (bankAccount.hasErrors) {
            res.status(400).json(bankAccount);
        }
        else {
            res.status(200).json(bankAccount);
        }
    }
    catch (e) {
        res.status(500).json({ hasError: true, message: e.message })
    }
});

router.route('/userBankAccounts').get(authorized,async (req, res) => {
   
        try {
           console.log(req.body);
            const userBankAccounts = await BankAccount.findAll({where: {UserID: req.user.userID }});
            if(!userBankAccounts){
                res.status(400).json({message: "No bank accounts available for this user!"})
            } else{
            res.status(200).json(userBankAccounts);
            }
        }
        catch (e) {
            res.status(500).json({ hasErrors: true, message: e.message })
        }
    });

export default router;