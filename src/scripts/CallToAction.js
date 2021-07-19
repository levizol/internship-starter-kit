import Button from './Button';
/** Class representing the CTA Button.
 *  @extends Button
 */
class CallToAction extends Button {
  defaultColor = '#d7d149'
  /**
 * Create a button.
 * @param {HTMLElement} element - The button element.
 */
  constructor(element) {
    super(element);
  }
  /**
   * Change the background color.
   * @param {string} color - The color code.
   */
  changeBgColor(color = this.defaultColor) {
    this.element.style.backgroundColor = color;
  }
}

export default CallToAction;
