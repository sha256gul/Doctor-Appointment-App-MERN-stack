

import mysql from "mysql";
import util from 'util';
import config from '../../Config/index.js';

//object
const db = {
    //function
    createConnection: () => {
        const connection = mysql.createConnection({
            host: config.dbHost,
            user: config.dbUser,
            password: config.dbPassword,
            database: config.dbName ,
            timezone: "utc",
        });
        return {
            query: (query, args) => {
                return util.promisify(connection.query).call(connection, query, args);
            },
            beginTransaction: () => {
                return util.promisify(connection.beginTransaction).call(connection);
            },
            rollback: () => {
                return util.promisify(connection.rollback).call(connection);
            },
            commit: () => {
                return util.promisify(connection.commit).call(connection);
            },
            close: () => {
                return util.promisify(connection.end).call(connection);
            }
        }
    }
};

export default db;