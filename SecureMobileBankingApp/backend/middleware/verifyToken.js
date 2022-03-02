import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();
let app = express();
app.use(cors());

function verify(req, res, next){

    const token = req.get("auth-token");
    console.log("AUTH TOKEN" + token);
    if(!token){
        res.status(421).json({hasErrors:true, message: "Access denied!"});
    }

    try{
        const authorized =  JWT.verify(token, process.env.JWT_KEY);
    
        req.user=authorized;
        next();
    }catch(e){
        console.log("TOKEN INVALID" + String(token))
        res.status(422).json({hasErrors:true, message: "Invalid token!"});
        }
};

export default verify;
