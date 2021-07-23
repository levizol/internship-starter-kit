import '../styles/main.css';
import '../styles/ticketStyles.css';
import Column from './Column';
import Ticket from './Ticket';

loadData();
// refreshData();
// eslint-disable-next-line require-jsdoc
function refreshData() {
  localStorage.clear();
  const toDoColumn = new Column('To do', 'todo');
  const normalColumn = new Column('Tasks', '');
  const doneColumn = new Column('Done', 'done');
  const ticket1 =
  new Ticket('ISA-293', 'Finish Board', 'Integrate Storage', '5');
  toDoColumn.addTicket(ticket1);
  const columns = [];
  columns.push(toDoColumn);
  columns.push(normalColumn);
  columns.push(doneColumn);
  localStorage.setItem('columns', JSON.stringify(columns));
}

/**
   * Function.
   * Creates a new ticket element.
   * @param {Ticket} ticket - the ticket data
   * @param {HTMLElement} column - the column of the ticket
   * @return {HTMLElement} ticket - returns the ticket html element
   */
function createTicket(ticket, column) {
  const template = document.querySelector('#ticket');
  const newTicket = template.content.cloneNode(true);
  updateTicketData(newTicket, ticket, column);
  const crtStatusColor = newTicket.querySelector('.editTicketStatusColor');
  updateTicketComments(newTicket, ticket);
  const blueColor = 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)';
  if (!column.querySelector('div').classList.contains('doneColumn') &&
  !column.querySelector('div').classList.contains('toDoColumn')) {
    crtStatusColor.style['background-image'] = blueColor;
  }
  setTicketListeners(newTicket);
  return newTicket;
}
/**
   * Function.
   * Creates a new column.
   * @param {Column} column - the column data
   * @return {HTMLElement} newColumn - return the column html element
   */
function createColumn(column) {
  const queryString = '#' + column.type + 'column';
  const template = document.querySelector(queryString);
  const newColumn = template.content.cloneNode(true);
  const newColumnHeader = newColumn.querySelector('.columnHeader');
  const title = newColumnHeader.querySelector('.title');
  title.innerText = column.title + ' ' + column.tickets.length;
  const id = newColumnHeader.querySelector('.columnID');
  id.innerText = column.id;
  const columnContent = newColumn.querySelector('.content');
  for (let i = 0; i <column.tickets.length; i++) {
    if (column.tickets[i]) {
      columnContent.appendChild(createTicket(column.tickets[i], newColumn));
    }
  }
  newColumnHeader.addEventListener('mouseenter', seeColumnActions);
  newColumnHeader.addEventListener('mouseleave', hideColumnActions);
  return newColumn;
}
/**
 * Function that sets the listeners for each ticket
 * @param {HTMLElement} ticket - the ticket
 */
function setTicketListeners(ticket) {
  const remainingWrapper = ticket
      .querySelector('.editTicketWrapper.remainingWrapper');
  const ticketRemainingEdit = ticket.querySelector('.ticketRemainingEdit');
  const pen = remainingWrapper.querySelector('.pen');
  ticket.querySelector('.ticket').addEventListener('click', showTicketEdit);
  const closeTicket = ticket.querySelector('i.fa-times');
  closeTicket.addEventListener('click', hideTicketEdit);
  pen.addEventListener('click', showInputButtons);
  pen.addEventListener('mouseenter', showInputLabel);
  pen.addEventListener('mouseleave', hideInputLabel);
  const xIcon = remainingWrapper.querySelector('.fa-times');
  xIcon.addEventListener('click', hideInputButtons);
  const confirmIcon = remainingWrapper.querySelector('.fa-check-square');
  const deleteTicket = ticket.querySelector('.deleteTicketButton i');
  const newCommentWrapper = ticket.querySelector('.newCommentWrapper');
  const xNewComment = newCommentWrapper.querySelector('i.fa-times');
  const confirmNewCom = newCommentWrapper.querySelector('i.fa-check-square');
  const newComInput = newCommentWrapper.querySelector('.newCommentInput');
  confirmNewCom.addEventListener('click', addComment);
  xNewComment.addEventListener('click', hideNewComment);
  newComInput.addEventListener('input', checkNewCommentInput);
  deleteTicket.addEventListener('click', openDeleteTicket);
  confirmIcon.addEventListener('click', updateTicketRemaining);
  ticketRemainingEdit.addEventListener('mouseenter', showInputLabel);
  ticketRemainingEdit.addEventListener('mouseleave', hideInputLabel);
  ticketRemainingEdit.addEventListener('click', showInputButtons);
  remainingWrapper.addEventListener('mouseenter', showEditRemaining);
  remainingWrapper.addEventListener('mouseleave', hideEditRemaining);
}
/**
   * Function.
   * Loads the columns fromt the localStorage.
   */
function loadData() {
  const board = document.querySelector('.board');
  const columns = JSON.parse(localStorage.getItem('columns'));
  for (let i = 0; i <columns.length; i++) {
    board.appendChild(createColumn(columns[i]));
  }
  const content = document.querySelector('.toDoColumn .content');
  content.addEventListener('dblclick', showTicketModal);
  setIcons();
  setOnDragStart();
  setSpanListeners();
  setAllowDrop();
  setButtonListeners();
  setColumnActions();
}
/**
   * Function.
   * Finds the position of the current column in localStorage.
   * @param {string} columnID - the columnID of the columnt that needs to be
   * searched
   * @return {number} pos - position of the column with the class crtColumn
   */
function findPosition(columnID) {
  const columns = JSON.parse(localStorage.getItem('columns'));
  for (let i = 0; i <columns.length; i++) {
    if (columns[i].id === columnID) {
      return i;
    }
  }
  return -1;
}
/**
 * Function
 * Returns the position of the ticket with the id
 * in the localStorage
 * @param {string} ticketID - the ticket ID
 * @param {number} columnPos - the column position in local storage
 * @return {number} position - the position of the ticket
 */
function findPositionTicket(ticketID, columnPos) {
  const columns = JSON.parse(localStorage.getItem('columns'));
  const position = columns[columnPos].tickets.findIndex((el)=> {
    el.id === ticketID;
  });
  return position;
}
/**
   * Function.
   * Adds a column to the page.
   */
function addColumn() {
  const column = document.querySelector('.crtColumn');
  const crtColumnID = column.querySelector('p.columnID').innerText;
  const positionOfCrtColumn = findPosition(crtColumnID);
  const template = document.querySelector('#column');
  const newColumn = template.content.cloneNode(true);
  const newColumnHeader = newColumn.querySelector('.columnHeader');
  const title = newColumnHeader.querySelector('.title');
  title.innerText = document.querySelector('#columnName').value;
  setHeaderListeners(newColumnHeader);
  const icon = newColumn.querySelector('.fas.fa-plus-circle');
  icon.addEventListener('click', showModal);
  const content = newColumn.querySelector('.content');
  content.addEventListener('dragover', allowDrop);
  content.addEventListener('drop', drop);
  column.after(newColumn);
  const newColumnObj = new Column(title.innerText, '');
  const columnID = newColumnHeader.querySelector('.columnID');
  columnID.innerText = newColumnObj.id;
  title.innerText += ' ' + newColumnObj.tickets.length;
  const columns = JSON.parse(localStorage.getItem('columns'));
  columns.splice(positionOfCrtColumn + 1, 0, newColumnObj);
  localStorage.setItem('columns', JSON.stringify(columns));
  setSpanListeners();
  setIcons();
  hideModal();
}
/**
   * Function.
   * Deletes a column from the page.
   */
function deleteColumn() {
  const column = document.querySelector('.crtColumn');
  const columnID = column.querySelector('p.columnID').innerText;
  const columns = JSON.parse(localStorage.getItem('columns'));
  columns.splice(findPosition(columnID), 1);
  localStorage.setItem('columns', JSON.stringify(columns));
  const board = document.querySelector('.board');
  board.removeChild(column);
  hideConfirmDeleteModal();
}
// eslint-disable-next-line require-jsdoc
function calcEstimate(remaining) {
  const remainingNr = Number(remaining);
  const estimateNr = remainingNr / 4;
  const estimate = estimateNr.toString();
  return estimate;
}
/**
   * Function.
   * Set updates the number of tasks for each column header.
   * @param {HTMLElement} column - the column that needs updating
   */
function updateHeaders(column) {
  const columns = JSON.parse(localStorage.getItem('columns'));
  const columnID = column.querySelector('.columnID').innerText;
  const columnPos = findPosition(columnID);
  const columnTitle = column.querySelector('.title');
  const title = columns[columnPos].title.replace(/[0-9]/g, '');
  columnTitle.innerText = title + ' ' + columns[columnPos].tickets.length;
}
/**
   * Function.
   * Adds a column to the page.
   */
function updateColumn() {
  const column = document.querySelector('.crtColumn');
  const columnID = column.querySelector('.columnID').innerText;
  const posCrtColumn = findPosition(columnID);
  const columns = JSON.parse(localStorage.getItem('columns'));
  const newTitle = document.querySelector('#updateColumnName').value;
  columns[posCrtColumn].title = newTitle;
  const tickets = column.querySelectorAll('.ticket');
  localStorage.setItem('columns', JSON.stringify(columns));
  updateHeaders(column);
  for (let i = 0; i < columns[posCrtColumn].tickets.length; i++) {
    const ticket = columns[posCrtColumn].tickets[i];
    updateTicketData(tickets[i], ticket, column);
  }
  hideEditColumnModal();
}
/**
   * Function.
   * Hides the title of the column and displays the actions.
   * @param {DocumentEvent} event - the event that triggered the action
   */
function seeColumnActions(event) {
  const columnHeader = event.target;
  const actions = columnHeader.querySelector('.columnActions');
  const title = columnHeader.querySelector('.title');
  title.style.display = 'none';
  actions.style.display = 'flex';
}
/**
   * Function.
   * Hides the actions and displays the title
   * @param {DocumentEvent} event - the event that triggered the action
   */
function hideColumnActions(event) {
  const columnHeader = event.target;
  const editOptions = columnHeader.querySelector('.editOptions');
  const actions = columnHeader.querySelector('.columnActions');
  const title = columnHeader.querySelector('.title');
  editOptions.classList.toggle('editShow', false);
  title.style.display = 'flex';
  actions.style.display = 'none';
}


// MODAL FUNCTIONS
/**
   * Function.
   * shows the modal.
   */
function showTicketModal() {
  document.querySelector('.board').style.opacity = '0.2';
  document.querySelector('#addTicketModal').style.display = 'block';
}
/**
   * Function.
   * hides the add column modal.
   */
function hideTicketModal() {
  document.querySelector('#addTicketModal').style.display = 'none';
  document.getElementById('columnName').value = '';
  document.querySelector('.board').style.opacity = '1';
}
/**
   * Function.
   * shows the modal.
   * @param {DocumentEvent} event - the event that triggered the modal
   */
function showEditColumnModal(event) {
  const column = event.target.closest('.col');
  column.classList.toggle('crtColumn', true);
  const columnName = column.querySelector('.title').innerText
      .replace(/[0-9]/g, '');
  document.querySelector('.board').style.opacity = '0.2';
  document.querySelector('#updateColumnName').value = columnName;
  document.querySelector('#updateColumnModal').style.display = 'block';
}
/**
   * Function.
   * hides the update column modal.
   */
function hideEditColumnModal() {
  document.querySelector('#updateColumnModal').style.display = 'none';
  document.querySelector('#updateColumnName').value = '';
  document.querySelector('.board').style.opacity = '1';
  const column = document.querySelector('.crtColumn');
  column.classList.toggle('crtColumn', false);
}
/**
   * Function.
   * shows the modal.
   * @param {DocumentEvent} event - the event that triggered the modal
   */
function showModal(event) {
  const columnHeader = event.target.closest('.columnHeader');
  const column = columnHeader.parentElement;
  column.classList.toggle('crtColumn', true);
  document.querySelector('.board').style.opacity = '0.2';
  document.querySelector('#addModal').style.display = 'block';
}
/**
   * Function.
   * Sets the event listener for each icon.
   */
function checkInput() {
  const newColumnName = document.querySelector('#columnName').value;
  if (newColumnName === '' || newColumnName.length < 3) {
    document.querySelector('#addButton').setAttribute('disabled', 'true');
    return;
  }
  document.querySelector('#addButton').setAttribute('disabled', 'false');
}
/**
   * Function.
   * hides the column modal.
   */
function hideModal() {
  const crtColumn = document.querySelector('.crtColumn');
  crtColumn.classList.toggle('crtColumn', false);
  document.querySelector('#addModal').style.display = 'none';
  document.getElementById('columnName').value = '';
  document.querySelector('.board').style.opacity = '1';
}
/**
 * Function that shows the delete confirmation modal
 * @param {DocumentEvent} event - the event that was triggered
 */
function showConfirmDeleteModal(event) {
  const column = event.target.closest('.col');
  column.classList.toggle('crtColumn', true);
  document.querySelector('.board').style.opacity = '0.2';
  document.querySelector('#confirmDeleteColumnModal').style.display = 'block';
  console.log(column);
}
/**
 * Function that hides the delete confirmation modal
 */
function hideConfirmDeleteModal() {
  document.querySelector('.board').style.opacity = '1';
  document.querySelector('#confirmDeleteColumnModal').style.display = 'none';
}
// END OF MODAL FUNCTIONS


/**
   * Function.
   * Sets the mouseover and mouseleave for each header.
   */
function setColumnActions() {
  const headers = document.querySelectorAll('.columnHeader');
  for (let i = 0; i < headers.length; i++) {
    setHeaderListeners(headers[i]);
  }
}
/**
 * Function that sets the mouseenter and mouseleave event listeners
 * @param {HTMLElement} header -the header
 */
function setHeaderListeners(header) {
  header.addEventListener('mouseenter', seeColumnActions);
  header.addEventListener('mouseleave', hideColumnActions);
}
/**
   * Function.
   * Sets the function to show the popup
   * @param {DocumentEvent} event - the event that was triggered
   */
function openPopUp(event) {
  const editButton = event.target.parentElement;
  const popUp = editButton.querySelector('.editOptions');
  popUp.classList.toggle('editShow', true);
}
/**
   * Function.
   * Sets the function to show the popup
   * @param {DocumentEvent} event - the event that was triggered
   */
function openDeleteTicket(event) {
  const deleteTicketButton = event.target.closest('.deleteTicketButton');
  const deleteTicket = deleteTicketButton.querySelector('.deleteTicketOption');
  deleteTicket.classList.toggle('deleteTicketShow');
}
/**
   * Function.
   * Sets the event listener for each icon for the columnHeader.
   */
function setIcons() {
  const plusIcons = document
      .querySelectorAll('.columnHeader i.fas.fa-plus-circle');
  const dots = document.querySelectorAll('.editButton i.fas.fa-ellipsis-h');
  for (let i=0; i < plusIcons.length; i++) {
    plusIcons[i].addEventListener('click', showModal);
    dots[i].addEventListener('click', openPopUp);
  }
  const editTicketDots = document.
      querySelectorAll('.deleteTicketButton i.fas.fa-ellipsis-h');
  for (let i = 0; i < editTicketDots.length; i++) {
    editTicketDots[i].addEventListener('click', openDeleteTicket);
  }
}
/**
   * Function.
   * Set the listeners for the buttons.
   */
function setButtonListeners() {
  const addButton = document.querySelector('#addButton');
  const cancelButton = document.querySelector('#cancelButton');
  const addTicketButton = document.querySelector('#addTicketButton');
  const cancelTicketButton = document.querySelector('#cancelTicketButton');
  const cancelEditColumnButton = document.querySelector('#cancelUpdateColumn');
  const updateColumnButton = document.querySelector('#saveUpdateColumn');
  const cancelConfirmButton = document.querySelector('#cancelDeleteColumn');
  const confirmDeleteButton = document.querySelector('#confirmDeleteColumn');
  addButton.addEventListener('input', checkInput);
  cancelButton.addEventListener('click', hideModal);
  addButton.addEventListener('click', addColumn);
  cancelTicketButton.addEventListener('click', hideTicketModal);
  addTicketButton.addEventListener('click', addTicket);
  cancelEditColumnButton.addEventListener('click', hideEditColumnModal);
  updateColumnButton.addEventListener('click', updateColumn);
  cancelConfirmButton.addEventListener('click', hideConfirmDeleteModal);
  confirmDeleteButton.addEventListener('click', deleteColumn);
}
/**
   * Function.
   * Set the listeners for the edit column data.
   */
function setSpanListeners() {
  const deleteSpans = document.querySelectorAll('span.deleteColumn');
  for (let i = 0; i < deleteSpans.length; i++) {
    deleteSpans[i].addEventListener('click', showConfirmDeleteModal);
  }
  const updateColumnSpans = document.querySelectorAll('span.updateColumn');
  for (let i = 0; i < updateColumnSpans.length; i++) {
    updateColumnSpans[i].addEventListener('click', showEditColumnModal);
  }
  const deleteTickets = document.
      querySelectorAll('.deleteTicketOption .deleteTicket');
  for (let i = 0; i < deleteTickets.length; i++) {
    deleteTickets[i].addEventListener('click', deleteTicket);
  }
  const newComment = document.querySelectorAll('.addCommentTicket');
  for (let i = 0; i < deleteTickets.length; i++) {
    newComment[i].addEventListener('click', showNewComment);
  }
}
// TICKET FUNCTIONS
/**
   * Function.
   * Updates the ticket data.
   * @param {HTMLElement} ticket - the ticket that needs updating
   * @param {Ticket} ticketObj - the object with the data
   * @param {HTMLElement} column - the column of the ticket
   */
function updateTicketData(ticket, ticketObj, column) {
  ticket.querySelector('.ticketID').innerText = ticketObj.id;
  ticket.querySelector('.ticketNr').innerText = ticketObj.number;
  ticket.querySelector('.ticketTitle').innerText = ticketObj.title;
  ticket.querySelector('.ticketLabel').innerText = ticketObj.label;
  ticket.querySelector('.editTicketNumber').innerText = ticketObj.number;
  ticket.querySelector('.editTicketTitle').innerText = ticketObj.title;
  ticket.querySelector('.editTicketStatus').innerText = column.
      querySelector('.title').innerText.replace(/[0-9]/g, '');
  ticket.querySelector('.editTicketLabel').innerText = ticketObj.label;
  ticket.querySelector('.editTicketEstimate').innerText = ticketObj.estimate;
  const ticketRemaining = ticketObj.remaining + 'h';
  ticket.querySelector('.editTicketRemaining').innerText = ticketRemaining;
  ticket.querySelector('.ticketRemaining').innerText = ticketRemaining;
  const numberInitial = ticketObj.number.substr(0, 1).toUpperCase();
  const titleInitial = ticketObj.title.substr(0, 1).toUpperCase();
  const labelInitial = ticketObj.label.substr(0, 1).toUpperCase();
  const signValue = (numberInitial + titleInitial + labelInitial).bold();
  ticket.querySelector('.ticketSign').innerHTML = signValue;
}
/**
 * Function
 * Updates the ticket comments
 * @param {HTMLElement} ticket - the ticket that need updating
 * @param {Ticket} ticketObj - the ticket data
 */
function updateTicketComments(ticket, ticketObj) {
  const commentList = ticket.querySelector('ul.userComments');
  commentList.innerHTML ='';
  for (let i=0; i < ticketObj.comments.length; i++) {
    const li = document.createElement('li');
    li.classList.add('comment');
    li.innerText = ticketObj.comments[i];
    commentList.appendChild(li);
  }
}
/**
 * Function that updates a ticket's remaining time
 * @param {DocumentEvent} event - the event that was triggered
 */
function updateTicketRemaining(event) {
  const editRemaining = event.target.closest('.editRemaining');
  const newValue = editRemaining.querySelector('input.ticketRemainingEdit')
      .value;
  const ticket = editRemaining.closest('.ticket');
  const ticketIDVal = ticket.querySelector('.ticketID').innerText;
  const column = editRemaining.closest('.col');
  const columnID = column.querySelector('.columnID').innerText;
  const columns = JSON.parse(localStorage.getItem('columns'));
  const posColumn = findPosition(columnID);
  for (let i=0; i<columns[posColumn].tickets.length; i++) {
    if (columns[posColumn].tickets[i].id === ticketIDVal) {
      columns[posColumn].tickets[i].remaining = newValue;
      columns[posColumn].tickets[i].estimate = calcEstimate(newValue);
      updateTicketData(ticket, columns[posColumn].tickets[i], column);
    }
  }
  localStorage.setItem('columns', JSON.stringify(columns));
  hideInputButtons(event);
  hideEditRemaining(event);
}
/**
 * Function
 * Adds a new comment
 * @param {DocumentEvent} event - the event that was triggered
 */
function addComment(event) {
  const ticket = event.target.closest('.ticket');
  const column = event.target.closest('.col');
  const columnID = column.querySelector('.columnID').innerText;
  const ticketID = ticket.querySelector('.ticketID').innerText;
  const newCommentWrapper = event.target.closest('.newCommentWrapper');
  const newCommentInput = newCommentWrapper.querySelector('.newCommentInput');
  const newComment = newCommentInput.value;
  const columns = JSON.parse(localStorage.getItem('columns'));
  const columnPos = findPosition(columnID);
  const posOfTicket =columns[columnPos]
      .tickets.findIndex((el) => el.id === ticketID);
  columns[columnPos].tickets[posOfTicket].comments.push(newComment);
  updateTicketComments(ticket, columns[columnPos].tickets[posOfTicket]);
  localStorage.setItem('columns', JSON.stringify(columns));
  hideNewComment(event);
}
/**
   * Function.
   * Creates a ticket.
   */
function addTicket() {
  const ticketNr = document.querySelector('#ticketNumber').value;
  const ticketName = document.querySelector('#ticketName').value;
  const ticketLabel = document.querySelector('#ticketLabel').value;
  const newTicket = new Ticket(ticketNr, ticketName, ticketLabel, '0');
  const toDoContent = document.querySelector('.toDoColumn .content');
  const column = toDoContent.closest('.col');
  const ticket = createTicket(newTicket, column);
  updateTicketData(ticket, newTicket, column);
  updateTicketComments(ticket, newTicket);
  const columns = JSON.parse(localStorage.getItem('columns'));
  columns[0].tickets.push(newTicket);
  setTicketListeners(ticket);
  localStorage.setItem('columns', JSON.stringify(columns));
  toDoContent.appendChild(ticket);
  updateHeaders(column);
  setOnDragStart();
  setSpanListeners();
  hideTicketModal();
}
/**
   * Function.
   * Creates a ticket.
   * @param {DocumentEvent} event - the event that was triggered
   */
function deleteTicket(event) {
  const ticket = event.target.closest('.ticket');
  const ticketID = ticket.querySelector('.ticketID').innerText;
  const column = ticket.closest('.col');
  const content = ticket.parentElement;
  const columnID = column.querySelector('.columnID').innerText;
  const position = findPosition(columnID);
  const columns = JSON.parse(localStorage.getItem('columns'));
  const posOfTicket =columns[position]
      .tickets.findIndex((el) => el.id === ticketID);
  columns[position].tickets.splice(posOfTicket, 1);
  content.removeChild(ticket);
  localStorage.setItem('columns', JSON.stringify(columns));
  updateHeaders(column);
}
/**
 * Function
 * Shows the new comment input
 * @param {DocumentEvent} event - the event that was triggered
 */
function showNewComment(event) {
  const editTicketContent = event.target.closest('.editTicketContent');
  console.log(editTicketContent);
  const newComment = editTicketContent.querySelector('.newCommentWrapper');
  newComment.style.display = 'flex';
  openDeleteTicket(event);
}
/**
 * Function
 * Hides the new comment input
 *  @param {DocumentEvent} event - the event that was triggered
 */
function hideNewComment(event) {
  const editTicketContent = event.target.closest('.editTicketContent');
  const newComment = editTicketContent.querySelector('.newCommentWrapper');
  const newCommentInput = newComment.querySelector('.newCommentInput');
  newCommentInput.value = '';
  newComment.style.display = 'none';
}
/**
   * Function.
   * Shows the ticket edit div.
   * @param {DocumentEvent} event - the event that was triggered
   */
function showTicketEdit(event) {
  const ticketEdit = event.target.querySelector('.editTicket');
  if (ticketEdit) {
    ticketEdit.classList.toggle('editTicketShow', true);
  }
}
/**
   * Function.
   * Shows the ticket edit div.
   * @param {DocumentEvent} event - the event that was triggered
   */
function hideTicketEdit(event) {
  const ticketEdit = event.target.closest('.editTicket');
  const deleteTicketOption = event.target.closest('.editTicketOptions')
      .querySelector('.deleteTicketOption');
  deleteTicketOption.classList.toggle('deleteTicketShow', false);
  ticketEdit.classList.toggle('editTicketShow', false);
  const inputButtons = ticketEdit.querySelector('.inputButtons');
  inputButtons.style.display = 'none';
  hideNewComment(event);
}
/**
 * Function that show the label for the edit remaining input
 * @param {DocumentEvent} event - the event that was triggered
 */
function showInputLabel(event) {
  const editRemaining = event.target.closest('.editRemaining');
  const remainingLabel = editRemaining.querySelector('.remainingLabel');
  remainingLabel.style.display = 'block';
}
/**
 * Function that hides the label for the edit remaining input
 * @param {DocumentEvent} event - the event that was triggered
 */
function hideInputLabel(event) {
  const editRemaining = event.target.parentElement;
  const remainingLabel = editRemaining.querySelector('.remainingLabel');
  remainingLabel.style.display = 'none';
}
/**
 * Function that show the input buttons for the remaining edit
 * @param {DocumentEvent} event - the event that was triggered
 */
function showInputButtons(event) {
  hideInputLabel(event);
  const editRemaining = event.target.closest('.editRemaining');
  const inputButtons = editRemaining.querySelector('.inputButtons');
  const pen = editRemaining.querySelector('.pen');
  pen.style.display = 'none';
  inputButtons.style.display = 'block';
}
/**
 * Function that hides the input Buttons
 * @param {DocumentEvent} event - the event that was triggered
 */
function hideInputButtons(event) {
  const editRemaining = event.target.closest('.editRemaining');
  const inputButtons = editRemaining.querySelector('.inputButtons');
  const pen = editRemaining.querySelector('.pen');
  pen.style.display = 'flex';
  inputButtons.style.display = 'none';
}
/**
 * Function that shows the edit remaining input
 * @param {DocumentEvent} event - the event that was triggered
 */
function showEditRemaining(event) {
  const editRemaining = event.target.querySelector('.editRemaining');
  const editTicketRemaining= event.target.querySelector('.editTicketRemaining');
  const ticketRemaining = event.target
      .querySelector('.editTicketRemaining').innerText;
  const inputRemaining = event.target.querySelector('.ticketRemainingEdit');
  inputRemaining.value = ticketRemaining.replace(/[h]/g, '');
  editRemaining.style.display = 'flex';
  editTicketRemaining.style.display = 'none';
}
/**
 * Function that hides the edit remaining input
 * @param {DocumentEvent} event - the event that was triggered
 */
function hideEditRemaining(event) {
  const editRemaining = event.target.querySelector('.editRemaining');
  const editTicketRemaining= event.target.querySelector('.editTicketRemaining');
  const inputRemaining = event.target.querySelector('.ticketRemainingEdit');
  const pen = editRemaining.querySelector('.pen');
  pen.style.display = 'flex';
  inputRemaining.value = '';
  editRemaining.style.display = 'none';
  editTicketRemaining.style.display = 'block';
}
/**
   * Function.
   * Sets the event listeners for ondragstart for tickets.
   */
function setOnDragStart() {
  const tickets = document.querySelectorAll('.ticket');
  for (let i = 0; i < tickets.length; i++) {
    tickets[i].addEventListener('dragstart', drag);
    tickets[i].addEventListener('dragend', removeCrtColumn);
  }
}
/**
   * Function.
   * Allows drop on the content elements.
   * @param {DocumentEvent} event -the event that was triggered
   */
function allowDrop(event) {
  event.preventDefault();
}
/**
   * Function.
   * Drags an element.
   * @param {DocumentEvent} event - the event that was triggered
   */
function drag(event) {
  event.target.setAttribute('id', 'dragID');
  const ticketID = event.target.querySelector('.ticketID').innerText;
  const column = event.target.parentElement.parentElement;
  const columnID = column.querySelector('.columnID').innerText;
  column.classList.toggle('crtColumn', true);
  event.dataTransfer.setData('ticket', event.target.id);
  event.dataTransfer.setData('ticketID', ticketID);
  event.dataTransfer.setData('fromColumnID', columnID);
}
/**
   * Function.
   * Defines what happens when u drop a ticket.
   * @param {DocumentEvent} event -the event that was triggered
   */
function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData('ticket');
  const ticketID = event.dataTransfer.getData('ticketID');
  const fromColumnID = event.dataTransfer.getData('fromColumnID');
  const columns = JSON.parse(localStorage.getItem('columns'));
  const FromColumnPosition = findPosition(fromColumnID);
  const ticketPos = columns[FromColumnPosition]
      .tickets.findIndex((el) => el.id === ticketID);
  const ticket = columns[FromColumnPosition]
      .tickets.find((el) => el.id === ticketID);
  columns[FromColumnPosition].tickets.splice(ticketPos, 1);
  event.target.appendChild(document.getElementById(data));
  const crtTicket = document.querySelector('#dragID');
  document.getElementById(data).removeAttribute('id');
  const crtColumn = document.querySelector('.crtColumn');
  const fromColumnTitle = columns[FromColumnPosition].title;
  const fromColumnNrTickets = columns[FromColumnPosition].tickets.length;
  const fromColumn = crtColumn.querySelector('.title');
  fromColumn.innerText = fromColumnTitle + ' ' +fromColumnNrTickets;
  crtColumn.classList.toggle('crtColumn', false);
  const toAddColumn = event.target.parentElement;
  const toAddColumnID = toAddColumn.querySelector('.columnID').innerText;
  const toAddColumnPosition = findPosition(toAddColumnID);
  columns[toAddColumnPosition].tickets.push(ticket);
  columns[toAddColumnPosition].tickets.filter(function isNotNull(el) {
    return el !== null;
  });
  const titleToAddColumn = toAddColumn.querySelector('.title');
  const nrTickets = columns[toAddColumnPosition].tickets.length;
  const title = columns[toAddColumnPosition].title;
  const editTicketStatus = crtTicket.querySelector('p.editTicketStatus');
  const crtStatusColor = crtTicket.querySelector('.editTicketStatusColor');
  const blueColor = 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)';
  const greenColor = 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)';
  if (!toAddColumn.classList.contains('doneColumn') &&
  !toAddColumn.classList.contains('toDoColumn')) {
    crtStatusColor.style['background-image'] = blueColor;
  } else {
    crtStatusColor.style['background-image'] = greenColor;
  }
  editTicketStatus.innerText = title;
  titleToAddColumn.innerText = title + ' '+ nrTickets;
  localStorage.setItem('columns', JSON.stringify(columns));
}
/**
   * Function.
   * Sets the event listeners for ondragover and ondrop for the content.
   */
function setAllowDrop() {
  const contents = document.querySelectorAll('.content');
  for (let i = 0; i < contents.length; i++) {
    contents[i].addEventListener('dragover', allowDrop);
    contents[i].addEventListener('drop', drop);
  }
}
/**
   * Function.
   * Removes the crtColumn class from the element that has it.
   */
function removeCrtColumn() {
  const crtColumn = document.querySelector('.crtColumn');
  if (crtColumn) {
    crtColumn.classList.toggle('crtColumn', false);
  }
}
/**
 * Function
 * Checks the input for the new comment input
 * @param {DocumentEvent} event
 */
function checkNewCommentInput(event) {
  const input = event.target;
  const newCommentWrapper = input.closest('.newCommentWrapper');
  const confirmIcon = newCommentWrapper.querySelector('i.fa-check-square');
  if (input.value !== '') {
    confirmIcon.style.visibility = 'visible';
  } else {
    confirmIcon.style.visibility = 'hidden';
  }
}
