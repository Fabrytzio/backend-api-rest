import { Router } from "express";
import { pool } from "../models/db";


const router = Router();

router.get("/ping", async ( _req, res ) => {
    const [result] = await pool.query('Select "Pong" AS result');
    res.json( result );
});

export default router;