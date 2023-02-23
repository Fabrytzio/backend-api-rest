import { Request, Response } from "express";
import { findAll } from "../queries/global";
import { findUserById } from "../queries/users";
import { pool } from "../models/db";
import { encrypt } from "../utils/encrypt.handle";
import { handleHttp } from "../utils/errors.handle";

export const getUsers = async ( _req:Request, res:Response ) => {
    try {
        const users = await findAll('users');
        return res.json(users);
    } catch (error) {
        return handleHttp(res, 'ERROR_GET_USERS', error);
    }
}

export const getUser = async ( req:Request, res:Response ) => {
    try {
        const { id } = req.params;
        const user = await findUserById(id);
        
        //Handle if there is not user
        if ( !user ) return res.status(404).json(`No se pudo encontrar al usuario: '${id}'`);
        
        res.json( user );
    } catch (error) {
        return handleHttp( res, 'ERROR_GET_USER', error )
    }
}

//TODO: Mover esta funcion a auth register
export const addUser = async ( req:Request, res:Response ) => {
    try {
        const { 
            name, 
            username, 
            email, 
            password, 
            repeat_password, 
        } = req.body;

        //Check passwords
       if ( password !== repeat_password ) return res.status(400).json({msg: `Las constraseñas deben de ser iguales`});

        //Check if there are an user with an email already registerd
        const [ registeredUser ]:any = await pool.query('SELECT * FROM users WHERE email = ?', email);
        if ( registeredUser[0] ) return res.status(400).json({msg:`El email ya se encuentra registrado`});

        //Encrypt the password
        const passHash = await encrypt( password );

        //Insert into the database
        // await pool.query(`INSERT INTO users ( id, name, username, email, password, google_auth, deleted, id_Rol) VALUES ( UNHEX(REPLACE(UUID(), '-', '')), ?, ?, ?, ?, ?, ?, ?)`, 
        await pool.query(`INSERT INTO users ( id, name, username, email, password ) VALUES (UUID_TO_BIN( UUID() ), ?, ?, ?, ?);`, 
        [
            name,
            username,
            email,
            passHash
        ]);

        return res.status(201).json({msg: `El usuario con email: ${email} ha sido agregado sastisfactoriamente`});
    } catch (error) {
        return handleHttp(res, 'ERROR_ADD_USER', error );
    }
}

export const putUser = async ( req:Request, res:Response ) => {
    try {
        res.send(req.body);
    } catch (error) {
        handleHttp(res, 'ERROR_UPDATE_USER', error);
    }
}

export const deleteUser = async ( req:Request, res:Response ) => {
    try {
        const { id } = req.params;
        await pool.query('UPDATE users SET deleted = true WHERE username = ?', id);
        res.json({msg: `El usuario ${id} ha sido desactivado`});
    } catch (error) {
        handleHttp(res, 'DELETE_USER_ERROR', error);
    }
}
