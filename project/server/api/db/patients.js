
import db from './index.js'
import moment from 'moment'


const getAllSlots = async() => {
    const connection = db.createConnection();
    try {
        let query = 'SELECT * FROM slots';
        const result = await connection.query(query,[]);
        return result;
    } catch (error) {
        throw error;
    } finally {
        await connection.close();
    }
}

const bookAppointment = async(data, user) => {
    const connection = db.createConnection();
    connection.beginTransaction();
    try {

        // Logic to check id slot is already booked for that doctor on that day
        let myDateshort =  moment(data.date).format("YYYY-MM-DD");
        let query = `
            SELECT ap.app_status, ap.availability_status, ap.slot_id  
            FROM appointments as ap 
            JOIN doc_pateint_appointment_mapping as dpam ON dpam.appointment_id = ap.id 
            where  dpam.doc_id = (?) AND ap.date_of_appointment = (?) AND ap.slot_id = (?) AND ap.app_status = 1`;
        const booked = await connection.query(query,[data.doc_id, myDateshort, data.slot_id]);

        if (booked && booked.length) throw { message: 'This slot is already booked. Please select another slot', fetch_slot_api: true }


        let myDate =  moment(data.date).format("YYYY-MM-DD HH:mm:ss");

        query = 'Insert into appointments (app_status, availability_status, slot_id, date_of_appointment) values (?)';
        const appResult = await connection.query(query,[[1, 1, data.slot_id, myDate]]);

        let userInfo = await connection.query('Select id from users where email = ?', [user.email])

        query = 'Insert into doc_pateint_appointment_mapping (doc_id, patient_id, appointment_id) values (?)'
        const result = await connection.query(query,[[data.doc_id, userInfo[0].id, appResult.insertId]]);
        connection.commit();
        return result;
    } catch (error) {
        connection.rollback();
        throw error;
    } finally {
        await connection.close();
    }
}

const getBookedSlots = async(data) => {
    let myDate =  moment(data.selectedDate).format("YYYY-MM-DD");
    const connection = db.createConnection();
    try {
        let query = `
            SELECT ap.app_status, ap.availability_status, ap.slot_id  
            FROM appointments as ap 
            JOIN doc_pateint_appointment_mapping as dpam ON dpam.appointment_id = ap.id 
            where  dpam.doc_id = (?) AND ap.date_of_appointment = (?)`;
        const result = await connection.query(query,[data.doc_id, myDate]);
        return result;
    } catch (error) {
        throw error;
    } finally {
        await connection.close();
    }
}


const appointments = async(data) => {

    const connection = db.createConnection();
    try {
        let query = `Select id, user_type  from users where email = ?`;
        let result = await connection.query(query,[data.email]);

        if (result[0].user_type === 3) {
            query = `SELECT ap.id, ap.date_of_appointment, ap.app_status, ap.date_created, slots.from, slots.to, slots.meridiem, users.name as user_name 
                from doc_pateint_appointment_mapping as dpam 
                LEFT JOIN appointments as ap ON ap.id = dpam.appointment_id 
                LEFT JOIN users ON users.id = dpam.doc_id 
                LEFT JOIN slots ON slots.id = ap.slot_id 
                WHERE dpam.patient_id = ? ORDER BY ap.app_status ASC, DATE(ap.date_of_appointment) ASC`;
                
                result = await connection.query(query,[result[0].id]);
        } else if (result[0].user_type === 2) {
                query = `SELECT ap.id, ap.date_of_appointment, ap.app_status, ap.date_created, slots.from, slots.to, slots.meridiem, users.name as user_name 
                from doc_pateint_appointment_mapping as dpam 
                LEFT JOIN appointments as ap ON ap.id = dpam.appointment_id 
                LEFT JOIN users ON users.id = dpam.patient_id 
                LEFT JOIN slots ON slots.id = ap.slot_id 
                WHERE dpam.doc_id = ? ORDER BY ap.app_status ASC, DATE(ap.date_of_appointment) ASC`;

                result = await connection.query(query,[result[0].id]);
        }  else if (result[0].user_type === 1) {
            query = `SELECT ap.id, ap.date_of_appointment, ap.app_status, ap.date_created, slots.from, slots.to, slots.meridiem, patient.name as patient_name, doctor.name as doc_name  
            from doc_pateint_appointment_mapping as dpam 
            LEFT JOIN appointments as ap ON ap.id = dpam.appointment_id 
            LEFT JOIN users as patient ON patient.id = dpam.patient_id 
            LEFT JOIN users as doctor ON doctor.id = dpam.doc_id  
            LEFT JOIN slots ON slots.id = ap.slot_id 
            ORDER BY ap.app_status ASC, DATE(ap.date_of_appointment) ASC`;

            result = await connection.query(query,[]);
    }
        
        return result;
    } catch (error) {
        throw error;
    } finally {
        await connection.close();
    }
}


const cacncelAppointment = async(appId, user) => {
    const connection = db.createConnection();
    try {
        let query = 'SELECT id FROM users where email = ?';
        const userDetail = await connection.query(query,[user.email]);

        query = 'Select * from doc_pateint_appointment_mapping where appointment_id=? AND patient_id=?'
        let result = await connection.query(query,[appId, userDetail[0].id]);
        if (result && result.length) {
            query = 'Update appointments SET app_status = 3 where id=?'
            result = await connection.query(query,[appId]);
        } else throw { message: 'Invalid Appointment.' }
        return result;
    } catch (error) {
        throw error;
    } finally {
        await connection.close();
    }
}

const fetchMyDoctors = async(user) => {
    const connection = db.createConnection();
    try {
        let query = '';
        let userId = await connection.query(`Select id, user_type from users where email = '${user.email}'`);
        if (userId[0].user_type === 1) {
            query = `Select users.id, users.name, users.phone, users.city,di.education, di.experience, sp.name as speciality 
            from users 
            LEFT JOIN doc_info as di on users.id = di.user_id 
            LEFT JOIN speciality sp on sp.id = di.speciality 
            where active=1 AND is_deleted=0 AND user_type=2`;
            const details = await connection.query(query, []);
            return details;
        }
        let myAppointments = await connection.query(`Select doc_id from doc_pateint_appointment_mapping as dpam where dpam.patient_id = ${userId[0].id} GROUP BY dpam.doc_id`);
        console.log('userId',myAppointments)
        if (!myAppointments.length) throw new Error('You do not have any appointments');

        let docIds  = []
        myAppointments.forEach((doc) => { docIds.push(doc.doc_id) });

        query = `Select users.id, users.name, users.email, users.phone, users.address, users.user_type, users.city, di.education, di.experience, sp.name as speciality 
        from users 
        LEFT JOIN doc_info as di on users.id = di.user_id 
        LEFT JOIN speciality sp on sp.id = di.speciality 
        where user_type=2 AND active=1 AND is_deleted=0 AND users.id in (?)`;
        const details = await connection.query(query, [docIds]);
        return details;
    } catch (error) {
        console.log(error)
        throw error;
    } finally {
        await connection.close();
    }
};


export default {
    getAllSlots,
    bookAppointment,
    getBookedSlots,
    appointments,
    cacncelAppointment,
    fetchMyDoctors,
}