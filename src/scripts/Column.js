import './Ticket';
/** Class representing the Column. */
class Column {
  /**
   * Create a button.
   * @param {string} title - The title of the column.
   * @param {string} type - The type of the column
     */
  constructor(title, type) {
    this.id = Math.floor((1 + Math.random()) * 0x10000).toString(16)
        .substring(1);
    this.title = title;
    this.type = type;
    this.tickets = [];
    this.addTicket = this.addTicket.bind(this);
  }
  /**
     * Add ticket to array of tickets.
     * @param {HTMLElement} element - the ticket element.
     */
  addTicket(element) {
    this.tickets.push(element);
  }
}
export default Column;
