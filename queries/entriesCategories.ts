//ENTRIES_CATEGORIES QUERIES

import { pool } from "../models/db";
import { generateValues } from "../helpers/generateValues";
import { getLastInsertId } from "./global";

// export const insertTagsIntoEntries = async (tags:number[]) => {
//     const {id} = await getLastInsertId('anime_entries');
//     //El await no se puede utilizar dentro de bucles
//     //Al querer realizar una operacion asincrona en un bucle tengo que crear una promesa por cada elemento del array
//     tags.forEach(tag => {
//         new Promise((res, _rej) => {
//             res( pool.query(`INSERT INTO entry_categories(entry_id, tag_id) VALUES(${id}, ${tag});`));
//         //    res( console.log(id, tag) );
//         });
//     });
// }

export const insertTagsIntoEntry = async ( tags:number[] ) => {
    const {id} = await getLastInsertId('anime_entries');
    await pool.query(`INSERT INTO entry_categories(entry_id, tag_id) VALUES ${generateValues(id, tags)};`);
}

export const getTitlesByTag = async ( tag:number ) => {
    const [rows]:any = await pool.query(`SELECT e.* FROM anime_entries e, categories c, entry_categories ec WHERE e.id = ec.entry_id AND c.id = ec.tag_id AND c.id = ?;`,
    tag );
    return rows;
}
