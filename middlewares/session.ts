import { NextFunction, Response } from "express";
import { findByEmail } from "../queries/users";
import { RequestExt } from "../interfaces/request";
import { verifyToken } from "../utils/jwt.handle";

export const checkJWT = async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
        const jwbUser = req.headers.authorization || '';
        const jwt = jwbUser.split(" ").pop();
        const isUser = verifyToken(`${jwt}`) as { id: string };

        if(!isUser) return res.status(401).json({msg: 'USER_NOT_VALID_SESSION'});
        
        //Get the email from isUser -> isUser: JWTPayload
        const {id} = isUser;

        const authUser = await findByEmail(id);

        //Global variable for nexts checks middlewares
        req.authUser = authUser;

        console.log(req.authUser);
        
        return next();
    } catch (error) {
        return res.status(401).json({ msg:'SESSION_NOT_VALID' });
    }
}