import { Response } from "express";

export const handleHttp = (res: Response, error_name: string, error: any) => {
    res.status(500).json({error_name});
    console.log(error);
    return;
}