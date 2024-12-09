import { localhostUserToModel } from "../mappers/localhost-user.mapper";

/** 
 * @param {Number} page 
 * @returns {Promise<{ users: User[], isLastPage: boolean, totalPages: number }>}
 */
export const loadUsersByPage = async  (page = 1 ) => {

    const url = `${ import.meta.env.VITE_BASE_URL }/users?_page=${ page }`;
    const response = await fetch (url);    
    const datosRecibidos = await response.json();

    const usersArray = datosRecibidos.data; //es necesario extraer el array de usuarios, que se llama 'data' dentro del objeto recibido del backend    
    const totalPages = datosRecibidos.pages; // número total de páginas
    const isLastPage = datosRecibidos.next === null;  //conocer si es la última página

    const users = usersArray.map ( userLike => localhostUserToModel (userLike));
  
    console.log (users); //ahora ya devuelve un array de objetos User mapeados   
    return { users, isLastPage, totalPages }; //fíjate con qué sintaxis se puede hacer un return múltiple
}