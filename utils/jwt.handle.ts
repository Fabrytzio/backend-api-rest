import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "8c4e0134b9e28fa2be0f0b85ef30fc51ff0f1ca9";

export const generateToken =  ( id:string ): string => {
    const jwt = sign({ id }, JWT_SECRET, {
        expiresIn: "2h"
    });
    return jwt;
}

export const verifyToken = (jwt: string) => {
    const isOk = verify(jwt, JWT_SECRET);
    return isOk
}