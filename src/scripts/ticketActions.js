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
}
/**
     * Function.
     * Creates a ticket.
     */
function addTicket() {
  const template = document.querySelector('#ticket');
  const ticket = template.content.cloneNode(true);
  const ticketNr = document.querySelector('#ticketNumber').value;
  const ticketName = document.querySelector('#ticketName').value;
  const ticketLabel = document.querySelector('#ticketLabel').value;
  const newTicket = new Ticket(ticketNr, ticketName, ticketLabel, '0');
  const ticketID = ticket.querySelector('.ticketID');
  const column = content.closest('.col');
  updateTicketData(ticket, newTicket, column);
  const deleteTicket = ticket.querySelector('.deleteTicketButton i');
  deleteTicket.addEventListener('click', openDeleteTicket);
  ticketID.innerText = newTicket.id;
  const columns = JSON.parse(localStorage.getItem('columns'));
  columns[0].tickets.push(newTicket);
  setTicketListeners(ticket);
  localStorage.setItem('columns', JSON.stringify(columns));
  content.appendChild(ticket);
  updateHeaders(column);
  setOnDragStart();
  setSpanListeners();
  hideTicketModal();
}