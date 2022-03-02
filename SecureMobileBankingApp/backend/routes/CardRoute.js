import express from 'express';

import {createCard, getCard, getCardById, updateCard, deleteCard} from '../logic/CardLogic.js';
import Card from '../entities/Card.js';
import authorized from '../middleware/verifyToken.js';


const router = express.Router();

router.route('/card').post(async (req, res) => {
    try {
        const cardAlreadyExists = await Card.findOne({ where: { CardID: req.body.CardID } });
        if (cardAlreadyExists) {
            res.status(410).json({ hasErros: true, message: "Card already exists!" });
        }

        let card = await createCard(req.body);
        if (card.hasError) {
            res.status(400).json(card);
        }
        else {
            res.status(200).json(card);
        }
    }
    catch (e) {
        res.status(500).json({ hasErros: true, message: e.message })
    }
});

router.route('/card').get(async (req, res) => {
    try {
        res.status(200).json(await getCard());
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }
});

router.route('/card/:id').get(async (req, res) => {
    try {
        res.status(200).json(await getCardById(req.params.id));
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }
});

router.route('/userCards').get(authorized,async (req, res) => {
//router.route('/userCards').get(async (req, res) => {
   
    try {
        const userID = req.get("UserID");
       // console.log(req.user);
        const userCards = await Card.findAll({where: {UserID: req.user.userID} });
       console.log(req.body);
        // const userCards = await Card.findAll({where: {UserID: userID }});
        if(!userCards){
            res.status(400).json({message: "No cards available for this user!"})
        } else{
        res.status(200).json(userCards);
        }
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }
});

router.route('/card/:id').put(async (req, res) => {
    try {
        let card = await updateCard(req.params.id, req.body);

        if (card.hasErrors) {
            res.status(400).json(card);
        }
        else {
            res.status(200).json(card);
        }
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }
});

router.route('/card/:id').delete(async (req, res) => {
    try {
        let card = await deleteCard(req.params.id);

        if (card.hasErrors) {
            res.status(400).json(card);
        }
        else {
            res.status(200).json(card);
        }
    }
    catch (e) {
        res.status(500).json({ hasError: true, message: e.message })
    }
});

export default router;