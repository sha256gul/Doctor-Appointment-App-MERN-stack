
import express from 'express';
import HomeController from  './controllers/home.js'
import UserController from './controllers/user.js'
import DoctorController from './controllers/doctor.js'
import PatientController from './controllers/patient.js'
import AuthController from './controllers/auth.js'

const api = express.Router();
api.use('/auth', AuthController);
api.use('/user', UserController);
api.use('/doctor', DoctorController);
api.use('/patient', PatientController);

export default api;



