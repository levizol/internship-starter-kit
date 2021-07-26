/**
   * Class representing a column
   */
class Column {
  colName;
  cards = [];
  id;

  /**
   * @param {String} colName
   * @param {String} id
   */
  constructor(colName, id) {
    this.colName = colName;
    this.id = id;
  }

  /**
   * Get column name
   * @return {string} column
   */
  get getName() {
    return this.colName;
  }

  /**
   * Get column id
   * @return {string} id - column id
   */
  get getId() {
    return this.id;
  }

  /**
   * Get all cards
   * @return {string} card
   */
  get cards() {
    return this.cards;
  }
}

export default Column;
