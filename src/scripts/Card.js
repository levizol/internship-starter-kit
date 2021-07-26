/**
 * Class representing a card
 */
class Card {
  /**
   * @param {String} id
   * @param {String} description
   * @param {String} label
   * @param {String} time
   */
  constructor(id, description, label, time) {
    this.id = id;
    this.description = description;
    this.label = label;
    this.time = time;
  }
}

export default Card;
