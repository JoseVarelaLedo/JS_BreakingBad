import { User } from "../models/user"

/**
 * 
 * @param {Like<User>} localhostUser son los datos del usuario tal cual se reciben del backend, algo que es "like" un usuario
 * @returns {User} una nueva instancia de usuario
 */
export const localhostUserToModel = ( localhostUser ) => {

    const {                     //desestructuramos cada elemento recibido del backend
        avatar, 
        balance,
        first_name,
        gender,
        id,
        isActive,
        last_name,
    } = localhostUser;

    return new User({
        avatar, 
        balance,
        firstName: first_name,  //cambiamos sólo los valores que necesitamos mapear
        gender,
        id,
        isActive,
        lastName: last_name,    //también éste
    });
}