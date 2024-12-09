import { localhostUserToModel } from '../mappers/localhost-user.mapper';
import { userModelToLocalHost } from '../mappers/user-to-localhost.mapper';
import { User } from '../models/user';

/**
 * @param {Like<User>>} userLike 
 */
export const saveUser = async ( userLike ) => {
    const user = new User ( userLike );

    if (!user.firstName || !user.lastName)
        throw new Error ('First Name $ Last Name required');

    const userToSave = userModelToLocalHost ( user );

    let userUpdated; 
    if ( user.id ){
        userUpdated = await updateUser( userToSave ); //si se nos pasa id actualizamos
    }else{
        userUpdated = await createUser ( userToSave ); //si no creamos usuario
    }
    return localhostUserToModel (userUpdated);  //mapeamos a formato backend
}

/** 
 * @param {Like<User>} user 
 */
const createUser = async ( user ) => {
    const url = `${ import.meta.env.VITE_BASE_URL}/users`;
    const response = await fetch (url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const newUser = await response.json();

    return newUser;
}

/** 
 * @param {Like<User>} user 
 */
const updateUser = async ( user ) => {
    const url = `${ import.meta.env.VITE_BASE_URL}/users/${ user.id }`;
    const response = await fetch (url, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const updatedUser = await response.json();

    return updatedUser;
}