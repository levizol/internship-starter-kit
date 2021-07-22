/* eslint-disable max-len *//* eslint-disable require-jsdoc *//* eslint-disable no-unused-vars *//* eslint-disable no-invalid-this *//* eslint-disable linebreak-style */


class Card {
  constructor(title, remaining, number) {
    this.title = title;
    this.estimated = remaining;
    this.remaining = remaining;
    this.number = number;
    this.visibility = 1;
  }
}

let lastCard = 0;

if (!localStorage.getItem('colnr')) {
  localStorage.setItem('colnr', 2);
  let titles = [];
  titles.push(0);
  titles.push('TO DO');
  titles.push('DONE');
  titles = JSON.stringify(titles);
  localStorage.setItem('titles', titles);
} else {
  let c = localStorage.getItem('colnr');
  if (c!=='2') {
    localStorage.setItem('colnr', 2);
    c = parseInt(c);
    let titles = localStorage.getItem('titles');
    titles = JSON.parse(titles);
    for (let i=3; i<=c; i++) {
      addColumnatFirst();
    }
    for (let i=2; i<c; i++) {
      document.querySelector('#col'+i)
          .querySelector('.name').innerHTML = titles[i];
    }
  }
}

if (!localStorage.getItem('cardnr')) {
  let whereArray = [];
  whereArray.push(0);
  localStorage.setItem('cardnr', 0);
  whereArray = JSON.stringify(whereArray);
  localStorage.setItem('parentofCards', whereArray);
} else {
  let whereArray = localStorage.getItem('parentofCards');
  whereArray = JSON.parse(whereArray);
  let cards = localStorage.getItem('cardDetails');
  cards = JSON.parse(cards);
  for (let i=1; i<whereArray.length; i++) {
    saveCardatFirst(i, whereArray[i], cards[i].title, cards[i].remaining);
  }
}

document.querySelector('.information button')
    .addEventListener('click', deleteCard);

document.querySelector('.det')
    .addEventListener('click', detdet);


if (!localStorage.getItem('cardDetails')) {
  let cardDetails = [];
  cardDetails.push(0);
  cardDetails = JSON.stringify(cardDetails);
  localStorage.setItem('cardDetails', cardDetails);
}

const columLabels1 = document.querySelectorAll('.addition');
columLabels1.forEach( (x) => {
  x.classList.toggle('hide');
  x.addEventListener('click', addColumn);
});

const columLabels2 = document.querySelectorAll('.delete');
columLabels2.forEach( (x) => {
  x.classList.toggle('hide');
  x.addEventListener('click', deleteColumn);
});

const columLabels = document.querySelectorAll('.label');
columLabels.forEach( (x) => {
  x.onmouseover = function() {
    const parent = x.parentElement;
    const sibling = parent.childNodes;
    sibling[1].classList.toggle('hide');
  };

  x.onmouseout = function() {
    const parent = x.parentElement;
    const sibling = parent.childNodes;
    sibling[1].classList.toggle('hide');
  };
});

const columnData = document.querySelectorAll('.data');
columnData.forEach((x)=>{
  x.addEventListener('dblclick', addCard);
});


const cards = document.querySelectorAll('.card');
cards.forEach((x)=>{
  x.addEventListener('dblclick', showDet);
});

const hideElement = document.querySelectorAll('.close');
hideElement .forEach((x)=>{
  x.addEventListener('click', function() {
    x.parentElement.parentElement.classList.toggle('hide');
  });
});

updateNr();

document.querySelector('#addcard').addEventListener('click', saveCard);
/** *
 *
 */
function addCard() {
  document.querySelector('.popup').classList.toggle('hide');
  // eslint-disable-next-line no-invalid-this
  lastdbClicked = this;
}

/**
 *insert a node after an existing node
 * @param {*} referenceNode -where to put
 * @param {*} newNode -what node to put
 */
function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

/**
 * insert a column to the right
 */
function addColumn() {
  let colnr = parseInt( localStorage.getItem('colnr') );
  colnr = colnr+1;
  localStorage.setItem('colnr', colnr);

  where = this.parentElement.parentElement;
  const newNode = document.createElement('div');
  newNode.setAttribute('class', 'column');


  const containerNode = document.createElement('div');
  containerNode.setAttribute('class', 'col-container-flex');

  const labela = document.createElement('div');
  labela.classList.toggle('label');
  labela.classList.toggle('addition');
  labela.classList.toggle('hide');
  labela.addEventListener('click', addColumn);

  const labeld = document.createElement('div');
  labeld.classList.toggle('label');
  labeld.classList.toggle('delete');
  labeld.classList.toggle('hide');
  labeld.addEventListener('click', deleteColumn);

  const i = document.createElement('i');
  i.classList.toggle('far');
  i.classList.toggle('fa-plus-square');

  const j = document.createElement('i');
  j.classList.toggle('far');
  j.classList.toggle('fa-minus-square');

  labela.appendChild(i);
  labeld.appendChild(j);

  const label = document.createElement('div');
  const nr = document.createElement('div');
  nr.classList.toggle('nr');


  label.classList.toggle('label');
  label.innerHTML = 'New column';
  label.appendChild(nr);

  label.addEventListener('dblclick', changeName);
  label.onmouseover = function() {
    labela.classList.toggle('hide');
    labeld.classList.toggle('hide');
  };

  label.onmoseout = function() {
    labela.classList.toggle('hide');
    labeld.classList.toggle('hide');
  };


  containerNode.appendChild(labela);
  containerNode.appendChild(labeld);
  containerNode.appendChild(label);
  const dataNode = document.createElement('div');
  dataNode.classList.toggle('data');
  dataNode.setAttribute('ondrop', 'drop(event)');
  dataNode.setAttribute('ondragover', 'allowDrop(event)');
  dataNode.addEventListener('dblclick', addCard);
  /** ondrop="drop(event)" ondragover="allowDrop(event)"*/

  newNode.appendChild(containerNode);


  newNode.appendChild(dataNode);
  let before = where.getAttribute('id');

  before = before.substring(3, before.length);

  before = parseInt(before);

  let whereArray = localStorage.getItem('parentofCards');
  whereArray = JSON.parse(whereArray);

  let titles = localStorage.getItem('titles');
  titles = JSON.parse(titles);

  titles.push(0);
  for (let i=colnr-1; i>before; i--) {
    const current = document.getElementById('col' + i);
    current.setAttribute('id', `col${i+1}`);

    for (let j=1; j<whereArray.length; j++) {
      if (whereArray[j]==i) whereArray[j] = j+1;
    }

    titles[i+1] = titles[i];
  }

  titles[before+1]='New column';

  titles = JSON.stringify(titles);
  localStorage.setItem('titles', titles);


  whereArray = JSON.stringify(whereArray);
  localStorage.setItem('parentofCards', whereArray);


  newNode.setAttribute('id', `col${before+1}`);

  dataNode.innerHTML = ' ';
  insertAfter( where, newNode);
  updateNr();
}


/**
 *
 */
function addColumnatFirst() {
  let colnr = parseInt( localStorage.getItem('colnr') );
  colnr = colnr+1;
  localStorage.setItem('colnr', colnr);

  where = document.querySelector('#col1');
  const newNode = document.createElement('div');
  newNode.setAttribute('class', 'column');


  const containerNode = document.createElement('div');
  containerNode.setAttribute('class', 'col-container-flex');

  const labela = document.createElement('div');
  labela.classList.toggle('label');
  labela.classList.toggle('addition');
  labela.addEventListener('click', addColumn);

  const labeld = document.createElement('div');
  labeld.classList.toggle('label');
  labeld.classList.toggle('delete');
  labeld.addEventListener('click', deleteColumn);


  const i = document.createElement('i');
  i.classList.toggle('far');
  i.classList.toggle('fa-plus-square');

  const j = document.createElement('i');
  j.classList.toggle('far');
  j.classList.toggle('fa-minus-square');

  labela.appendChild(i);
  labeld.appendChild(j);

  const nr = document.createElement('div');
  nr.classList.toggle('nr');

  const label = document.createElement('div');
  label.classList.toggle('label');
  label.innerHTML = 'New column';
  label.classList.toggle('name');
  label.appendChild(nr);
  label.addEventListener('dblclick', changeName);
  labela.classList.toggle('hide');

  label.onmouseover = function() {
    labela.classList.toggle('hide');
    labeld.classList.toggle('hide');
  };

  label.onmoseout = function() {
    labela.classList.toggle('hide');
    labeld.classList.toggle('hide');
  };


  containerNode.appendChild(labela);
  containerNode.appendChild(labeld);

  containerNode.appendChild(label);
  const dataNode = document.createElement('div');
  dataNode.classList.toggle('data');
  dataNode.setAttribute('ondrop', 'drop(event)');
  dataNode.setAttribute('ondragover', 'allowDrop(event)');
  /** ondrop="drop(event)" ondragover="allowDrop(event)"*/

  newNode.appendChild(containerNode);
  newNode.appendChild(dataNode);
  let before = where.getAttribute('id');

  before = before.substring(3, before.length);

  before = parseInt(before);

  for (let i=colnr-1; i>before; i--) {
    const current = document.getElementById('col' + i);
    current.setAttribute('id', `col${i+1}`);
  }
  newNode.setAttribute('id', `col${before+1}`);


  dataNode.innerHTML = ' ';
  insertAfter( where, newNode);
}


/*
 * hide an element
*/
function hide() {
  this.classList.toggle('hide');
}

/**
 * allow drop
 * @param {*} ev - event
 */
function allowDrop(ev) {
  ev.preventDefault();
  updateNr();
}

/**
 *
 * @param {*} ev
 */
function drag(ev) {
  ev.dataTransfer.setData('text', ev.target.id);
}

/**
 *
 * @param {*} ev
 */
function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData('text');
  ev.target.appendChild(document.getElementById(data));
}

/** *
 * details on the right showing
 */
function showDet() {
  document.querySelector('.information').classList.toggle('hide');
  document.querySelector('.popup').classList.toggle('hide');
  document.querySelector('.col-container-flex').classList.toggle('goLeft');

  let id = this.getAttribute('id');
  id = id.substring(4, id.length);
  id = parseInt(id);

  lastCard = id;
  let cards = localStorage.getItem('cardDetails');
  cards = JSON.parse(cards);

  document.querySelector('.information .title').innerHTML = cards[id].title;
  document.querySelector('.information #remaining2')
      .value = cards[id].estimated;

  let titles = localStorage.getItem('titles');
  titles = JSON.parse(titles);

  let parents = localStorage.getItem('parentofCards');
  parents = JSON.parse(parents);
  document.querySelector('.information .st').innerHTML = titles[parents[id]];

  const colnr = localStorage.getItem('colnr');
  if (parents[id] === 1 || parents[id]===colnr ) {
    document.querySelector('.information .st').style.backgroundColor = 'green';
  } else {
    document.querySelector('.information .st').style.backgroundColor = 'blue';
  }
}


document.addEventListener(
    'click',
    function(event) {
      if (!document.querySelector('.information').classList.contains('hide')) {
        if (!event.target.matches('.information') &&
        !event.target.matches('#remaining2') &&
        !event.target.matches('.det')) {
          let cards = localStorage.getItem('cardDetails');
          cards = JSON.parse(cards);
          const rem = document.getElementById('remaining2').value;
          if (rem!== cards[lastCard].remaining) {
            cards[lastCard].remaining = rem;
            document.querySelector('#card'+lastCard +' .remaining')
                .innerHTML = rem;
            cards = JSON.stringify(cards);
            localStorage.setItem('cardDetails', cards);
          }
          document.querySelector('.information').classList.toggle('hide');
          document.querySelector('.col-container-flex').
              classList.toggle('goLeft');
        }
      }

      if (!document.querySelector('.popup').classList.contains('hide')) {
        if (!event.target.matches('.popup') &&
        !event.target.matches('#title') &&
        !event.target.matches('#remaining') &&
        !event.target.matches('#titleCard') &&
        !event.target.matches('#addcard')) {
          saveCard();
        }
      }
    },
);


/* eslint-disable linebreak-style */
/** *
 *
 */
function saveCard() {
  let cardIds = localStorage.getItem('cardnr');
  cardIds ++;
  const title = document.querySelector('#titleCard').value;
  document.querySelector('#titleCard').value = '';
  if (title.length<3) {
    document.querySelector('.error').innerHTML = '3 charachters min';
    return;
  } else document.querySelector('.error').innerHTML = '';

  let remaining = document.querySelector('#remaining').value;
  document.querySelector('#remaining').value='';
  if (remaining == '') remaining = 'Unestimated';


  /** last dbclickedhez hozza kene adjam a kartyat */
  const cardNode = document.querySelector('#card');
  const newNode = cardNode.cloneNode(true);
  newNode.setAttribute('id', 'card' + cardIds);
  newNode.classList.toggle('hide');

  newNode.querySelector('.title').innerHTML = title;
  newNode.querySelector('.remaining').innerHTML = remaining;

  let whereArray = localStorage.getItem('parentofCards');
  whereArray = JSON.parse(whereArray);
  const card = new Card(title, remaining, whereArray.length-1);

  newNode.addEventListener('dblclick', showDet);


  lastdbClicked.appendChild(newNode);


  parent = lastdbClicked.parentElement.getAttribute('id');
  parent = parseInt(parent.substring(3, parent.length));


  whereArray.push(parent);


  whereArray = JSON.stringify(whereArray);
  localStorage.setItem('parentofCards', whereArray);
  localStorage.setItem('cardnr', cardIds);

  document.querySelector('.popup').classList.toggle('hide');
  let cards = localStorage.getItem('cardDetails');
  cards = JSON.parse(cards);
  cards.push(card);
  cards = JSON.stringify(cards);
  localStorage.setItem('cardDetails', cards);
  updateNr();
}


/**
 * onliad puts the card where belong
 * @param {*} idCard -card id
 * @param {*} idCol -col id
 * @param {*} tit -title
 * @param {*} rem t*rmemaing
 */
function saveCardatFirst(idCard, idCol, tit, rem) {
  let cards = localStorage.getItem('cardDetails');
  cards = JSON.parse(cards);

  if (cards[idCard].visibility !==0) {
    const title = tit;

    const remaining = rem;


    /** last dbclickedhez hozza kene adjam a kartyat */
    const cardNode = document.querySelector('#card');
    const newNode = cardNode.cloneNode(true);
    newNode.setAttribute('id', 'card' + idCard);
    newNode.classList.toggle('hide');

    let cards = localStorage.getItem('cardDetails');
    cards = JSON.parse(cards);
    newNode.addEventListener('dblclick', showDet, cards[idCard]);
    newNode.querySelector('.title').innerHTML = title;
    newNode.querySelector('.remaining').innerHTML = remaining;

    document.querySelector('#col' + idCol + ' .data').appendChild(newNode);
  }
}


/**
 *
 */
function deleteCard() {
  document.querySelector('#card' + lastCard).classList.toggle('hide');
  let cards = localStorage.getItem('cardDetails');
  cards = JSON.parse(cards);
  cards[lastCard].visibility = 0;
  cards = JSON.stringify(cards);
  localStorage.setItem('cardDetails', cards);
  updateNr();
}

/**
 *
 */
function deleteColumn() {
  const colId = this.parentNode.parentNode.getAttribute('id');
  let col = colId.substring(3, colId.length);
  col = parseInt(col);

  let parents = localStorage.getItem('parentofCards');
  parents = JSON.parse(parents);


  this.parentNode.parentNode.remove();
  let colnr = localStorage.getItem('colnr');
  for (let i=col+1; i<=colnr; i++) {
    const current = document.getElementById('col' + i);
    current.setAttribute('id', `col${i-1}`);
  }


  colnr--;
  localStorage.setItem('colnr', colnr);
  location.reload();
}

/**
 *
 */
function changeName() {
  const name = prompt('Please enter the new column name');

  if (name != null) {
    this.innerHTML = name;
    let colid = this.parentElement.parentElement.getAttribute('id');
    colid = colid.substring(3, colid.length);
    colid = parseInt(colid);

    let titles = localStorage.getItem('titles');
    titles = JSON.parse(titles);
    titles[colid] = name;
    titles = JSON.stringify(titles);
    localStorage.setItem('titles', titles);
  }
}

/**
 *
 */
function detdet() {
  document.querySelector('.information .add')
      .classList.toggle('hide');
}


function updateNr() {
  let cards = localStorage.getItem('cardDetails');
  cards = JSON.parse(cards);
  let colnr = localStorage.getItem('colnr');
  let parents = localStorage.getItem('parentofCards');
  parents = JSON.parse(parents);
  colnr = JSON.parse(colnr);
  for (let i=1; i<=colnr; i++) {
    let nr = 0;
    for (let j=1; j<parents.length; j++) {
      if (parents[j]==i && cards[j].visibility) nr++;
    }
    document.querySelector('#col' + i + ' .nr').innerHTML = nr;
  }
}
