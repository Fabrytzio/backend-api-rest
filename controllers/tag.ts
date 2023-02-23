import { Request, Response } from "express";
import { findAll, findById } from "../queries/global";
import { RequestExt } from "../interfaces/request";
import { pool } from "../models/db";
import { handleHttp } from "../utils/errors.handle";

export const getTags = async ( _:RequestExt, res: Response ) => {
    try {
        return res.json( await findAll('categories') );
    } catch (error) {
        return handleHttp(res, 'ERROR_GET_TAGS', error);
    }
}

export const getTag = async ( req:Request, res: Response ) => {
    try {
        const { id } = req.params;
        const rows = await findById('categories', id);
        if (!rows ) return res.status(404).json({msg: `No existe la categoria con id '${id}'`});
        return res.json( rows );
    } catch (error) {
        return handleHttp(res, 'ERROR_GET_TAG', error);
    }
}

export const addTag = async ( req: Request, res: Response ) => {
    try {
        const {tag} = req.body;
        await pool.query('INSERT INTO categories ( tag ) VALUES ( ? )', tag );
        return res.json({msg: `La categoria con nombre '${tag}' ha sido agregada`});
    } catch (error) {
        return handleHttp(res, 'ERROR_ADD_TAG', error);
    }
}

//Todo: Capitalize tags - Verificar que existe
export const editTag = async (req:Request, res: Response) => {
    try {
        const { id } = req.params;
        const { payload } = req.body;
        await pool.query(`UPDATE categories SET tag = '${payload}' WHERE id = ?`, id);
        return res.json({msg: `El tag ${id} ha sido actualizado`});
    } catch (error) {
        return handleHttp(res, 'ERROR_EDIT_TAG', error);
    }
}

export const deleteTag = async ( _req:Request, res: Response) => {
    try {
        return res.send('Delete Tag');
    } catch (error) {
        return handleHttp(res, 'ERROR_DELETE_TAG', error);
    }
}
