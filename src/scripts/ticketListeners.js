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
}
/**
     * Function that show the label for the edit remaining input
     * @param {DocumentEvent} event - the event that was triggered
     */
function showInputLabel(event) {
  const editRemaining = event.target.parentElement;
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

