import { Request } from "express";
import { User } from "./user";

export interface RequestExt extends Request {
    authUser?: User
}