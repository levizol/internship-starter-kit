/* import-urile*/
import '../styles/main.css';
import '../templates/main.html';

/* ----------------------- on hover (header) --------------------------*/

const header = document.querySelectorAll('.header');

for (let i = 0; i < header.length; i++) {
  header[i].addEventListener('mouseenter', enterHeader);
  header[i].addEventListener('mouseleave', leaveHeader);
}

/**
 * Enter in the header section (hover a+)
 * Make the title invisible and the edit and add options visible
 * ** PS: elementele din html au si copii de tip text, coloanele adaugate nu,
 *                    de aici si indecsii respectivi
*/
function enterHeader() {
  const col = event.target.closest('.header').childNodes;
  if (col[2].nodeName === '#text') {
    col[1].style.display = 'none';
    col[3].style.display = 'block';
    col[5].style.display = 'block';
  } else {
    col[0].style.display = 'none';
    col[1].style.display = 'block';
    col[2].style.display = 'block';
  }
}

/**
 * Leave the header section (unhover a+)
 * Make the title of the column visible and the others ('+', '...') invisible
 * ** PS: elementele din html au si copii de tip text, coloanele adaugate nu
*/
function leaveHeader() {
  const col = event.target.closest('.header').childNodes;
  if (col[2].nodeName === '#text') {
    col[1].style.display = 'block';
    col[3].style.display = 'none';
    col[5].style.display = 'none';
  } else {
    col[0].style.display = 'block';
    col[1].style.display = 'none';
    col[2].style.display = 'none';
  }
}


/* ------------------------------------ coloane ----------------------------*/

const popup = document.getElementById('add-popup');
const closeAdd = document.getElementById('closeAdd');
const addButton = document.querySelectorAll('.fa-plus');
const saveButton = document.querySelector('#saveBtn');

for (let i = 0; i < addButton.length; i++) {
  addButton[i].addEventListener('click', openPopup);
}
closeAdd.addEventListener('click', closePopup);
saveButton.addEventListener('click', addColumnToRight);

/**
 * Popup for adding a column
 * Find the selected column and Set an id for this
*/
function openPopup() {
  const col = event.target.closest('.flex-column');
  col.setAttribute('id', 'clickedColumn');
  popup.style.display = 'block';
  event.preventDefault();
}

/**
 * The function for closing the popup for adding columns
 * Remove the id for the selected column
*/
function closePopup() {
  event.preventDefault();
  popup.style.display = 'none';
  const col = document.getElementById('clickedColumn');
  col.removeAttribute('id');
}

/**
 * Make the popup invisible
 * Get the name of the column from the user (popup)
 * Keep the selected column in a constant
 * Call the function which adds a new column after the selected column
 *        with the name from the user
*/
function addColumnToRight() {
  popup.style.display = 'none';
  const name = document.getElementById('columnName').value;
  const clickedColumn = document.getElementById('clickedColumn');
  event.preventDefault();
  addTheNewColumn(name, clickedColumn);
}


/**
 * Create a new Column and added after the 'element'
 * @param {String} title - the title of the new column
 * @param {HTMLElement} element - the column after which it has to insert
 */
function addTheNewColumn(title, element) {
  const col = document.getElementById('clickedColumn');
  col.removeAttribute('id');

  const flexColumn = document.createElement('div');
  const header = document.createElement('div');
  const nameColumn = document.createElement('div');
  const addColumn = document.createElement('div');
  const editColumn = document.createElement('div');
  const contentColumn = document.createElement('div');

  header.classList.add('header');
  flexColumn.classList.add('flex-column');
  nameColumn.classList.add('name-column');
  addColumn.classList.add('add-column');
  editColumn.classList.add('edit-column');
  contentColumn.classList.add('content-column');

  const addFont = document.createElement('i');
  const dotsFont = document.createElement('i');
  addFont.classList.add('fas', 'fa-plus');
  dotsFont.classList.add('fas', 'fa-ellipsis-h');

  addFont.addEventListener('click', openPopup);

  nameColumn.innerHTML = title;
  addColumn.appendChild(addFont);
  editColumn.appendChild(dotsFont);

  console.log(addFont);
  console.log(dotsFont);

  header.appendChild(nameColumn);
  header.appendChild(editColumn);
  header.appendChild(addColumn);
  flexColumn.appendChild(header);
  flexColumn.appendChild(contentColumn);
  header.addEventListener('mouseenter', enterHeader);
  header.addEventListener('mouseleave', leaveHeader);
  element.after(flexColumn);
  event.preventDefault();
}


/* -------------------------------------- tichete ---------------------------*/

const popupTicket = document.getElementById('ticket-popup');
const saveTicket = document.querySelector('#saveTicket');
const closeTicket = document.getElementById('closeTicket');

/**
 * Open the popup for adding new ticket
 */
function openPopupTicket() {
  popupTicket.style.display = 'block';
}

/**
 * Function for closing the popup corresponding to the ticket
 */
function closePopupTicket() {
  popupTicket.style.display = 'none';
}

const todoColumn = document.getElementById('idTODO');
todoColumn.addEventListener('dblclick', openPopupTicket);
saveTicket.addEventListener('click', addTicket);
closeTicket.addEventListener('click', closePopupTicket);

/**
 * Make the popup invisible when pressing the 'add ticket' button
 * Create the ticket and add to the 'TO DO' column
 */
function addTicket() {
  popupTicket.style.display = 'none';
  const todoColumn = document.getElementById('contentTODO');
  const chenar = document.createElement('div');
  chenar.classList.add('chenar-ticket');

  const ticketName = document.createElement('h4');
  const name = document.createElement('h5');
  const labelFilter = document.createElement('label');
  const remaining = document.createElement('div');

  const ticketNameValue = document.getElementById('ticketName').value;
  const nameValue = document.getElementById('name').value;
  const labelValue = document.getElementById('labelFilter').value;
  const remainingValue = document.getElementById('remaining').value;

  ticketName.innerText = ticketNameValue;
  name.innerText = nameValue;
  labelFilter.innerText = labelValue;
  remaining.innerText = remainingValue;

  chenar.appendChild(ticketName);
  chenar.appendChild(name);
  chenar.appendChild(labelFilter);
  chenar.appendChild(remaining);

  todoColumn.appendChild(chenar);
  chenar.setAttribute('draggable', 'true');
  chenar.addEventListener('dragstart', drag);
  event.preventDefault();
}


/* -----------------------drag and drop--------------------------*/

const contentColumn = document.querySelectorAll('.content-column');
for (let i = 0; i < contentColumn.length; i++) {
  contentColumn[i].addEventListener('dragover', allowDrop);
  contentColumn[i].addEventListener('drop', drop);
}

/**
 *
 * @param {*} ev
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 *
 * @param {*} ev
 */
function drag(ev) {
  console.log(ev.target);
  ev.target.setAttribute('id', 'clickedTicket');
  ev.dataTransfer.setData('text', ev.target.id);
}

/**
 *
 * @param {*} ev
 */
function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData('text');
  const clickedTicket = document.getElementById('clickedTicket');
  ev.target.appendChild(document.getElementById(data));
  clickedTicket.removeAttribute('id');
}


/* -----------------------those 3 dots on the header--------------------------*/

const popupEdit = document.getElementById('edit-name-popup');
const closePopupEdit = document.getElementById('closeEditName');
closePopupEdit.addEventListener('click', closePopupEditName);

const saveNewName = document.getElementById('saveNewName');
saveNewName.addEventListener('click', editColumnName);

const dots = document.querySelectorAll('.edit-column');
for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener('click', openPopupDots);
}

const editName = document.querySelectorAll('.edit-name-column');
for (let i = 0; i < editName.length; i++) {
  editName[i].addEventListener('click', openPopupEditName);
}

/** Open the popup for the dots options
 * @param {HTMLElement} event
*/
function openPopupDots(event) {
  // console.log(event.target.closest('.header'));
  const header = event.target.closest('.header');
  const popup = header.querySelector('.popup-dots');
  // console.log(popup);
  popup.classList.toggle('show');
}

/**
 *
 * @param {*} event
 */
function openPopupEditName() {
  const header = event.target.closest('.header');
  header.querySelector('.name-column').setAttribute('id', 'columnNameChanged');
  popupEdit.style.display = 'block';
  event.preventDefault();
}


/**
 *
 * @param {*} event
 */
function editColumnName() {
  popupEdit.style.display = 'none';
  console.log('h');
  event.preventDefault();
  const name = document.getElementById('columnNewName').value;
  const column = document.getElementById('columnNameChanged');
  column.innerText = name;
  column.removeAttribute('id');
}


/**
 * The function for closing the popup for edit name column
*/
function closePopupEditName() {
  popupEdit.style.display = 'none';
}

/* ---------------------------------------- delete column---------------------*/
const columnToDelete = document.querySelectorAll('.delete-column');
for (let i = 0; i < columnToDelete.length; i++) {
  columnToDelete[i].addEventListener('click', deleteColumn);
}

/**
 * function for deleting a column
 * @param {HTMLElement} event
 */
function deleteColumn(event) {
  const header = event.target.closest('.flex-column');
  console.log(header);
  const container = document.querySelector('.flex-container');
  container.removeChild(header);
}
