import express from 'express';
import dotenv from 'dotenv';
import authorized from '../middleware/verifyToken.js'
import UserAccount from '../entities/UserAccount.js';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import ExpressBrute from 'express-brute';


var store = new ExpressBrute.MemoryStore();

var failCallback = function (req, res, next, nextValidRequestDate){
         res.status(413).json({hasErrors : true, message : "You've made three failed login attempts! Try again in 10 minutes!"})
}

var bruteForce = new ExpressBrute(store, {
    freeRetries : 2,
    minWait : 10*60*1000,
    failCallback : failCallback,
    lifetime: 60
});


dotenv.config();

const router=express.Router();
const JWT_KEY=process.env.JWT_KEY;


router.route('/login').post(bruteForce.prevent, async(req, res)=>{

    try{
        const user = await UserAccount.findOne({ where: { UserLoginID: req.body.UserLoginID } });
        if (!user) {
            res.status(410).json({ hasErros: true, message: "No such user found!" });
        }

        const validPassword = await bcrypt.compare(req.body.UserPassword, user.UserPassword);
        if(!validPassword){
            res.status(420).json({hasErros: true, message: "Invalid password!"});
        }
         const token=JWT.sign({userID: user.UserID}, JWT_KEY);
        res.header("auth-token", token).send(token);
      
    }catch(e){
        res.status(500).json({hasErrors: true, message: e.message});
    }
});

router.route('/getLoggedUser', authorized).get(async(req, res) =>{
    try{
        const User = await UserAccount.findOne({where: {UserLoginID: req.user.id}});
        if(!User){
            res.status(410).json({ hasErros: true, message: "No such user found" });  
        }
        res.json(User);
    }catch(e){
        res.status(500).json({hasErrors: true, message: e.message});
    }
})
export default router;