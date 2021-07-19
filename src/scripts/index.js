import '../styles/main.css';
import Button from './Button';
import CallToAction from './CallToAction';

const button = new Button(document.querySelector('.button'));
const cta = new CallToAction(document.querySelector('.button-cta'));

button.registerEvents();
cta.registerEvents();
cta.changeBgColor();
