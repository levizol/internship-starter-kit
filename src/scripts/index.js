import '../styles/main.css';
// import Button from './Button';
// import CallToAction from './CallToAction';

// const button = new Button(document.querySelector('.button'));
// const cta = new CallToAction(document.querySelector('.button-cta'));

// button.registerEvents();
// cta.registerEvents();
// cta.changeBgColor();


// const toDoColumn = document.querySelector('.toDo');

// if (toDoColumn !== null){
//   toDoColumn.addEventListener('dblclick', function() {
//     console.log(toDoColumn);
//     console.log('apelez fct openmodal');
//     openModal();
//   });

// }

const modal = document.getElementById('modal');

/**
  * Open Modal
  *
*/
function openModal() {
  modal.style.display = 'block';
}

const closeIcon = document.querySelector('.close');
closeIcon.addEventListener('click', function() {
  modal.style.display = 'none';
});


const ticketNameInp = document.getElementById('ticketName');
const descriptionInp = document.getElementById('description');

let ticketID;
let ticketName;
let description;

/**
  * Save Tickets in localStorage
  *
*/
function saveTicket() {
  let tickets = [];
  ticketName = ticketNameInp.value;
  description = descriptionInp.value;

  let id = 1;
  const idFromLocalStorage = JSON.parse(localStorage.getItem('JiraID'));
  if (idFromLocalStorage !== null) {
    id = idFromLocalStorage + 1;
  }

  localStorage.setItem('JiraID', JSON.stringify(id));

  ticketID = `JIRA-${id}`;
  const obj =
    {name: ticketName, description: description, id: ticketID, status: 'To Do'};
  const objInLocalStorage = JSON.parse(localStorage.getItem('JiraTickets'));


  if (objInLocalStorage !== null) {
    tickets = objInLocalStorage;
  }


  tickets.push(obj);
  localStorage.setItem('JiraTickets', JSON.stringify(tickets));
  // displayTicket(ticketID, ticketName, description)
}

const saveBtn = document.getElementById('saveTicket');

saveBtn.onclick = function() {
  saveTicket();
};

/**
  * Display Tickets from localstorage
  *
*/
function displayTickets() {
  const objInLocalStorage = JSON.parse(localStorage.getItem('JiraTickets'));


  if (objInLocalStorage !== null) {
    for ( let i=0; i <= objInLocalStorage.length - 1; i++) {
      const ticketName = objInLocalStorage[i].name;
      const ticketID = objInLocalStorage[i].id;
      const ticketDescription = objInLocalStorage[i].description;
      const ticketStatus = objInLocalStorage[i].status;

      // iau toate tichetele si fac display in fct de
      // coloana in care e in localstorage
      const createStatusClass = ticketStatus.charAt(0).toLowerCase() +
      ticketStatus.slice(1).replaceAll(' ', '');

      const insertInRightColumn =
      document.querySelector(`.${createStatusClass}-content`);

      const newToDoDiv = document.createElement('div'); // create new ToDoDiv
      newToDoDiv.classList.add('newToDo'); // add class
      newToDoDiv.setAttribute('draggable', 'true');
      newToDoDiv.setAttribute('data-id', ticketID.split('-')[1]);
      const newToDoIdDiv = document.createElement('div');
      newToDoIdDiv.classList.add('newToDo-ID');
      const newToDoNameDiv = document.createElement('div');
      newToDoNameDiv.classList.add('newTodo-name');
      const newToDoDescDiv = document.createElement('div');
      newToDoDescDiv.classList.add('newTodo-description');


      insertInRightColumn
          .insertBefore(newToDoDiv, insertInRightColumn.childNodes[0]);
      newToDoDiv.insertBefore(newToDoIdDiv, newToDoDiv.childNodes[0]);
      newToDoDiv.insertBefore(newToDoNameDiv, newToDoNameDiv.childNodes[0]);
      newToDoDiv.insertBefore(newToDoDescDiv, newToDoDescDiv.childNodes[0]);

      const newToDoID = document.createTextNode(ticketID); // give content
      const newToDoName = document.createTextNode(ticketName);
      const newToDoDesc = document.createTextNode(ticketDescription);

      newToDoIdDiv.appendChild(newToDoID); // add text node to child
      newToDoNameDiv.appendChild(newToDoName);
      newToDoDescDiv.appendChild(newToDoDesc);
    }
  } else {
    console.log('No tickets to display');
  }
}

displayColumns();
displayTickets();


const toDoColumn = document.querySelector('.toDo');

if (toDoColumn !== null) {
  toDoColumn.addEventListener('dblclick', function() {
    console.log(toDoColumn);
    console.log('apelez fct openmodal');
    openModal();
  });
}


// DRAGGABLE TODOS

const draggableToDos = document.querySelectorAll('.newToDo');
if (draggableToDos.length !== 0) {
  for (const [i, draggableToDo] of draggableToDos.entries()) {
    draggableToDo.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', draggableToDos[i].dataset.id);
      // console.log(draggableToDos[i].dataset.id)
    });
  }


  for (const dropZone of document.querySelectorAll('.content-column')) {
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      console.log('s-a tras elementul in noua zona');
    });

    dropZone.addEventListener('drop', (e) => {
      console.log('elementul e lasat in noua zona');
      e.preventDefault();
      console.log(e);

      const droppedElId = e.dataTransfer.getData('text/plain');
      const droppedEl = document.querySelector(`[data-id="${droppedElId}"]`);

      console.log(droppedEl);
      console.log(droppedElId);
      dropZone.appendChild(droppedEl);


      const status =
      droppedEl.parentNode.parentNode.firstElementChild.textContent;
      updateTicketStatus(droppedElId, status);
    });
  }
}


/**
   * Remember ticket column
   *
   * @param {number} droppedElId
   * @param {string} status
   */
function updateTicketStatus(droppedElId, status) {
  const allTickets = JSON.parse(localStorage.getItem('JiraTickets'));

  for (const [index, ticket] of allTickets.entries()) {
    if (ticket.id === `JIRA-${droppedElId}`) {
      ticket.status = status;
      allTickets.splice(index, 1);
      allTickets.push(ticket);
      break;
    }
  }

  localStorage.setItem('JiraTickets', JSON.stringify(allTickets));
}


/**
   * Add new column
   *
   */
function addNewColumn() {
  const titles = document.querySelectorAll('h4.title');
  for (const [index, title] of titles.entries()) {
    title.addEventListener('mouseenter', function(e) {
      const addSpan = document.createElement('span');

      console.log(title.textContent);

      if (title.textContent !== 'To Do' && title.textContent !== 'Done') {
        const addSpan2 = document.createElement('span');
        addSpan2.classList.add('fas', 'fa-trash-alt');
        title.appendChild(addSpan2);
        const newCreatedSpanDelete =
        document.querySelector('span.fas.fa-trash-alt');
        newCreatedSpanDelete.addEventListener('click', function() {
          deleteColumn(e);
        });
      }


      addSpan.classList.add('fas', 'fa-plus');
      title.appendChild(addSpan);
      const currentDivHovering = e.target.parentNode;


      // onclick
      addSpan.addEventListener('click', function() {
        console.log('click on plus');
        // insert column in html
        const newColumn = document.createElement('div');
        const jiraBoard = document.getElementById('jira-board');


        jiraBoard.insertBefore(newColumn, currentDivHovering.nextSibling);
        newColumn.classList.add('newColumn'); // add class to use later
        const newCreatedCol =
        document.querySelector('newColumn'); // find defined class

        // enter column name

        const inpColName = document.createElement('input'); // create input
        inpColName.type = 'text';
        inpColName.name = 'input column name';
        newColumn.insertBefore(inpColName, newCreatedCol);

        const inpSaveBtn = document.createElement('input');
        inpSaveBtn.type = 'button';
        inpSaveBtn.value = 'Add Column';
        newColumn.insertBefore(inpSaveBtn, inpColName.nextSibling);

        // dupa ce da pe click, ia valoarea din input
        inpSaveBtn.addEventListener('click', function() {
          const inpValue = inpColName.value;
          // formeaza numele pt noua clasa
          const newClassName = inpValue.charAt(0).toLowerCase() +
          inpValue.slice(1).replaceAll(' ', '');
          newColumn.classList.add(newClassName);
          newColumn.classList.remove('newColumn'); // sterge vechea clasa


          // remove input
          newColumn.removeChild(inpColName); // remove input
          newColumn.removeChild(inpSaveBtn); // remove save btn

          // show new title + add the rest of the html elements styling
          const newTitle = document.createElement('h4'); // add title
          newTitle.classList.add('title');
          newColumn.insertBefore(newTitle, null);

          console.log(inpValue);
          document.querySelector(`.${newClassName} .title`)
              .innerHTML = inpValue; // insert Title from input to show on html

          // add content column that has styling
          const newContent = document.createElement('div');
          newContent.classList.add(`${newClassName}-content`, 'content-column');
          newColumn.insertBefore(newContent, null);

          // createColumns(inpValue, position);
          createColumns(inpValue, index);
          location.reload();
        });
      });
    });


    // remove span on mouseleave
    title.addEventListener('mouseleave', function() {
      const newCreatedSpan = document.querySelector('span.fas.fa-plus');
      title.removeChild(newCreatedSpan);

      const newCreatedSpanDelete =
      document.querySelector('span.fas.fa-trash-alt');
      if (newCreatedSpanDelete !== null) {
        title.removeChild(newCreatedSpanDelete);
      }
    });
  }
}
addNewColumn();


/**
   * Save Column to localstorage
   *
   * @param {string} status Column Name
   * @param {number} position Column position
   */
function createColumns(status, position) {
  let columns = [];
  const columnsFromLocalStorage =
  JSON.parse(localStorage.getItem('JiraColumns'));
  const obj = {status: status};
  if (columnsFromLocalStorage !== null) {
    columns = columnsFromLocalStorage;
  }
  columns.splice(position+1, 0, obj);
  localStorage.setItem('JiraColumns', JSON.stringify(columns));
  // displayTicket(ticketID, ticketName, description)
}

/**
   *Display Columns from LocalStorage
   *
   *
*/
function displayColumns() {
  const columnsFromLocalStorage =
  JSON.parse(localStorage.getItem('JiraColumns'));

  if (columnsFromLocalStorage !== null) {
    for ( let i=0; i <= columnsFromLocalStorage.length - 1; i++) {
      const columnStatus = columnsFromLocalStorage[i].status;

      // create columns to display
      const newColumn = document.createElement('div');
      const jiraBoard = document.getElementById('jira-board');

      const newClassName = columnStatus.charAt(0).toLowerCase() +
      columnStatus.slice(1).replaceAll(' ', '');


      // const currentDivHovering = target.parentNode;
      // console.log(currentDivHovering)
      jiraBoard.insertBefore(newColumn, null);
      newColumn.classList.add(newClassName);


      // show new title + add the rest of the html elements styling
      const newTitle = document.createElement('h4'); // add title
      newTitle.classList.add('title');
      newColumn.insertBefore(newTitle, null);

      // insert Title from input to show on html
      document.querySelector(`.${newClassName} .title`)
          .innerHTML = columnStatus;


      // add content column that has styling
      const newContent = document.createElement('div');
      newContent.classList.add(`${newClassName}-content`, 'content-column');

      newColumn.insertBefore(newContent, null);
    }
  } else {
    // console.log('No columns to display');
    const obj = [{status: 'To Do', position: 0}, {status: 'Done', position: 1}];
    localStorage.setItem('JiraColumns', JSON.stringify(obj));
    displayColumns();
  }
}

/**
   *Display Columns from LocalStorage
   * @param {event} e
   *
*/
function deleteColumn(e) {
  console.log('apasa delete');

  const currentDivHovering = e.target.innerText;
  console.log(currentDivHovering);
  // delete from localStorage
  const columnsFromLocalStorage =
  JSON.parse(localStorage.getItem('JiraColumns'));

  for (const [i] of columnsFromLocalStorage.entries()) {
    if (currentDivHovering === columnsFromLocalStorage[i].status) {
      // delete from localStorage
      console.log(columnsFromLocalStorage[i]);
      columnsFromLocalStorage.splice(i, 1);


      localStorage.setItem('JiraColumns',
          JSON.stringify(columnsFromLocalStorage));
      // console.log(columnsFromLocalStorage[i])
    }

    // / COLUMN DELETION functionality (& update localstorage)
    // retrieve all columns name from the page
    const columnTicketElements =
    document.querySelectorAll(`[class~=
      ${currentDivHovering}
      -content]:nth-child(2) div[class='newToDo-ID']`);
    const columnTickets = [];
    for (const columnTicketElement of columnTicketElements) {
      columnTickets.push(columnTicketElement.innerText);
    }

    // /daca sunt tichete pe col ce se sterge sa fie mutate pe col anterioara
    if (columnTickets.length !== 0) {
      const ticketsFromLocalStorage =
      JSON.parse(localStorage.getItem('JiraTickets'));
      // ne uitam la tichetele din col pe care o stergem
      for (const columnTicket of columnTickets) {
        // pt fiecare tichet din localstorage
        for (const [index, localStorageTicket]
          of ticketsFromLocalStorage.entries()) {
          if (localStorageTicket.id == columnTicket) {
          // iau coloanele din localstorage
            const columnsFromLocalStorage =
            JSON.parse(localStorage.getItem('JiraColumns'));
            // iterez pana gasesc coloana care se sterge
            for (const [i, column] of
              columnsFromLocalStorage.entries()) {
              // iau numele coloanei de la indexul anterior si il
              // setez ca si status pt fiecare tichet din coloana ce se sterge
              if (column.status === currentDivHovering) {
                localStorageTicket.status = columnsFromLocalStorage[i-1].status;
              }
            }

            // localStorageTicket.status = 'To Do'
            ticketsFromLocalStorage.splice(index, 1);
            ticketsFromLocalStorage.push(localStorageTicket);
            localStorage.setItem('JiraTickets',
                JSON.stringify(ticketsFromLocalStorage));
          }
        }
      }
    }
    location.reload();
  }
}

/**
   *Create a modal for Ticket Informations
   *
*/
function ticketModal() {
  const modal2 = document.getElementById('modal2');
  const allTickets = document.querySelectorAll('.newToDo');

  for (const ticket of allTickets) {
    ticket.addEventListener('dblclick', function(e) {
      const target = e.target.parentNode.firstElementChild.innerText;
      console.log(target);
      modal2.style.display = 'block';

      // get info from localstorage
      const tickets = JSON.parse(localStorage.getItem('JiraTickets'));

      for (const ticket of tickets) {
        if (ticket.id === target) {
          document.querySelector('.ticket-nr').textContent = ticket.id;
          document.querySelector('.ticket-name').textContent = ticket.name;
          document.querySelector('.status').textContent = ticket.status;
          // document.querySelector('.labels').textContent = ticket.description;
        }
      }


      // insert info in html
    });
  }

  const closeIcon = document.querySelector('#modal2 .close');
  closeIcon.addEventListener('click', function() {
    modal2.style.display = 'none';
  });
}
ticketModal();

