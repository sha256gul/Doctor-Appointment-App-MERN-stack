
import express from 'express';
const router = express.Router();
import DocModel from '../db/doctor.js'
import AuthMiddleware from '../middlewares/auth.js'


router.put('/deactivate', (req, res, next) => { res.send() });
router.get('/speciality', async(req, res, next) => {
    try {
        const data = await DocModel.getSpeciality();
        res.json({ code: 200, success: true, data });
    } catch (e) {
        res.json({
          code: e.code || 400,
          message: e.message || 'Something went wrong.',
          success: false
        })
    }
});

router.get('/myPatients',AuthMiddleware.authenticate, async(req, res, next) => {
    try {
        const data = await DocModel.fetchMyPatients(req.user);
        res.json({ code: 200, success: true, data });
    } catch (e) {
        res.json({
          code: e.code || 400,
          message: e.message || 'Something went wrong.',
          success: false
        })
    }
});



export default router;