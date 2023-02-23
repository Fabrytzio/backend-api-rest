import { Request, Response } from "express";
import { deleteEntryById, findAllEntries, findEntryById, modifyEntryFields } from "../queries/entries";

import { EntryOptionalsFields } from "../interfaces/entry";
import { createNewEntrie, findEntry } from "../services/entry";
import { handleHttp } from "../utils/errors.handle";

export const getAnimes = async ( _:Request, res: Response ) => {
    try {
        const entries = await findAllEntries();
        return res.json(entries);
    } catch (error) {
        return handleHttp(res, 'ERROR_GET_ANIME_ENTRIES', error);
    }
}

export const getAnime = async ( req:Request, res: Response ) => {
    try {
        const { id } = req.params;
        const entry = await findEntry(id);
        
        console.log(entry);

        if ( entry === null ) return res.status(404).json({msg: `No se pudo encontrar la entrada con id: '${id}'`});
        
        return res.json( entry );
    } catch (error) {
        return handleHttp(res, 'ERROR_GET_ANIME_ENTRY', error);
    }
}

export const addAnime = async ( req: Request, res: Response ) => {
    try {
        const { title, tags } = req.body;
        const newEntry = await createNewEntrie(req.body, tags);

        if ( newEntry === "ENTRY_TITLE_ALREADY_EXIST" ) return res.status(400).json({msg:"El titulo ya esta ingresado"});
        if ( newEntry === "ENTRY_INVALID_AUTHOR_ID" ) return res.status(500).json({msg:"Ha ocurrido un error con el usuario"});
        if ( newEntry === "ENTRY_CREATED" ) return res.status(201).json({msg:`El anime '${title}' ha sido agregado`});

    } catch (error) {
       return handleHttp(res, 'ERROR_ADD_ANIME_ENTRY', error);
    }
}

export const editAnime = async ( req:Request, res: Response ) => {
    try {
        const { ...payload }: EntryOptionalsFields = req.body;
        modifyEntryFields( payload, 10);
        return res.send('test');
    } catch (error) {
        return handleHttp(res, 'ERROR_EDIT_ANIME_ENTRY', error);
    }
}

export const deleteAnime = async ( req:Request, res: Response ) => {
    try {
        const { id } = req.params;
        const entry = await findEntryById( id );

        if ( !entry ) res.status(404).json({msg: `No se pudo encontrar el anime con id: ${id}`});
        if ( entry.deleted ) res.status(400).json({msg: "El anime ya esta borrado"});

        await deleteEntryById( id );
        return res.json({msg: `El anime ${ entry.title } ha sido borrado`});

    } catch (error) {
        return handleHttp(res, 'ERROR_DELETE_ANIME_ENTRY', error);
    }
}