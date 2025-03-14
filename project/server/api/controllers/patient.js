
import express from 'express';
const router = express.Router();
import PatientModel from '../db/patients.js'
import AuthMiddleware from '../middlewares/auth.js'
import PatientMiddleware from '../middlewares/patient.js'


router.put('/slots', async(req, res, next) => {
    try {
        const args = Object.assign({}, req.body, req.query, req.params)
        const allSlots = await PatientModel.getAllSlots();
        const booked = await PatientModel.getBookedSlots(args)

        allSlots.forEach((slot) => {
            slot.available = true;
            booked.forEach((bs) => {
                if (slot.id === bs.slot_id && bs.app_status ===1) slot.available = false;
            })
        })

        let data = {
            allSlots,
        }
        res.json({ code: 200, success: true, data });
    } catch (e) {
        res.json({
          code: e.code || 400,
          message: e.message || 'Something went wrong.',
          success: false
        })
    }
});

router.post('/book', AuthMiddleware.authenticate, PatientMiddleware.bookAppointment, async(req, res, next) => {
    try {
        const args = Object.assign({}, req.body, req.query, req.params)
        const data = await PatientModel.bookAppointment(args, req.user);
        res.json({ code: 200, success: true, data });
    } catch (e) {
        res.json({
          code: e.code || 400,
          message: e.message || 'Something went wrong.',
          success: false,
          fetch_slot_api: e.fetch_slot_api,
        })
    }
});

router.get('/myDoctors', AuthMiddleware.authenticate, async(req, res, next) => {
    try {
        const args = Object.assign({}, req.body, req.query, req.params)
        const data = await PatientModel.fetchMyDoctors(req.user);
        res.json({ code: 200, success: true, data });
    } catch (e) {
        res.json({
          code: e.code || 400,
          message: e.message || 'Something went wrong.',
          success: false,
          fetch_slot_api: e.fetch_slot_api,
        })
    }
});

router.get('/appointments', AuthMiddleware.authenticate, async(req, res, next) => {
    try {
        const data = await PatientModel.appointments(req.user);
        res.json({ code: 200, success: true, data });
    } catch (e) {
        res.json({
          code: e.code || 400,
          message: e.message || 'Something went wrong.',
          success: false
        })
    }
});

router.put('/appointments/cancel/:appId', AuthMiddleware.authenticate, async(req, res, next) => {
    try {
        const data = await PatientModel.cacncelAppointment(req.params.appId, req.user);
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