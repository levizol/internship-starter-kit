/** Class representing the Button. */
class Button {
  state = {
    isActive: false,
  }
  /**
   * Create a button.
   * @param {HTMLElement} element - The button element.
   */
  constructor(element) {
    this.element = element;
    this.handleClick = this.handleClick.bind(this);
  }
  /**
   * Event callback.
   * Toggle the active state.
   */
  handleClick() {
    if (this.state.isActive) {
      this.element.classList.remove('active');
    } else {
      this.element.classList.add('active');
    }
    this.state.isActive = !this.state.isActive;
  }
  /**
   * Register the events.
   */
  registerEvents() {
    this.element.addEventListener('click', this.handleClick);
  }
}

export default Button;
