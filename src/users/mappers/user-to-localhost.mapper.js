import { User } from "../models/user"

/**
 * @param {User} user 
 */
export const userModelToLocalHost = ( user ) => {
    const { //desestructuramos
        avatar, 
        balance,
        firstName,
        gender,
        id, 
        isActive,
        lastName,
    } = user;

    return {
        avatar, 
        balance,
        first_name: firstName, //adaptación al nombre del backend
        gender,
        id, 
        isActive,
        last_name: lastName, //idem
    }
}