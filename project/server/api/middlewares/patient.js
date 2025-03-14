
import UserModel from '../db/users.js'



const patientMiddleware = {
    bookAppointment: async(req, res, next) => {
        try {
            
            const args = Object.assign({}, req.body, req.query, req.params);
            if (!args.slot_id || !args.date || !args.doc_id) throw { code: 400, message: 'Invalid/Missing fields.' }

            next();
        } catch (err) {
            res.json({
                code: err.code || 400,
                message: err.message || 'Something went wrong.',
                success: false
              })  
        }
    }
}

export default patientMiddleware;