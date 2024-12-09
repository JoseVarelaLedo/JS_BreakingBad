import { loadUsersByPage } from "../use-cases/load-users-by-page";

const state = {
    currentPage: 0,
    users: [],
    isLastPage: false,
    totalPages: 0,
}

const loadNextPage = async () => {
    if (state.isLastPage) return;    
    const { users, isLastPage, totalPages } = await loadUsersByPage ( state.currentPage + 1);
    if ( users.length === 0) return; //si llegamos a la última página, al sumarle 1, salimos de rango y ya no existen usuarios que paginar, y salimos
    
    state.currentPage += 1; //se actualiza el valor de la página actual
    state.users = users;
    state.isLastPage = isLastPage;
    state.totalPages = totalPages;
}

const loadPreviousPage = async () => {
    if (state.currentPage === 1) return;
    const { users, isLastPage, totalPages } = await loadUsersByPage ( state.currentPage -1); 
    state.currentPage -= 1; //se actualiza el valor de la página actual
    state.users = users;
    state.isLastPage = isLastPage;
    state.totalPages = totalPages;
}

const onUserChanged = ( uptdatedUser ) => {

    let wasFound = false;
    state.users = state.users.map (user => {
        if (user.id === uptdatedUser.id){
            wasFound = true;
            return uptdatedUser;
        }
        return user;
    });

    if ( state.users.length < 10 && ! wasFound) {
        state.users.push ( updatedUser );
    }
}

const reloadPage = async () => {    
    if (state.isLastPage) return;    
    const { users, isLastPage, totalPages } = await loadUsersByPage ( state.currentPage );
    if ( users.length === 0) {
        await loadPreviousPage();
        return;
    }    
   
    state.users = users;
    state.isLastPage = isLastPage;
    state.totalPages = totalPages;
}

export default {
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,

    /**
     * 
     * @returns {User[]}
     */
    getUsers:() => [...state.users],

     /**
     * 
     * @returns {Number}
     */
    getCurrentPage: () => state.currentPage,

}