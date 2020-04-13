import './reset.css';
import './styles.css';

const LOCALSTORAGE_KEY = 'contacts';

const booksphone = document.querySelector('.bookWrap');
const contactList = document.querySelector('.contactsList');
const form = document.querySelector('.form');
const book = document.querySelector('.phoneBoоk');
const newContactTemplate = document.querySelector('#newContactTemplate').innerHTML;
const nameContact = document.querySelector('.nameContact');
const numberContact = document.querySelector('.numberContact');
const emailContact = document.querySelector('.emailContact');
const dateBirth = document.querySelector('.inputDateBirth');


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
        case e.target.classList.contains('form'):
            closeForm();
            break;
    }
}
function onBooksPhoneClick(e){
    switch(true){
        case e.target.classList.contains('createContact'):
            openFormCreateContact();
        break;
    }
}

function addNewContact(){    
    renderContact();
    closeForm();

}

function openFormCreateContact(){
    cssBlur();
    showForm();
    resetForm();
}

function resetForm(){
    form.reset();
}
function showForm(){
    form.style.display = 'block';  
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

    return newContactTemplate.replace('{{id}}',contact.id)
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
    console.log(item);
    
    const myFriend = newContactTemplate.replace('{{id}}', item.id)
                    .replace('{{name}}', item.name)
                    .replace('{{number}}', item.number)
                    .replace('{{email}}', item.email)
                    .replace('{{dateBirth', item.dateBirth);

    contactList.innerHTML += myFriend;
}
