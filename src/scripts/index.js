import '../styles/main.css';
import Card from './Card';
import Column from './Column';
import { v4 as uuidv4 } from 'uuid';


let columnObj = [new Column("To Do", uuidv4()), new Column("Done", uuidv4())];
columnObj = JSON.parse(localStorage.getItem('Columns')) !== null ? JSON.parse(localStorage.getItem('Columns')) : columnObj;
let ticketNumber = 1;

loadColumns();

// Load all columns
function loadColumns() {

    document.querySelector("#mainContainer").innerHTML = '';

    for (let i = 0; i < columnObj.length; i++) {

        let tempColumn = document.querySelector("#tempColumn");

        let copyColumn = document.importNode(tempColumn.content, true);

        copyColumn.querySelector('.columnTitle').innerText = columnObj[i].colName;

        copyColumn.querySelector('.column').setAttribute('data-column-id', columnObj[i].id);

        copyColumn.querySelector('.addColumn').setAttribute('data-column-id', i);

        if (i === 0) {
            copyColumn.querySelector(".editColumn .edit").remove();
            copyColumn.querySelector(".columnHeader").classList.add("first");
        }

        if (i === columnObj.length - 1) {
            copyColumn.querySelector(".editColumn").remove();
            copyColumn.querySelector(".columnHeader").classList.add("last");
        }


        document.querySelector("#mainContainer").appendChild(copyColumn);

        if (columnObj[i].cards.length !== 0) {

            for (let j = 0; j < columnObj[i].cards.length; j++) {

                let tempCard = document.querySelector("#tempCard");

                let copyCard = document.importNode(tempCard.content, true);

                copyCard.querySelector('.issueNumber').innerText = columnObj[i].cards[j].id;
                copyCard.querySelector('.cardName').innerText = columnObj[i].cards[j].description;
                copyCard.querySelector('.filter').innerText = columnObj[i].cards[j].label;
                copyCard.querySelector('.remainingTime').innerText = columnObj[i].cards[j].time;

                document.querySelectorAll('.columnBody')[0].appendChild(copyCard);

            }

        }

    }

    localStorage.setItem('Columns', JSON.stringify(columnObj));
}


// Add new column
document.addEventListener('click', (event) => {

    if (event.toElement.className === 'addColumn') {

        let columnName = document.querySelector('.addColumnBtn');
        let rect = event.target.getBoundingClientRect();

        columnName.style.display = 'block';
        columnName.style.position = 'absolute';
        columnName.style.top = rect.top + 'px';
        columnName.style.left = (rect.left + 20) + 'px';

        let columnID = event.target.getAttribute('data-column-id');

        document.querySelector('.add').addEventListener('click', () => {

            let columnName = document.querySelector('.colName');

            // Push the new column in the columns array 
            columnObj.splice((+columnID + 1), 0, new Column(columnName.value, uuidv4()));

            columnName.value = '';
            document.querySelector('.addColumnBtn').style.display = 'none';

            document.querySelector("#mainContainer").innerHTML = '';

            loadColumns();

        }, { once: true });
    }
});


// Open Ticket
document.querySelectorAll('.column')[0].addEventListener('dblclick', () => {
    console.log('double click');
    document.querySelector("#ticketWrapper").style.display = 'block';
});

// Create ticket
document.querySelector('.createTicket').addEventListener('click', () => {
    document.querySelector('#ticketWrapper').style.display = 'none';

    let ticketDescription = document.querySelector('.ticketTitle');
    let ticketFilter = document.querySelector('.ticketFilter');
    let estimatedTime = document.querySelector('.ticketEstimatedTime');

    columnObj[0].cards.push(new Card('Issue - ' + ticketNumber, ticketDescription.value, ticketFilter.innerText, estimatedTime.value));

    ticketNumber++;

    localStorage.clear();

    localStorage.setItem('Columns', JSON.stringify(columnObj));

    loadColumns();

})

// Cancel ticket
document.querySelector('.cancelTicket').addEventListener('click', () => {
    document.querySelector('#ticketWrapper').style.display = 'none';
})