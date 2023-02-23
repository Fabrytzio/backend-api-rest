import { checkUserExist, createNewUser, findByEmail } from "../queries/users";
import { Auth } from "../interfaces/auth";
import { LoginData, LoginResponse, RegisterUserData, RegisterResponse } from "../interfaces/user";
import { encrypt, verified } from "../utils/encrypt.handle";
import { generateToken } from "../utils/jwt.handle";

export const registerNewUser = async ({ 
        name, 
        username, 
        email, 
        password, 
        repeat_password 
    }: RegisterUserData ): Promise<RegisterResponse> => {
    
    //Check passwords
    if ( password !== repeat_password ) return 'USER_PASSWORDS_NOT_MATCH';
    
    //Check if there are an user with an email already registerd    
    const checkIs = await checkUserExist('email', email);
    if ( checkIs ) return 'USER_ALREDY_REGISTERED';

    //Encrypt the password
    const passHash = await encrypt( password );

    //Insert into the database
    await createNewUser(name, username, email, passHash);
    return 'USER_CREATED';        
}

export const loginUser = async ( { email, password }: Auth ):Promise<LoginResponse | LoginData> => {
    const user = await findByEmail( email );

    //if the user is not found in the db
    if ( !user ) return "USER_NOT_FOUND";
    
    //Check user deleted
    if ( user.deleted ) return "USER_DELETED";

    //compare if the password entered is equal to password in db
    const passwordHash = user.password;
    const isEqual = await verified( password, passwordHash );

    if(!isEqual) return 'USER_PASSWORD_INVALID';
    
    const token = generateToken( user.email );
    const data = {
        token,
        logged_user: user
    };
    return data;
}
