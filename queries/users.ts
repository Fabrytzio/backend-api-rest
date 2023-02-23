import { User } from "../interfaces/user";
import { pool } from "../models/db";


export const createNewUser = async (name: string, username:string, email:string, passHash: string):Promise<void> => {
    await pool.query(`INSERT INTO users ( id, name, username, email, password ) VALUES (UUID_TO_BIN( UUID() ), ?, ?, ?, ?);`, 
    [
        name,
        username,
        email,
        passHash
    ]);
}

export const findUserById = async (id:string):Promise<User> => {
    const [rows]:any = await pool.query('SELECT BIN_TO_UUID( id ) id , username, email FROM users WHERE BIN_TO_UUID( id ) = ?', id );
    return rows[0];
}

export const findByEmail = async ( email:string ):Promise<User> => {
    const [rows]:any = await pool.query(`SELECT * FROM users WHERE email = ?;`, email);
    return rows[0];
}

export const getAuthorName = async ( author_id:string ) => {
    const [rows]:any = await pool.query(`SELECT name FROM users WHERE id IN ( SELECT UUID_TO_BIN('${author_id}') author FROM anime_entries );`);
    return rows[0];
}

//returns a boolean indicating whether the user exists or not
export const checkUserExist = async ( param: string, value: string ):Promise<Boolean> => {
    if (param === "id") {
        const [rows]:any = await pool.query(`SELECT * FROM users WHERE ${param} = UUID_TO_BIN(?)`, value);
        const checkIs: User = rows[0];
        return checkIs ? true : false;
    }
    const [rows]:any = await pool.query(`SELECT * FROM users WHERE ${param} = ?`, value);
    const checkIs: User = rows[0];
    return checkIs ? true : false;
}