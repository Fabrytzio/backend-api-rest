//ESModules
import express, { Application } from 'express';
// const express = require("express"); -> commonjs
import cors from 'cors';

import userRoutes from '../routes/user';
import dbRoutes from '../routes/db';
import tagRoutes from '../routes/tag';
import authRoutes from '../routes/auth';
import entryRoutes from '../routes/entry';

class Server {
    private app: Application;
    private PORT: number;

    constructor(){
        this.app = express();
        this.PORT = 8080;
        this.middlewares();
        this.routes();
    }
    
    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static("public"));
    }

    routes(){
        this.app.use('/users', userRoutes);
        this.app.use('/db', dbRoutes);
        this.app.use('/tags', tagRoutes);
        this.app.use('/auth', authRoutes);
        this.app.use('/animes', entryRoutes);
    }

    listen(){
        this.app.listen(this.PORT, () => {
            console.log(`Server runing on port: ${this.PORT}`);
        });
    }
}

export default Server;