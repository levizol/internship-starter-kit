import Card from './Card';

class Column {

    colName;
    card;
    id;

    constructor(colName, id) {
        this.colName = colName;
        this.id = id;
    }

   set addCard(card) {
        this.card = card;
    }

    get getName() {
        return this.colName;
    }

    get getId(){
        return this.id;
    }

}

export default Column;