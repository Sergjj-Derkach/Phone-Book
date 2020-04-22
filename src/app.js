import './reset.css';
import './styles.css';

import $ from "jquery";

const LOCALSTORAGE_KEY = 'contacts';
const messageDiv = document.querySelector('.message');
const booksphone = document.querySelector('.bookWrap');
const contactList = document.querySelector('.contactsList');

const form = document.querySelector('.form');
const formNewContact = document.querySelector('.formNewContact');
const formEditContact = document.querySelector('.formEditContact');

const book = document.querySelector('.phoneBoоk');

const nameContact = document.querySelector('.nameContact');
const numberContact = document.querySelector('.numberContact');
const emailContact = document.querySelector('.emailContact');
const dateBirth = document.querySelector('.inputDateBirth');

const nameEdit = document.querySelector('.nameEdit');
const numberEdit = document.querySelector('.numberEdit');
const emailEdit = document.querySelector('.emailEdit');
const dateBirthEdit = document.querySelector('.inputDateBirthEdit');

const ContactTemplate = document.querySelector('#ContactTemplate').innerHTML;

let listContacts = [];
let listDateBirth = [];
let cont;
let idEditContact;
let messageStr;


listContacts = localStorage.getItem(LOCALSTORAGE_KEY);
listContacts = listContacts ? JSON.parse(listContacts) : [];

booksphone.addEventListener('click', onBooksPhoneClick);
form.addEventListener('click', onFormClick);
formEditContact.addEventListener('click', onFormEditContact);
messageDiv.addEventListener('click', closeMessageDiv);

init();

function init(){
    renderListContacts();
    setTimeout(showMesseg, 2000);
}

function closeMessageDiv(e){
    if(e.target.classList.contains('redX')){
        closeDiv();
    };
}

function closeDiv(){
    messageDiv.style.display = 'none';
}

function dateCheck(item){
    const separator = '-';
    const comma = ', ';
    let newDate = item.dateBirth.split(separator);
    newDate.shift();
        
    let datecontact = newDate.join(separator);
   
    if(todaysDate() ==  datecontact){
        listDateBirth.push(item.name);
    } 

    messageStr = listDateBirth.join(comma);
    return messageStr;    
}

function showMesseg(){
    listContacts.forEach(dateCheck);   
    const div = document.createElement('div');
    if(messageStr == ''){
        messageDiv.style.display = 'none';
    }
    div.className = 'messageBirthDay';
    div.innerHTML = `<div class="textMess">Сегодня день рождение: ${messageStr}</div> <span class="redX">X</span>`;
    messageDiv.append(div);
}


function todaysDate(){
    let date = new Date;
    let dateDay = date.getDate();
    let dateMonth = `${date.getMonth() + 1}`;
    let correctDateMonth;
    if(dateMonth <= '9'){
        correctDateMonth = `${0 + dateMonth}`;
    }
    let concatDate = `${correctDateMonth}-${dateDay}`;
    return concatDate;

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

function onFormEditContact(e){
    e.preventDefault();
    switch(true){
        case e.target.classList.contains('saveCont'):
            saveEditContact();
            break;
        case e.target.classList.contains('close'):
            closeEditForm();
            break;
    }
}


function editContact(id){
    formEditContact.style.display = 'block';
    let contactFromTheList = listContacts.find(item => item.id == id);
    renderEditContact(contactFromTheList);
}

function renderEditContact(item){
    idEditContact = item.id;
    nameEdit.value = item.name;
    numberEdit.value = item.number;
    emailEdit.value = item.email;
    dateBirthEdit.value = item.dateBirth;

    cont = {
        id:idEditContact,
        name:item.name,
        number:item.number,
        email:item.email,
        dateBirth:item.dateBirth
    }    
}

function saveEditContact(){
    cont = {
        id:idEditContact,
        name:nameEdit.value,
        number:numberEdit.value,
        email:emailEdit.value,
        dateBirth:dateBirthEdit.value
    }   
        
    listContacts = listContacts.filter(el => el.id != cont.id);
    listContacts.push(cont);

    saveStorage();
    clearContactsList();
    renderListContacts();
    closeEditForm();    
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

function sortListContacts(){
    listContacts.sort((prev,next)=>{
        if ( prev.name < next.name ) return -1;
        if ( prev.name < next.name ) return 1;
    });
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


function cssBlur(){
    book.classList.add('blur');
}

function closeEditForm(){
    formEditContact.style.display = 'none';
}

function closeForm(){
    form.style.display = 'none';
    deleteClassBlur();
}

function deleteClassBlur(){
    book.classList.remove('blur');
}

function renderContact(){
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
    sortListContacts();
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

$(document).ready(function(){
    $('#inputSearch').on('keyup', function() {
      let  value = $(this).val().toLowerCase();
      $('.contactsList .contact').filter(function() {
         $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });
