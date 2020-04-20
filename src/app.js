import './reset.css';
import './styles.css';

import $ from "jquery";




const LOCALSTORAGE_KEY = 'contacts';

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


const formEditContactTemplate = document.querySelector('#formEditTemplate').innerHTML;
const ContactTemplate = document.querySelector('#ContactTemplate').innerHTML;


let listContacts = [];
let listDateBirth = [];
let id = Date.now();




listContacts = localStorage.getItem(LOCALSTORAGE_KEY);
listContacts = listContacts ? JSON.parse(listContacts) : [];
console.log(listContacts);

booksphone.addEventListener('click', onBooksPhoneClick);
form.addEventListener('click', onFormClick);
formEditContact.addEventListener('click', onFormEditContact);

init();

function init(){
    renderListContacts();
}


listContacts.forEach(dateCheck);

function dateCheck(item){
    let separator = '-';
    let newDate = item.dateBirth.split(separator);
    newDate.shift();
        
    let datecontact = newDate.join(separator);
   
    if(todaysDate() ==  datecontact){
        listDateBirth.push(item.name);
    } 
}

console.log(listDateBirth); 

function todaysDate(){
    let date = new Date;
    let dateDay = date.getDate();
    let dateMonth = `${date.getMonth() + 1}`;
    let concatDate = `${0 + dateMonth}-${dateDay}`;
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
            console.log('closeEdit');
            closeEditForm();
            break;
    }
}

$(document).ready(function(){
    $('#inputSearch').on('keyup', function() {
      let  value = $(this).val().toLowerCase();
      $('.contactsList .contact').filter(function() {
         $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });

function saveEditContact(){
    console.log('saveEdit');
    
    const elModCont = document.querySelector('.editContact');
    const modContId = elModCont.getAttribute('id');
    
    let name = nameEdit.value;


    let modCont = {
        id:modContId,
        name:name,
        number:numberEdit.value,
        email:emailEdit.value,
        dateBirth:dateBirthEdit.value
    }

    console.log(modCont);   
}

function editContact(id){
    let editListContacts = listContacts.find(item => item.id == id);
    formEditContact.innerHTML = formEdit(editListContacts);
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
