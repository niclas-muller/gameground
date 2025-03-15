const dimension = 12;
const canvas = document.getElementById("sq_mw_cnvs");

class mwField {

    constructor(x, y, canvas, onclick) {
        this.x = x;
        this.y = y;
        let field = document.createElement("a");
        field.innerHTML = "0";
        field.className = "text-white border-2 border-black hover:bg-yellow-300 hover:cursor-pointer";
        field.onclick = function(){alert("test")};
        canvas.appendChild(field);
        this.field = field;
    }

}

class sqmw {

    constructor(dimension, canvas) {
        this.dimension = dimension;
        this.canvas = canvas;
        this.buildGrid();
    }

    buildGrid() {
        const fields = [];
        for (let x = 0; x < this.dimension; x++) {
            let tmpRow = []; 
            for (let y = 0; y < this.dimension; y++) {
                let tmpField = new mwField(x, y, this.canvas);
                tmpRow.push(tmpField);
            }
            fields.push(tmpRow);
        }
        this.fields = fields;
    }
}

const mw = new sqmw(dimension, canvas);
