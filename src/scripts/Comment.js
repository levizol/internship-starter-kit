/** Class representing the comment on a ticket. */
class TicketComment {
    id ='';
    value = '';
    /**
     * Create a comment.
     * @param {string} value - the value of the comment
     */
    constructor(value) {
      this.id = Math.floor((1 + Math.random()) * 0x10000).toString(16)
          .substring(1);
      this.value = value;
    }
}

export default TicketComment;
