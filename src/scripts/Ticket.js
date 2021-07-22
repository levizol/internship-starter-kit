/** Class representing the Button. */
class Ticket {
  id ='';
  number ='';
  title = '';
  label = '';
  remaining = '';
  /**
   * Create a button.
   * @param {string} number - the number of the ticket
   * @param {string} title - the title of the ticket
   * @param {string} label - the label of the ticket
   * @param {string} remaining - the remainingg hours of the ticket
   */
  constructor(number, title, label, remaining) {
    this.updateRemaining = this.updateRemaining.bind(this);
    this.id = Math.floor((1 + Math.random()) * 0x10000).toString(16)
        .substring(1);
    this.number = number;
    this.title = title;
    this.label = label;
    const remainingNr = Number(remaining);
    const estimateNr = remainingNr / 4;
    this.estimate = estimateNr.toString();
    this.remaining = remaining;
  }
  /**
   * Function that updates the value of remaining and estimate
   * @param {string} newValue - the new value for remaining
   */
  updateRemaining(newValue) {
    this.remaining = newValue;
    const remainingNr = Number(newValue);
    const estimateNr = remainingNr / 4;
    this.estimate = estimateNr.toString();
  }
}
export default Ticket;
