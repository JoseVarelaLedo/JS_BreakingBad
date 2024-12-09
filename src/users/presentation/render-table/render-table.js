import usersStore from '../../store/users-store';
import { showModal } from '../render-modal/render-modal';
import { deleteUserById } from '../../use-cases/delete-user-by-id';
import './render-table.css';

let table;

const createTable = () => {
    const table = document.createElement('table');
    const tableHeaders = document.createElement('thead');
    tableHeaders.innerHTML = `
        <tr>
            <th>#ID</th>
            <th>Balance</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Active</th>
            <th>Actions</th>       
        </tr>
    `;

    const tableBody = document.createElement('tBody');
    table.append(tableHeaders, tableBody);
    return table;
}

/**  
 * @param {MouseEvent} event 
 * @returns 
 */
const tableSelectListener = ( event ) =>  {
    const element = event.target.closest('.select-user'); //buscamos el botón select  
    if (!element) return; //si pinchamos en algo que no sea "Select" salimos
    const id = element.getAttribute ('data-id');
    showModal ( id );
}

/**  
 * @param {MouseEvent} event 
 * @returns 
 */
const tableDeleteListener = async ( event ) =>  {
    const element = event.target.closest('.delete-user'); //buscamos el botón delete  
    console.log (element);
    if (!element) return; //si pinchamos en algo que no sea "Delete" salimos
    const id = +element.getAttribute ('data-id');
    console.log (id);
    try{
        await deleteUserById ( id );
        await usersStore.reloadPage();
        document.querySelector('#current-page').innerText = usersStore.getCurrentPage();
        renderTable();
    }catch (error){
        alert ('Deletion not complete!');
    }   
}

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderTable = (element) => {
    const users = usersStore.getUsers();

    if (!table) {
        table = createTable();
        element.append(table);
    }

    table.addEventListener('click', tableSelectListener);
    table.addEventListener('click', tableDeleteListener);

    let tableHTML = '';
    users.forEach(user => {
        tableHTML += `
            <tr>
                <td>${ user.id }</td>
                <td>${ user.balance }</td>
                <td>${ user.firstName }</td>
                <td>${ user.lastName }</td>
                <td>${ user.isActive }</td>
                <td>
                    <a href="#/" class="select-user" data-id="${user.id}">Select</a>
                    |
                    <a href="#/" class="delete-user" data-id="${user.id}">Delete</a>
                </td>     
            </tr>           
        `
    });

    table.querySelector('tbody').innerHTML = tableHTML;
}