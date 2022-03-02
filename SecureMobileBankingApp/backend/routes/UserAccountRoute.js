import express from 'express';
import { createUserAccount, getUserAccount, getUserAccountById, updateUserAccount, deleteUserAccount } from '../logic/UserAccountLogic.js';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import UserAccount from '../entities/UserAccount.js';
import authorized from '../middleware/verifyToken.js';

const router = express.Router();
const JWT_KEY = process.env.JWT_KEY;
const BCRYPT_SALT=process.env.BCRYPT_SALT;

router.route('/userAccount').post(async (req, res) => {
    try {
        const userAlreadyExists = await UserAccount.findOne({ where: { UserLoginID: req.body.UserLoginID } });
        if (userAlreadyExists) {
            res.status(410).json({ hasErros: true, message: "User already exists!" });
        }
        const hashedPassword = await bcrypt.hash(req.body.UserPassword,Number(BCRYPT_SALT));

        req.body.UserPassword = hashedPassword;

        let userAccount = await createUserAccount(req.body);
        if (userAccount.hasError) {
            res.status(400).json(userAccount);
        }
        else {
            const token = JWT.sign({ userID: userAccount.UserID }, JWT_KEY);

            res.send({ token });
        }
    }
    catch (e) {
        res.status(500).json({ hasErros: true, message: e.message })
    }
});

router.route('/userAccount').get(authorized,async (req, res) => {
    try {
        const user = await UserAccount.findOne({where : {UserID : req.user.userID}});
        if(!user){
        res.status(400).json({message: "No user available!"})
        } else{
            res.status(200).json(user);
        }
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }
});

router.route('/userAccount/:id').get(async (req, res) => {
    try {
        res.status(200).json(await getUserAccountById(req.params.id));
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }
});

router.route('/userAccount/:id').put(async (req, res) => {
    try {
        let userAccount = await updateUserAccount(req.params.id, req.body);

        if (userAccount.hasErrors) {
            res.status(400).json(userAccount);
        }
        else {
            res.status(200).json(userAccount);
        }
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }
});

router.route('/userAccount/:id').delete(async (req, res) => {
    try {
        let userAccount = await deleteUserAccount(req.params.id);

        if (userAccount.hasErrors) {
            res.status(400).json(userAccount);
        }
        else {
            res.status(200).json(userAccount);
        }
    }
    catch (e) {
        res.status(500).json({ hasError: true, message: e.message })
    }
});

export default router;