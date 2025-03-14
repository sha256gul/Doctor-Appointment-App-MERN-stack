
import db from './index.js'


const getSpeciality = async() => {
    const connection = db.createConnection();
    try {
        let query = 'SELECT *FROM speciality';
        const result = await connection.query(query,[]);
        return result;
    } catch (error) {
        throw error;
    } finally {
        await connection.close();
    }
}


const fetchMyPatients = async(user) => {
    const connection = db.createConnection();
    try {
        let query = '';
        let userId = await connection.query(`Select id,user_type from users where email = '${user.email}'`);
        if (userId[0].user_type === 1) {
            query = `Select users.id, users.name, users.phone, users.city 
            from users 
            where active=1 AND is_deleted=0 AND user_type=3`;
            const details = await connection.query(query, []);
            return details;
        }
        let myAppointments = await connection.query(`Select patient_id from doc_pateint_appointment_mapping as dpam where dpam.doc_id = ${userId[0].id} GROUP BY dpam.patient_id`);
        if (!myAppointments.length) throw new Error('You do not have any appointments');

        let pIds  = []
        myAppointments.forEach((p) => { pIds.push(p.patient_id) });

        query = `Select users.id, users.name, users.phone, users.city 
        from users 
        where active=1 AND is_deleted=0 AND users.id in (?)`;
        const details = await connection.query(query, [pIds]);
        return details;
    } catch (error) {
        console.log(error)
        throw error;
    } finally {
        await connection.close();
    }
};


export default {
    getSpeciality,
    fetchMyPatients
}