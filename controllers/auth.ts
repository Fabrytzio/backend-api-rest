import { Request, Response } from "express";
import { loginUser, registerNewUser } from "../services/auth";
import { handleHttp } from "../utils/errors.handle";

//Los codigo de status corresponden al controlador

// Cannot set headers after they are sent to the client
// That particular error occurs whenever you try to send more than one response 
// to the same request and is usually caused by improper asynchronous code.

export const registerCtrl = async ( req: Request, res: Response ) => {
    try {
        const responseUser = await registerNewUser ( req.body );
        
        switch ( responseUser ) {
            case 'USER_PASSWORDS_NOT_MATCH':
                    return res.status(400).json({msg: 'Las contraseñas deben de ser iguales'});
            case 'USER_ALREDY_REGISTERED':
                    return res.status(400).json({msg: 'Los datos ya se encuentran registrados'});
            case 'USER_CREATED':
                    return res.status(201).json({msg: 'Usuario registrado'});
            default:
                return;
        }
    } catch (error) {
       return handleHttp(res, 'ERROR_CREATE_USER', error);
    }
}

export const loginCtrl = async ( req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const responseUser = await loginUser( { email, password } );
    
        //Type error -> Login Data cannot be used as key
        // const LOGIN_CHECK = {
        //     'USER_NOT_FOUND': res.status(404).json({msg: 'User not found'}),
        //     'USER_PASSWORD_INVALID': res.status(400).json({msg: 'Datos invalidos'}),
        //     'USER_DELETED': res.status(404).json({msg: 'User not found'}),
        // }
        // LOGIN_CHECK[responseUser];
    
        // HTTP_ERROR
        // switch ( responseUser ) {
        //     case 'USER_NOT_FOUND':
        //             res.status(404).json({msg: 'Datos invalidos'});
        //         break;
        //     case 'USER_DELETED':
        //             res.status(404).json({msg: 'Datos invalidos'});
        //         break;
        //     case 'USER_PASSWORD_INVALID':
        //             res.status(400).json({msg: 'Datos invalidos'});
        //         break;
        //     default:
        //         break;
        // }
    
        // Validations
        if ( responseUser === 'USER_NOT_FOUND' ) return res.status(404).json({msg: 'Datos invalidos'});
        if ( responseUser === 'USER_PASSWORD_INVALID' || responseUser === 'USER_DELETED'  ) return res.status(400).json({msg: 'Datos invalidos'});  
    
        return res.json(responseUser);
        
    } catch (error) {
        return handleHttp(res, 'ERROR_GET_ANIME_ENTRIES', error);
    }
}