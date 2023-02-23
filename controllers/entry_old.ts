import { Request, Response } from "express";
import { deleteEntryById, findById, insertTagsIntoEntries } from "../queries";
import { Entrie } from "../interfaces/entry";
import { pool } from "../models/db";
import { createNewEntrie } from "../services/entry";
import { handleHttp } from "../utils/errors.handle";

export const getAnimes = async ( _:Request, res: Response ) => {
    try {
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
        BIN_TO_UUID(anime_entries.author) author_id 
        FROM anime_entries
        WHERE deleted = FALSE;`);
        res.json(rows);
    } catch (error) {
        handleHttp(res, 'ERROR_GET_ANIME_ENTRIES', error);
    }
}

export const getAnime = async ( req:Request, res: Response ) => {
    try {
        const { id } = req.params;
        const [rows]:any = await pool.query(
        `SELECT 
        anime_entries.id,
        anime_entries.title,
        anime_entries.cover_url,
        anime_entries.rating,
        anime_entries.synopsis,
        anime_entries.review,
        anime_entries.deleted,
        anime_entries.created_at,
        BIN_TO_UUID(anime_entries.author) author_id 
        FROM anime_entries
        WHERE id = ?;`, 
        id );
        const entrie: Entrie = rows[0]; 
        if ( !entrie ) res.status(404).json(`No se pudo encontrar el anime con id: ${id}`);
        res.json( entrie );
    } catch (error) {
        handleHttp(res, 'ERROR_GET_ANIME_ENTRIES', error);
    }
}

export const addAnime = async ( req: Request, res: Response ) => {
    try {
        const { 
            title,
            tags,
        } = req.body;

        await createNewEntrie (req.body, tags );
        
        // const {name} = await getAuthorName(author);
        
        // await pool.query(`INSERT INTO anime_entries ( title, cover_url, rating, synopsis, review, created_at, author) VALUES ( ?, ?, ?, ?, ?, CURRENT_TIME(), UUID_TO_BIN(?) )`, 
        // [
        //     title,
        //     cover_url,
        //     rating,
        //     synopsis,
        //     review,
        //     author
        // ]);

        //{ DATA: 
        //add categories into last entrie
        //Si no se le coloca el await a una funcion asyncrona, termina devolviendo una promesa
        //Estoy recibiendo un objeto de la base de datos asi que lo tengo que destructurar
        //Como no, la destructuracion debe ser de un atributo que existe, no puede ser renombrado sobre el mismo
        // const {id} = await getLastEntrie();
        // await pool.query(`INSERT INTO anime_categories(anime, tag) VALUES(${id}, ${tags[0]})`);
        //}

        await insertTagsIntoEntries(tags);

        res.status(201).json({msg:`El anime '${title}' ha sido agregado`});
    } catch (error) {
        handleHttp(res, 'ERROR_ADD_ANIME_ENTRIES', error);
    }
}

export const editAnime = async ( req:Request, res: Response ) => {
    try {
        const { id } = req.body;
        await pool.query('SELECT ');
        res.send(id);
    } catch (error) {
        handleHttp(res, 'ERROR_EDIT_ANIME_ENTRIES', error);
    }
}

export const deleteAnime = async ( req:Request, res: Response ) => {
    try {
        const { id } = req.params;

        const entry: Entrie = await findById('anime_entries', id);

        if ( !entry ) res.status(404).json({msg: `No se pudo encontrar el anime con id: ${id}`});
        if ( entry.deleted ) res.status(400).json({msg: "El anime ya esta borrado"});

        await deleteEntryById( id );
        res.json({msg: `El anime ${ entry.title } ha sido borrado`});

    } catch (error) {
        handleHttp(res, 'ERROR_DELETE_ANIME_ENTRIES', error);
    }
}