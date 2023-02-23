//ENTRIES QUERIES

import { Entrie, EntryOptionalsFields, InsertEntrie } from "../interfaces/entry";
import { pool } from "../models/db";
import { zipWith } from "../helpers/zipWith";

export const findAllEntries = async (): Promise<Array<Entrie>> => {
    const [rows]:any = await pool.query(`SELECT 
    id,
    title,
    cover_url,
    rating,
    synopsis,
    review,
    deleted,
    created_at,
    BIN_TO_UUID(author) author_id 
    FROM anime_entries
    WHERE deleted = FALSE;`);
    return rows;
}

export const findEntryById = async (id: string):Promise<Entrie> => {
    const [rows]:any = await pool.query(
    `SELECT 
    id,
    title,
    cover_url,
    rating,
    synopsis,
    review,
    deleted,
    created_at,
    BIN_TO_UUID(author) author_id 
    FROM anime_entries
    WHERE id = ?;`, id);
    return rows[0];
}

export const findByEntryTitle = async ( title:string ):Promise<Entrie> => {
    const [rows]:any = await pool.query(`SELECT title FROM anime_entries WHERE title = ?`, title);
    return rows[0];
}

export const insertEntrie = async ( {title, cover_url, rating, synopsis, review, author}:InsertEntrie ) => {
    await pool.query(`INSERT INTO anime_entries ( title, cover_url, rating, synopsis, review, created_at, author) VALUES ( ?, ?, ?, ?, ?, CURRENT_TIME(), UUID_TO_BIN(?) )`, 
    [
        title,
        cover_url,
        rating,
        synopsis,
        review,
        author
    ]);
}

export const deleteEntryById = async (id:string) => {
    await pool.query('UPDATE anime_entries SET deleted = true WHERE id = ?', id);
}

//TODO: check title in service
export const modifyEntryFields = async ( { ...fields }:EntryOptionalsFields, id:number ) => {
    const casting = (x: any, y: any):string => `${x} = '${y}'`;
    
    await pool.query(`UPDATE anime_entries SET ${zipWith( casting, Object.keys(fields), Object.values(fields))} WHERE id = ?;`, id);
}

//Get last posts
export const getEntriesByDate = async () => {
    await pool.query('SELECT * FROM anime_entries ORDER BY created_at DESC;');
}