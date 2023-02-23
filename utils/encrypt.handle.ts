import { hash, compare } from "bcryptjs";

export const encrypt = async ( password:string ) => {
    const passwordHash = await hash( password, 10 );
    return passwordHash;
}

export const verified = async ( password: string, passHash: string) => {
    const isEqual = await compare( password, passHash );
    return isEqual;
}