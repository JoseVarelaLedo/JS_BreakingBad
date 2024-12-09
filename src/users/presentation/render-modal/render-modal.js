import modalHtml from './render-modal.html?raw'; //esto sólo funciona en Vite
import { User } from '../../models/user';
import { getUserById } from '../../use-cases/get-user-by-id';
import './render-modal.css';

let modal, form;
let loadedUser = {};

/**
 * 
 * @param {String|Number} id 
 */
export const showModal = async ( id ) => {
    modal?.classList.remove ('hide-modal');
    loadedUser = {}; //se deja como vacío, de nuevo, por si acaso.
    if (!id) return; //si no existe id no hacemos nada
    const user = await getUserById ( id );
    setFormValues ( user );
}

export const hideModal = () => {
    modal?.classList.add ('hide-modal');
    form?.reset(); //si existe formulario, lo resetea
}

/** 
 * @param {User} user 
 */
const setFormValues = ( user ) => {
    form.querySelector('[name="firstName"]').value = user.firstName; //ojo a la sintaxis
    form.querySelector('[name="lastName"]').value = user.lastName;
    form.querySelector('[name="balance"]').value = user.balance;
    form.querySelector ('[name="isActive"]').checked = user.isActive;
    loadedUser = user;
}

/** 
 * @param {HTMLDivElement} element 
 * @param {(userLike)=> Promise<void>} callback
 */
export const renderModal= ( element, callback ) => {
    if ( modal ) return;

    modal = document.createElement ('div');
    modal.innerHTML = modalHtml;
    modal.className = 'modal-container hide-modal';

    form = modal.querySelector ('form');

    // si el click es en algún punto de la página que no sea el propio modal, se cierra (oculta)
    modal.addEventListener ('click', ( event ) => {
        if (event.target.className === 'modal-container') {
            hideModal();
        }
    });

    //prevención de refresco de página por HTML, sólo queremos comportamiento HTTP
    form.addEventListener ('submit', async ( event ) =>{
        event.preventDefault();

        const formData = new FormData( form ); //para crear los campos del formulario
        const userLike = { ...loadedUser};    //objeto que se asemeje a un usuario

        //validaciones; necesarias porque por defecto todos se convierten a String
        for (const [key, value] of formData) {
            if ( key === 'balance' ){
                userLike[key] = +value; //el + antes de la variable es para comvertirlo a numérico (TRUCO PARA CAST)
                continue;
            }

            //por defecto FormData escribe true como 'on', así convertimos de nuevo a boolean
            if ( key === 'isActive' ){
                userLike[key] = (value==='on')?true:false;               
                
            }
            //para el resto, como son strings, dejamos su tipo por defecto
            userLike[key] = value;
        }

        await callback(userLike);
        hideModal();        
    });


    element.append (modal);
}