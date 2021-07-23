import Card from './Card';

class Column {

    colName;
    cards = [];
    id;

    constructor(colName, id) {
        this.colName = colName;
        this.id = id;
    }

    get getName() {
        return this.colName;
    }

    get getId() {
        return this.id;
    }

    get cards() {
        return this.cards;
    }

}

export default Column;