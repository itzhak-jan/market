import { ConnectionPool, config as sqlConfig, IResult, Request, TYPES } from "mssql";

const config: sqlConfig = {
    user: "root",
    password: "1234",
    server: "localhost",
    database: "market",
    options: {
        encrypt: false,
        enableArithAbort: true,
        trustServerCertificate: true
    }
};

const pool = new ConnectionPool(config);

pool.connect(err => {
    if (err) {
        console.log("Failed to create connection: " + err);
        return;
    }
    console.log("We're connected to SQL Server");
});

export function execute(sqlQuery: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
        pool.request().query(sqlQuery, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve((result as IResult<any>).recordset);
        });
    });
}

interface SqlParameter {
    name: string;
    value: any;
    type?: any;
}

export function executeWithParameters(sqlQuery: string, parameters: SqlParameter[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
        const request: Request = pool.request();
        parameters.forEach(param => {
            // request.input(param.name, param.type || TYPES.NVarChar, param.value);
            request.input(param.name, param.value);
        });
        request.query(sqlQuery, (err, result) => {
            if (err) {
                console.log("Failed interacting with DB, calling reject");
                reject(err);
                return;
            }
            resolve((result as IResult<any>).recordset);
        });
    });
}
