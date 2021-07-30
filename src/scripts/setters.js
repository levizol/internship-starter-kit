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
 * Function that sets the listeners for each ticket
 * @param {HTMLElement} ticket - the ticket
 */
function setTicketListeners(ticket) {
  console.log(ticket.querySelector('.ticket'));
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
  confirmIcon.addEventListener('click', updateTicketRemaining);
  ticketRemainingEdit.addEventListener('mouseenter', showInputLabel);
  ticketRemainingEdit.addEventListener('mouseleave', hideInputLabel);
  ticketRemainingEdit.addEventListener('click', showInputButtons);
  remainingWrapper.addEventListener('mouseenter', showEditRemaining);
  remainingWrapper.addEventListener('mouseleave', hideEditRemaining);
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
   * Set the listeners for the edit column data.
   */
function setSpanListeners() {
  const deleteSpans = document.querySelectorAll('span.deleteColumn');
  for (let i = 0; i < deleteSpans.length; i++) {
    deleteSpans[i].addEventListener('click', deleteColumn);
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
  addButton.addEventListener('input', checkInput);
  cancelButton.addEventListener('click', hideModal);
  addButton.addEventListener('click', addColumn);
  cancelTicketButton.addEventListener('click', hideTicketModal);
  addTicketButton.addEventListener('click', addTicket);
  cancelEditColumnButton.addEventListener('click', hideEditColumnModal);
  updateColumnButton.addEventListener('click', updateColumn);
}
/**
   * Function.
   * Sets the mouseover and mouseleave for each header.
   */
function setColumnActions() {
  for (let i = 0; i < headers.length; i++) {
    headers[i].addEventListener('mouseenter', seeColumnActions);
    headers[i].addEventListener('mouseleave', hideColumnActions);
  }
}

export {setTicketListeners};
export {setIcons};
export {setOnDragStart};
