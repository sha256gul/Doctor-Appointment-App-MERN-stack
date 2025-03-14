
import dotenv from 'dotenv';
dotenv.config();

let config = {
    dbHost: '',
    dbUser: '',
    dbPassword: '',
    dbName: '',
    port: '' || 3008
};
if (process.env.NODE_ENV !== 'production') {
    config = {
        dbHost: process.env.DB_HOST || 'localhost',
        dbUser: process.env.DB_USER || 'root',
        dbPassword: process.env.DB_PASSWORD || 'root',
        dbName: process.env.DATABASE || 'doc_appoint',
        port: process.env.PORT || 3008,
        jwtSecret: process.env.JWT_SECRET || '7asd8da78sdadvasjd87'
    };
}





export default config;