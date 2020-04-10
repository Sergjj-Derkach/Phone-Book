import './reset.css';
import './styles.css';

const booksphone = document.querySelector('.bookWrap');
const contactList = document.querySelector('.contactsList');
const addBtnContact = document.querySelector('.addBtn');
const form = document.querySelector('.form');
const book = document.querySelector('.phoneBoоk');
const newContactTemplate = document.querySelector('#newContactTemplate').innerHTML;

booksphone.addEventListener('click', onBooksPhoneClick);
form.addEventListener('click', onFormClick);


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
        case e.target.classList.contains('addBtn'):
            openFormCreateContact();
        break;
    }
}

function addNewContact(){


    
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