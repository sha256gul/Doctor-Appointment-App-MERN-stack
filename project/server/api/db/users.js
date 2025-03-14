
import db from './index.js';
import md5 from 'md5';



const registerUser = async(data) => {
    const connection = db.createConnection();
    connection.beginTransaction();
    try {
        let { name, email, address, phone, user_type, password, city, education } = data;
        let query = '';
        query = 'Select id from users where email=?'
        const userExists = await connection.query(query, [data.email]);
        if (userExists && userExists.length) throw { message: 'User already exists, please login' }
        query = 'INSERT INTO users (name, email, address, phone, user_type, password, city, active, is_deleted) VALUES (?)';
        const result = await connection.query(query, [[name, email, address, phone, user_type, md5(password).trim(), city , 1, 0]]);
        if (data.user_type === 2) {
          let args = [data.education, data.experience, data.speciality, result.insertId ];
          query = 'INSERT INTO doc_info (education, experience, speciality, user_id) VALUES (?)';
          await connection.query(query, [args]);
        }
        connection.commit();
        return result;
    } catch (error) {
        connection.rollback();
        throw error;
    } finally {
        await connection.close();
    }
};

const login = async(data) => {
    const connection = db.createConnection();
    try {
        let { email, password } = data;
        let query = '';
        query = 'Select id, password from users where email=?'
        const userExists = await connection.query(query, [email]);
        if (!userExists ||  !userExists.length) throw { message: 'User does not exists' }
        const hashedPassword = md5(password);
        if (userExists[0].password !== hashedPassword) throw { message: 'Wrong Password' }
        return true;
    } catch (error) {
        console.log('err', error)
        throw error;
    } finally {
        await connection.close();
    }
};


const myAccountDetails = async(email) => {
    const connection = db.createConnection();
    try {
        let query = '';
        query = 'Select id, name, email, phone, address, user_type, city from users where email=? AND is_deleted=0'
        const details = await connection.query(query, [email]);
        if (details[0].active === 0) throw { message: 'Your account is not active. Please contact Admin.' }
        if (!details ||  !details.length) throw { message: 'User does not exists' }
        if(details[0].user_type === 2) {
            query = 'Select education, experience, speciality from doc_info where user_id=?';
            const docDetails = await connection.query(query, [details[0].id]);
            if (!docDetails || !docDetails.length)  throw { message: 'Invalid user details' }
            details[0].education = docDetails[0].education;
            details[0].experience = docDetails[0].experience;
            details[0].speciality = docDetails[0].speciality;
        }
        return details[0];
    } catch (error) {
        throw error;
    } finally {
        await connection.close();
    }
}

const fetchMyPatients = async(data) => {
    const connection = db.createConnection();
    try {
        let query = '';
        query = `Select users.id, users.name, users.email, users.phone, users.address, users.user_type, users.city  
        from users 
        where user_type=3 AND active=1 AND is_deleted=0`;
        const details = await connection.query(query, []);
        return details;
    } catch (error) {
        throw error;
    } finally {
        await connection.close();
    }
};

const fetchAllPatients = async(data) => {
    const connection = db.createConnection();
    try {
        let query = '';
        query = `Select users.id, users.name, users.email, users.phone, users.address, users.user_type, users.city  
        from users 
        where user_type=3 AND active=1 AND is_deleted=0`;
        const details = await connection.query(query, []);
        return details;
    } catch (error) {
        throw error;
    } finally {
        await connection.close();
    }
};

const fetchDoctors = async() => {
    const connection = db.createConnection();
    try {
        let query = '';
        query = `Select users.id, users.name, users.email, users.phone, users.address, users.user_type, users.city, di.education, di.experience, di.speciality 
        from users 
        LEFT JOIN doc_info as di on users.id = di.user_id 
        where user_type=2 AND active=1 AND is_deleted=0`;
        const details = await connection.query(query, []);
        return details;
    } catch (error) {
        throw error;
    } finally {
        await connection.close();
    }
};

const fetchAll = async() => {
    const connection = db.createConnection();
    try {
        const patients = await fetchAllPatients();
        const doctors = await fetchDoctors();
        return {
            patients: patients,
            doctors: doctors
        };
    } catch (error) {
        throw error;
    } finally {
        await connection.close();
    }
};

const fetchAllAdmins = async(data) => {
    const connection = db.createConnection();
    try {
        return true;
    } catch (error) {
        throw error;
    } finally {
        await connection.close();
    }
};



export default {
    registerUser: registerUser,
    login: login,
    myAccountDetails,
    fetchDoctors,
    fetchMyPatients,
    fetchAll,
    fetchAllAdmins
}

