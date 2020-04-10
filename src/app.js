import './reset.css';
import './styles.css';

const booksphone = document.querySelector('.bookWrap');
const contactList = document.querySelector('.contactsList');
const addBtnContact = document.querySelector('.addBtn');
const newContactTemplate = document.querySelector('#newContactTemplate').innerHTML;

booksphone.addEventListener('click', onBooksPhoneClick);

function onBooksPhoneClick(e){
    switch(true){
        case e.target.classList.contains('addBtn'):
            addNewContact();
    }
}

function addNewContact(){
    contactList.innerHTML += newContactTemplate;
}

// function newContactHtml(){
//     return newContactTemplate.replace()
// }