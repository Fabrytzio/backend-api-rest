import { Entrie } from "../interfaces/entry";
import { pool } from "../models/db";

export const getLastInsertId = async (table: string):Promise<Entrie> => {
    const [rows]:any = await pool.query(`SELECT id FROM ${table} WHERE id IN ( SELECT MAX(id) FROM ${table} );`);
    return rows[0];
}

export async function findAll ( table: string ) {
    const [rows] = await pool.query(`SELECT * FROM ${table} ORDER BY id ASC;`);
    return rows;
}

export const findById = async (table: string, id: String) => {
    const [rows]:any = await pool.query(`SELECT * FROM ${table} WHERE id = ?;`, id);
    return rows[0];
}