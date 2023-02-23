import { NextFunction, Request, Response } from "express";

export const checkRating = ( req:Request, res: Response, next: NextFunction) => {
    try {
        const {rating} = req.body;
        if ( rating > 10 || rating < 0 ) { 
            return res.status(400).json({
                value: rating,
                msg: "El rating debe ser un número entre el 0 y el 10 como máximo"
            });
        }
        return next();
    } catch (error) {
        console.log(error);
    }
}