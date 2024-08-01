import mysql, { QueryError } from 'mysql2';
import { Pool } from 'mysql2/promise';

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "Supermarket"
});

async function execute(sql: string): Promise<any> {
    const [result]: any = await pool.query(sql);
    return result;
}

async function executeWithParameters(sql: string, parameters: any[]): Promise<any> {
    const [result]: any = await pool.execute(sql, parameters);
    return result;
}

export default {
    execute,
    executeWithParameters
};
