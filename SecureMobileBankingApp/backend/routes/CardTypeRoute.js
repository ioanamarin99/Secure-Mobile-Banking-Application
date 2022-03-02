import express from 'express';

import {createCardType, getCardType, getCardTypeById, updateCardType, deleteCardType} from '../logic/CardTypeLogic.js';
import CardType from '../entities/CardType.js';

const router = express.Router();

router.route('/cardType').post(async (req, res) => {
    try {
        const cardTypeAlreadyExists = await CardType.findOne({ where: { CardTypeID: req.body.CardTypeID } });
        if (cardTypeAlreadyExists) {
            res.status(410).json({ hasErros: true, message: "Card type already exists!" });
        }

        let cardType = await createCardType(req.body);
        if (cardType.hasError) {
            res.status(400).json(cardType);
        }
        else {
            res.status(200).json(cardType);
        }
    }
    catch (e) {
        res.status(500).json({ hasErros: true, message: e.message })
    }
});

router.route('/cardType').get(async (req, res) => {
    try {
        res.status(200).json(await getCardType());
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }
});

router.route('/cardType/:id').get(async (req, res) => {
    try {
        res.status(200).json(await getCardTypeById(req.params.id));
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }
});

router.route('/cardType/:id').put(async (req, res) => {
    try {
        let cardType = await updateCardType(req.params.id, req.body);

        if (cardType.hasErrors) {
            res.status(400).json(cardType);
        }
        else {
            res.status(200).json(cardType);
        }
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }
});

router.route('/cardType/:id').delete(async (req, res) => {
    try {
        let cardType = await deleteCardType(req.params.id);

        if (cardType.hasErrors) {
            res.status(400).json(cardType);
        }
        else {
            res.status(200).json(cardType);
        }
    }
    catch (e) {
        res.status(500).json({ hasError: true, message: e.message })
    }
});

export default router;