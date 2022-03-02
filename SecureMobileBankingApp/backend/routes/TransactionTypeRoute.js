import express from 'express';

import {createTransactionType, getTransactionType, getTransactionTypeById, updateTransactionType, deleteTransactionType} from '../logic/TransactionTypeLogic.js';
import TransactionType from '../entities/TransactionType.js';

const router = express.Router();

router.route('/transactionType').post(async (req, res) => {
    try {
        const transactionTypeAlreadyExists = await TransactionType.findOne({ where: { TransactionTypeID: req.body.TransactionTypeID } });
        if (transactionTypeAlreadyExists) {
            res.status(410).json({ hasErros: true, message: "Transaction type already exists!" });
        }

        let transactionType = await createTransactionType(req.body);
        if (transactionType.hasError) {
            res.status(400).json(transactionType);
        }
        else {
            res.status(200).json(transactionType);
        }
    }
    catch (e) {
        res.status(500).json({ hasErros: true, message: e.message })
    }
});

router.route('/transactionType').get(async (req, res) => {
    try {
        res.status(200).json(await getTransactionType());
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }
});

router.route('/transactionType/:id').get(async (req, res) => {
    try {
        res.status(200).json(await getTransactionTypeById(req.params.id));
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }
});

router.route('/transactionType/:id').put(async (req, res) => {
    try {
        let transactionType = await updateTransactionType(req.params.id, req.body);

        if (transactionType.hasErrors) {
            res.status(400).json(transactionType);
        }
        else {
            res.status(200).json(transactionType);
        }
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }
});

router.route('/transactionType/:id').delete(async (req, res) => {
    try {
        let transactionType = await deleteTransactionType(req.params.id);

        if (transactionType.hasErrors) {
            res.status(400).json(transactionType);
        }
        else {
            res.status(200).json(transactionType);
        }
    }
    catch (e) {
        res.status(500).json({ hasError: true, message: e.message })
    }
});

export default router;