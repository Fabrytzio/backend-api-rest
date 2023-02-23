import { NextFunction, Response } from "express";
import { RequestExt } from "../interfaces/request";


export const checkRole = (req: RequestExt, res: Response, next: NextFunction) => {
    try {
        //verify that the user is logged in
        if ( !req.authUser ) return res.status(500).json({msg: "Se debe estar logeado para continuar"});

        //check that the user has user permissions
        if ( req.authUser?.id_rol !== 1 ) return res.status(403).json({msg: "Este usuario no tiene permisos de administrador"});         
        
        return next();
    } catch (error) {
        return res.json({ msg:`${error}` });
    }
}