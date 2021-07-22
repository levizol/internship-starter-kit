import '../styles/main.css';
import Card from './Card';
import Column from './Column';
import Button from './Button';
import { v4 as uuidv4 } from 'uuid';



// import CallToAction from './CallToAction';

// const button = new Button(document.querySelector('.button'));
// const cta = new CallToAction(document.querySelector('.button-cta'));

// button.registerEvents();
// cta.registerEvents();
// cta.changeBgColor();


let columnObj = [new Column("To Do", uuidv4()), new Column("Done", uuidv4())];

columnObj = JSON.parse(localStorage.getItem('Columns'));

console.log(columnObj);

loadColumns();

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

        console.log(columnID);

        document.querySelector('.add').addEventListener('click', function () {

            let columnName = document.querySelector('.colName');

            // Push the new column in the columns array 
            columnObj.splice((+columnID + 1), 0, new Column(columnName.value, uuidv4()));

            console.log(columnObj);

            columnName.value = '';
            document.querySelector('.addColumnBtn').style.display = 'none';

            document.querySelector("#mainContainer").innerHTML = '';

            loadColumns();

        }, { once: true });
    }
});


function loadColumns() {

    for (let [index, column] of columnObj.entries()) {

        let tempColumn = document.querySelector("#tempColumn");

        let copyColumn = document.importNode(tempColumn.content, true);

        console.log(column);

        copyColumn.querySelector('.columnTitle').innerText = column.colName;

        copyColumn.querySelector('.column').setAttribute('data-column-id', column.id);

        copyColumn.querySelector('.addColumn').setAttribute('data-column-id', index);

        if (index === 0) {
            copyColumn.querySelector(".editColumn .edit").remove();
            copyColumn.querySelector(".columnHeader").classList.add("first");
        }

        if (index === columnObj.length - 1) {
            copyColumn.querySelector(".editColumn").remove();
            copyColumn.querySelector(".columnHeader").classList.add("last");
        }


        document.querySelector("#mainContainer").appendChild(copyColumn);

    }

    localStorage.setItem('Columns', JSON.stringify(columnObj));

}
