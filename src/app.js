import './reset.css';
import './styles.css';

const LOCALSTORAGE_KEY = 'contacts';

const booksphone = document.querySelector('.bookWrap');
const contactList = document.querySelector('.contactsList');
const form = document.querySelector('.form');
const formNewContact = document.querySelector('.formNewContact');
const formEditContact = document.querySelector('.formEditContact');
const book = document.querySelector('.phoneBoоk');
const ContactTemplate = document.querySelector('#ContactTemplate').innerHTML;
const nameContact = document.querySelector('.nameContact');
const numberContact = document.querySelector('.numberContact');
const emailContact = document.querySelector('.emailContact');
const dateBirth = document.querySelector('.inputDateBirth');
const formEditContactTemplate = document.querySelector('#formEditTemplate').innerHTML;



let listContacts = [];
let id = Date.now();


listContacts = localStorage.getItem(LOCALSTORAGE_KEY);
listContacts = listContacts ? JSON.parse(listContacts) : [];
console.log(listContacts);

booksphone.addEventListener('click', onBooksPhoneClick);
form.addEventListener('click', onFormClick);

init();

function init(){
    renderListContacts();
}

function onFormClick(e){
    e.preventDefault();
    switch(true){
        case e.target.classList.contains('close'):
            closeForm();
            break;
        case e.target.classList.contains('addCont'):
            addNewContact();
            break;
        case e.target.classList.contains('formNewContact'):
            closeForm();
            break;
    }
}
function onBooksPhoneClick(e){
    switch(true){
        case e.target.classList.contains('createContact'):
            openFormCreateContact();
        break;
        case e.target.classList.contains('deleteBtn'):
            deleteContac(e.target.parentNode.parentNode.id);
            break;
        case e.target.classList.contains('editBtn'):
            editContact(e.target.parentNode.parentNode.id);
            break;
    }
}

function editContact(id){
    listContacts = listContacts.find(item => item.id == id);
    formEditContact.innerHTML = formEdit(listContacts);
    showFormEditContact();

}


function formEdit(item){
    return formEditContactTemplate.replace('{{id}}',item.id)
                                .replace('{{name}}', item.name)
                                .replace('{{number}}',item.number)
                                .replace('{{email}}',item.email)
                                .replace('{{dateBirth}}',item.dateBirth);
}





function deleteContac(id){
    listContacts = listContacts.filter(item => item.id != id);
        
    saveStorage();
    clearContactsList();
    renderListContacts();
}

function clearContactsList(){
    while(contactList.firstChild){
        contactList.removeChild(contactList.firstChild);
    }
}

function addNewContact(){    
    renderContact();
    closeForm();
}

function openFormCreateContact(){
    cssBlur();
    showFormNewContact();
    resetForm();
}

function resetForm(){
    form.reset();
}

function showFormNewContact(){
    formNewContact.style.display = 'block';  
}

function showFormEditContact(){
    formEditContact.style.display = 'block';  
}

function cssBlur(){
    book.classList.add('blur');
}

function closeForm(){
    form.style.display = 'none';
    deleteClassBlur();
}

function deleteClassBlur(){
    book.classList.remove('blur');
}

function renderContact(contact){
    createContact();
    contactList.innerHTML += createContact();    
}

function createContact(){
    let id = Date.now();   

    let contact ={
        id:id,
        name:nameContact.value,
        number:numberContact.value,
        email:emailContact.value,
        dateBirth:dateBirth.value
    }
    saveStorage();
    listContacts.push(contact);    

    return ContactTemplate.replace('{{id}}',contact.id)
                            .replace('{{name}}',contact.name)
                            .replace('{{number}}',contact.number)
                            .replace('{{email}}',contact.email)
                            .replace('{{dateBirth}}',contact.dateBirth);
}

function saveStorage(){
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(listContacts));
}

function renderListContacts(){
    listContacts.forEach(storageContactTemplte); 
}

function storageContactTemplte(item){
       
    const myFriend = ContactTemplate.replace('{{id}}', item.id)
                    .replace('{{name}}', item.name)
                    .replace('{{number}}', item.number)
                    .replace('{{email}}', item.email)
                    .replace('{{dateBirth}}', item.dateBirth);

    contactList.innerHTML += myFriend;
}
