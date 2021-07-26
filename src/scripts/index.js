import '../styles/main.css';
import Card from './Card';
import Column from './Column';
import {v4 as uuidv4} from 'uuid';


let columnObj = [new Column('To Do', uuidv4()), new Column('Done', uuidv4())];
const storageItems = JSON.parse(localStorage.getItem('Columns'));
columnObj = storageItems !== null ? storageItems : columnObj;
let ticketNumber = 0;

loadColumns();

/**
 * Load all columns
 */
function loadColumns() {
  document.querySelector('#mainContainer').innerHTML = '';

  for (let i = 0; i < columnObj.length; i++) {
    const tempColumn = document.querySelector('#tempColumn');

    const copyColumn = document.importNode(tempColumn.content, true);

    copyColumn.querySelector('.columnTitle').innerText = columnObj[i].colName;

    copyColumn.querySelector('.column')
        .setAttribute('data-column-id', columnObj[i].id);

    copyColumn.querySelector('.addColumn').setAttribute('data-column-id', i);

    if (i === 0) {
      copyColumn.querySelector('.editColumn .edit').remove();
      copyColumn.querySelector('.columnHeader').classList.add('first');
    }

    if (i === columnObj.length - 1) {
      copyColumn.querySelector('.editColumn').remove();
      copyColumn.querySelector('.columnHeader').classList.add('last');
    }


    document.querySelector('#mainContainer').appendChild(copyColumn);

    if (columnObj[i].cards.length !== 0) {
      for (let j = 0; j < columnObj[i].cards.length; j++) {
        const tempCard = document.querySelector('#tempCard');

        const copyCard = document.importNode(tempCard.content, true);

        copyCard.querySelector('.issueNumber')
            .innerText = columnObj[i].cards[j].id;
        copyCard.querySelector('.cardName')
            .innerText = columnObj[i].cards[j].description;
        copyCard.querySelector('.filter')
            .innerText = columnObj[i].cards[j].label;
        copyCard.querySelector('.remainingTime')
            .innerText = columnObj[i].cards[j].time;

        document.querySelectorAll('.columnBody')[0].appendChild(copyCard);
      }
    }
  }

  localStorage.setItem('Columns', JSON.stringify(columnObj));
}


// Add new column
document.addEventListener('click', (event) => {
  if (event.toElement.className === 'addColumn') {
    const columnName = document.querySelector('.addColumnBtn');
    const rect = event.target.getBoundingClientRect();

    columnName.style.display = 'block';
    columnName.style.position = 'absolute';
    columnName.style.top = rect.top + 'px';
    columnName.style.left = (rect.left + 20) + 'px';

    const columnID = event.target.getAttribute('data-column-id');

    document.querySelector('.add').addEventListener('click', () => {
      const columnName = document.querySelector('.colName');

      const column = new Column(columnName.value, uuidv4());

      // Push the new column in the columns array
      columnObj.splice((+columnID + 1), 0, column);

      columnName.value = '';
      document.querySelector('.addColumnBtn').style.display = 'none';

      document.querySelector('#mainContainer').innerHTML = '';

      loadColumns();
    }, {once: true});
  }
});


// Open Ticket
document.querySelectorAll('.column')[0].addEventListener('dblclick', () => {
  console.log('double click');
  document.querySelector('#ticketWrapper').style.display = 'block';
});

// Create ticket
document.querySelector('.createTicket').addEventListener('click', () => {
  document.querySelector('#ticketWrapper').style.display = 'none';

  const ticketDescription = document.querySelector('.ticketTitle');
  const ticketFilter = document.querySelector('.ticketFilter');
  const estimatedTime = document.querySelector('.ticketEstimatedTime');

  const card = new Card('Issue - ' + ticketNumber,
      ticketDescription.value,
      ticketFilter.innerText,
      estimatedTime.value);

  ticketNumber++;

  columnObj[0].cards.push(card);

  localStorage.clear();

  localStorage.setItem('Columns', JSON.stringify(columnObj));

  loadColumns();
});

// Cancel ticket
document.querySelector('.cancelTicket').addEventListener('click', () => {
  document.querySelector('#ticketWrapper').style.display = 'none';
});
