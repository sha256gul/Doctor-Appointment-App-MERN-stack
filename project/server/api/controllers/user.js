
import express from 'express';
const router = express.Router();
import UsersModel from '../db/users.js'
import AuthMiddleware from '../middlewares/auth.js';
import UserMiddleware from  '../middlewares/users.js'


router.get('/', AuthMiddleware.authenticate , UserMiddleware.getUsersList,  async(req, res, next) => { 
    try {
        let data = [];
        if (req.query.user_type === '1') {
            data = await UsersModel.fetchAllAdmins();
        } else if (req.query.user_type === '2') {
            data = await UsersModel.fetchDoctors();
        } else if (req.query.user_type === '3') {
            data = await UsersModel.fetchMyPatients();
        } else if (req.query.user_type === 'all') {
            data = UsersModel.fetchAll();
        }
        res.json({ code: 200, success: true, data: data });
    } catch (e) {
        res.json({
          code: e.code || 400,
          message: e.message || 'Something went wrong.',
          success: false
        })
    }
})

router.get('/userDetails', AuthMiddleware.authenticate , async(req, res, next) => { 
    try {
        const email = req.user.email;
        const data = await UsersModel.myAccountDetails(email);
        res.json({ code: 200, success: true, data });
    } catch (e) {
        res.json({
          code: e.code || 400,
          message: e.message || 'Something went wrong.',
          success: false
        })
    }
})

// router.put('/:id', (req, res, next) => { res.send() })



export default router;