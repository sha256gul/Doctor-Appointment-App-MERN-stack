
import express from "express"; 
import AuthMiddleware from "../middlewares/auth.js";
import UsersModel from '../db/users.js'
import jwt from 'jsonwebtoken';
import config from "../../Config/index.js";


const router  = express.Router();


router.post('/register', AuthMiddleware.register , async(req, res, next) => {
    try {
        const args = Object.assign({}, req.body, req.query, req.params);
        const data = await UsersModel.registerUser(args);
        res.json({ code: 200, success: true, data });
    } catch (e) {
        res.json({
          code: e.code || 400,
          message: e.message || 'Something went wrong.',
          success: false
        })
    }
});

router.post('/login', AuthMiddleware.login, async(req, res, next) => {
    try {
        const args = Object.assign({}, req.body, req.query, req.params);
        const data = await UsersModel.login(args);
        if (data === true) {
            let token = jwt.sign({ email: args.email }, config.jwtSecret, { expiresIn: '1h' });
            res.json({ code: 200, success: true, data: { token } });
        } else throw { message: 'Something went wrong.' }
    } catch (e) {
        res.json({
          code: e.code || 400,
          message: e.message || 'Something went wrong.',
          success: false
        })
    }
});


export default router;
