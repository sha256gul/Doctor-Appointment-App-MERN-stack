import utils from "../../utility/index.js";
import jwt from 'jsonwebtoken';
import config from "../../Config/index.js";


const authMiddleware = {
    register: (req, res, next) => {
        try {
            const args = Object.assign({}, req.body, req.query, req.params);
            if (args.user_type === 1) {
                throw { message: 'User type Admin cannot be created.' }
            }
            const fields = ['name','email', 'address', 'phone', 'user_type', 'password', 'city'];
            const fieldsForDoc = [...fields, 'education', 'experience', 'speciality'];
            for (let arg in args) {
                if (args.user_type === 2) {
                    if (!fieldsForDoc.includes(arg)) throw { message: arg + ' field is not required' };
                } else  {
                    if (!fields.includes(arg)) throw { message: arg + ' field is not required' };
                }
                
            }
            fields.forEach((val, index) => {
                if (!(val in args)) throw { message: val + ' field is missing' };
            });
            if (![1,2,3].includes(args.user_type)) {
                throw { message: 'Invalid user type id' };
            }
            if (!utils.email_regex.test(args.email)) throw { message: 'Invalid email' };
            // Registration validaion for a doctor
            if (args.user_type === 2) {
                if (!args.education) throw { message: 'education field missing' }
                if (!args.experience) throw { message: 'experience field missing' }
                if (!args.speciality) throw { message: 'speciality field missing' }
            }
            next();
        } catch (err) {
            res.json({
                code: err.code || 400,
                message: err.message || 'Something went wrong.',
                success: false
              })
        }
    },
    login: (req, res, next) => {
        try {
            const args = Object.assign({}, req.body, req.query, req.params);
            if (!args.email) throw { message: 'Username field is missing.' }
            if (!args.password) throw { message: 'Password field is missing.' }
            next();
        } catch (err) {
            res.json({
                code: err.code || 400,
                message: err.message || 'Something went wrong.',
                success: false
              })  
        }

    },
    authenticate: (req, res, next) => {
        try {
            const token = req.headers.authorization;
            jwt.verify(token, config.jwtSecret, (err, data) => {
                if (err && err.message === 'jwt expired') throw { code: 401, message: 'Invalid Credentials' }
                if (err) throw { message: 'Error while authenticating user' };
                const tokenDetails = jwt.decode(token);
                req.user = { email: tokenDetails.email };
                next();
            });

        } catch (err) {
            res.json({
                code: err.code || 400,
                message: err.message || 'Something went wrong.',
                success: false
              })  
        }
    }
};

export default authMiddleware;