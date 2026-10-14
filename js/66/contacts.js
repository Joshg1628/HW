function getElement(selector) {
  return document.querySelector(selector);
}

function setCss(element, property, value) {
  // element.style.property = value;
  element.style[property] = value;
}

function on(element, eventType, callback) {
  element.addEventListener(eventType, callback);
}

function click(element, callback) {
  on(element, 'click', callback);
}

const contactsTable = getElement('#contactsTable tbody');
const addContactForm = getElement('#addContact');
const loadContactsButton = getElement('#load');
const firstInput = getElement('#first');
const lastInput = getElement('#last');
const emailInput = getElement('#email');
const phoneInput = getElement('#phone');
const addContactButton = getElement('#add');
let contacts = [];

function hideAddContactForm() {
  setCss(addContactForm, 'display', 'none');
  addContactForm.reset();
  setCss(addContactButton, 'visibility', 'visible');
}

on(addContactForm, 'submit', e => {
  e.preventDefault();

  if (!contacts.length) {
    contactsTable.innerHTML = '';
  }

  const newContact = {
    first: firstInput.value,
    last: lastInput.value,
    email: emailInput.value,
    phone: phoneInput.value
  };

  contacts.push(newContact);

  const row = contactsTable.insertRow();

  // <td><button>delete</button></td>
  row.innerHTML = `
    <td>${firstInput.value}</td>
    <td>${lastInput.value}</td>
    <td>${emailInput.value}</td>
    <td>${phoneInput.value}</td>
    <td><button>delete</button></td>
  `;

  /*const td = document.createElement('td');
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'delete';
  td.appendChild(deleteButton);
  row.appendChild(td);
  deleteButton.addEventListener('click', () => {
    console.log('delete row here');
  });*/

  row.querySelector('button').addEventListener('click', () => {
    row.remove();

    contacts = contacts.filter(c => c !== newContact);

    if (!contacts.length) {
      contactsTable.innerHTML = `<tr>
          <td colspan="5">no contacts loaded</td>
        </tr>`;
    }
  });

  hideAddContactForm();
});

click(addContactButton, () => {
  setCss(addContactForm, 'display', 'block');
  setCss(addContactButton, 'visibility', 'hidden');
});

click(getElement('#cancel'), hideAddContactForm);

click(loadContactsButton, async () => { // --------- ------ HW66
  const response = await fetch('contacts.json');
  const data = await response.json();
  contacts = data; // store the loaded contacts in the contacts array
  contactsTable.innerHTML = ''; // clear the table before adding loaded contacts
  contacts.forEach(contact => {
    const row = contactsTable.insertRow(); // insert a new row for each contact
    row.innerHTML = `
        <td>${contact.first}</td>
        <td>${contact.last}</td>
        <td>${contact.email}</td>
        <td>${contact.phone}</td>
        <td><button>delete</button></td> // add the delete button for each contact
      `;
    row.querySelector('button').addEventListener('click', () => {
      row.remove();
      contacts = contacts.filter(c => c !== contact); // remove that contact
      if (!contacts.length) {
        contactsTable.innerHTML = `<tr>
              <td colspan="5">no contacts loaded</td>
            </tr>`;
      }
    });
  });

});
