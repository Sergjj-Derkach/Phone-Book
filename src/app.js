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

booksphone.addEventListener('click', onBooksPhoneClick);
form.addEventListener('click', onFormClick);

init();

function init(){
    listContacts = localStorage.getItem(LOCALSTORAGE_KEY);
    listContacts = listContacts ? JSON.parse : [];

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

function renderContact(){
    contactList.innerHTML += ContactTemplate();    
}

function ContactTemplate(){   
    let id = Date.now();    
    return newContactTemplate.replace('{{id}}',id)
                            .replace('{{name}}',nameContact.value)
                            .replace('{{number}}',numberContact.value)
                            .replace('{{email}}',emailContact.value)
                            .replace('{{dateBirth}}',dateBirth.value);
}
