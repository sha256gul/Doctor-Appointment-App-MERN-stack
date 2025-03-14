
import UserModel from '../db/users.js'



const userMiddleware = {
    getUsersList: async(req, res, next) => {
        try {
            let userType = req.query.user_type;
            if (!userType) throw { message: 'user_type field is missing.' }
            if (!['1', '2', '3', 'all'].includes(userType)) throw { message: 'user_type field is invalid.' }
            if (!req.user || !req.user.email) throw { message: 'email field not found.' }
            const userDetails = await UserModel.myAccountDetails(req.user.email);
            const currentUserType = userDetails.user_type;
            if (userType==='1' && currentUserType !== 1) throw { message: 'You cannot access admin list' }
            if (userType === '3' && currentUserType === 3 ) throw { message: 'Pateint cannot fetch other patients list' }
            if (userType === 'all' && currentUserType !== 1) throw { message: 'You cannot access all users list' }

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

export default userMiddleware;