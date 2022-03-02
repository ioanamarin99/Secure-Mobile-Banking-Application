import express from 'express';

import {createAccountType, getAccountType, getAccountTypeById, updateAccountType, deleteAccountType} from '../logic/AccountTypeLogic.js';
import AccountType from '../entities/AccountType.js';

const router = express.Router();

router.route('/accountType').post(async (req, res) => {
    try {
        const accountTypeAlreadyExists = await AccountType.findOne({ where: { AccountTypeID: req.body.AccountTypeID } });
        if (accountTypeAlreadyExists) {
            res.status(410).json({ hasErros: true, message: "Account type already exists!" });
        }

        let accountType = await createAccountType(req.body);
        if (accountType.hasError) {
            res.status(400).json(accountType);
        }
        else {
            res.status(200).json(accountType);
        }
    }
    catch (e) {
        res.status(500).json({ hasErros: true, message: e.message })
    }
});

router.route('/accountType').get(async (req, res) => {
    try {
        res.status(200).json(await getAccountType());
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }
});

router.route('/accountType/:id').get(async (req, res) => {
    try {
        res.status(200).json(await getAccountTypeById(req.params.id));
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }
});

router.route('/accountType/:id').put(async (req, res) => {
    try {
        let accountType = await updateAccountType(req.params.id, req.body);

        if (accountType.hasErrors) {
            res.status(400).json(accountType);
        }
        else {
            res.status(200).json(accountType);
        }
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }
});

router.route('/accountType/:id').delete(async (req, res) => {
    try {
        let accountType = await deleteAccountType(req.params.id);

        if (accountType.hasErrors) {
            res.status(400).json(accountType);
        }
        else {
            res.status(200).json(accountType);
        }
    }
    catch (e) {
        res.status(500).json({ hasError: true, message: e.message })
    }
});

export default router;