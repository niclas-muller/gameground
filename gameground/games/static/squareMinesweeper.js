/* Global constants */
const dim = 12;
const canvas = document.getElementById("sq_mw_cnvs");
const pointDisplay = document.getElementById("pointDisplay");

/* Prevent showing menu when right-clicking */
document.body.addEventListener("contextmenu", function(evt) {evt.preventDefault(); return false;});

/* Map onclick actions to element differentiated by left-/rightclick */
function mapClickEvents(element, leftClickAction, rightClickAction) {

    function onMouseDown(click) {
        if (click.which == 1) {leftClickAction();}
        else if (click.which == 3) {rightClickAction();}
    }

    element.addEventListener('mousedown', onMouseDown);
}

/* Tailwind CSS definitions */
const clickedClassNames = [
    "text-blue-100 bg-blue-100 text-center border-2 border-blue-100 selection:text-blue-100",
    "bg-blue-200 text-center border-2 border-blue-200 selection:text-black",
    "bg-blue-300 text-center border-2 border-blue-300 selection:text-black",
    "bg-blue-400 text-center border-2 border-blue-400 selection:text-black",
    "bg-blue-500 text-center border-2 border-blue-500 selection:text-black",
    "bg-blue-600 text-center border-2 border-blue-600 selection:text-black",
    "bg-blue-700 text-center border-2 border-blue-700 selection:text-black",
    "bg-blue-800 text-center border-2 border-blue-800 selection:text-black",
    "bg-blue-900 text-center border-2 border-blue-900 selection:text-black"
]

coveredClassName = "text-white text-center border-2 hover:border-yellow-600 hover:cursor-pointer selection:text-white";
markedClassName = "text-white bg-zinc-900 text-center selection:text-white";

/* Main functionalities */

class mwField {

    constructor(x, y, mw) {
        this.x = x;
        this.y = y;
        this.mw = mw;

        this.bomb = false;
        this.hasBeenClicked = false;
        this.numOfAdjBombs = 0;

        let field = document.createElement("a");
        field.innerHTML = "?";
        field.className = coveredClassName;
        field.onclick = () => {mw.processFirstClick(this.x,this.y);}
        this.field = field;

        mw.canvas.appendChild(field);
    }

    placeBomb() {
        this.bomb = true;

        let leftClickAction = () => {
            if (!(this.field.innerHTML == "X")) {
                alert("You lost!");
                window.location.reload();
            }
        }

        let rightClickAction = () => {
            if (this.field.innerHTML == "?") {
                this.field.innerHTML = "X";
                this.field.className = markedClassName;
                this.mw.bombsMarked++;
                pointDisplay.innerHTML = this.mw.maxBombs - this.mw.bombsMarked;
            }
            else if (this.field.innerHTML == "X") {
                this.field.innerHTML = "?";
                this.field.className = coveredClassName;
                this.mw.bombsMarked--;
                pointDisplay.innerHTML = this.mw.maxBombs - this.mw.bombsMarked;
            }
        }

        mapClickEvents(this.field, leftClickAction, rightClickAction);
    }

    countAdjBombs() {

        /* upper left corner */
        if (this.x == 0 && this.y == 0) {
            if (this.mw.fields[this.x+0][this.y+1].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x+1][this.y+1].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x+1][this.y+0].bomb) {this.numOfAdjBombs++;}
        }

        /* top border */
        else if (this.x == 0 && this.y > 0 && this.y < this.mw.dim - 1) {
            if (this.mw.fields[this.x+0][this.y+1].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x+1][this.y+1].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x+1][this.y+0].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x+1][this.y-1].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x+0][this.y-1].bomb) {this.numOfAdjBombs++;}
        }

        /* upper right corner */
        else if (this.x == 0 && this.y == this.mw.dim - 1) {
            if (this.mw.fields[this.x+1][this.y+0].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x+1][this.y-1].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x+0][this.y-1].bomb) {this.numOfAdjBombs++;}
        }

        /* right border */
        else if (this.x > 0 && this.x < this.mw.dim - 1 && this.y == this.mw.dim - 1) {
            if (this.mw.fields[this.x-1][this.y+0].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x+1][this.y+0].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x+1][this.y-1].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x+0][this.y-1].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x-1][this.y-1].bomb) {this.numOfAdjBombs++;}
        }

        /* lower right corner */
        else if (this.x == this.mw.dim - 1 && this.y == this.mw.dim - 1) {
            if (this.mw.fields[this.x-1][this.y+0].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x+0][this.y-1].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x-1][this.y-1].bomb) {this.numOfAdjBombs++;}
        }

        /* bot border */
        else if (this.x == this.mw.dim - 1 && this.y > 0 && this.y < this.mw.dim - 1) {
            if (this.mw.fields[this.x-1][this.y+0].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x-1][this.y+1].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x+0][this.y+1].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x+0][this.y-1].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x-1][this.y-1].bomb) {this.numOfAdjBombs++;}
        }

        /* lower left corner */
        else if (this.x == this.mw.dim - 1 && this.y == 0) {
            if (this.mw.fields[this.x-1][this.y+0].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x-1][this.y+1].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x+0][this.y+1].bomb) {this.numOfAdjBombs++;}
        }

        /* left border */
        else if (this.x > 0 && this.x < this.mw.dim - 1 && this.y == 0) {
            if (this.mw.fields[this.x-1][this.y+0].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x-1][this.y+1].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x+0][this.y+1].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x+1][this.y+1].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x+1][this.y+0].bomb) {this.numOfAdjBombs++;}
        }

        else {
            if (this.mw.fields[this.x-1][this.y+0].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x-1][this.y+1].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x+0][this.y+1].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x+1][this.y+1].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x+1][this.y+0].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x+1][this.y-1].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x+0][this.y-1].bomb) {this.numOfAdjBombs++;}
            if (this.mw.fields[this.x-1][this.y-1].bomb) {this.numOfAdjBombs++;}
        }
    }

    changeOnclick() {

        this.field.onclick = () => {};

        let leftClickAction = () => {
            this.field.innerHTML = this.numOfAdjBombs;
            this.field.className = clickedClassNames[this.numOfAdjBombs];
            if (!(this.hasBeenClicked)) {
                this.mw.incAndEvalPoints();
                this.hasBeenClicked = true;
            }
        }

        let rightClickAction = () => {
            if (this.field.innerHTML == "?") {
                this.field.innerHTML = "X";
                this.field.className = markedClassName;
                this.mw.bombsMarked++;
                pointDisplay.innerHTML = this.mw.maxBombs - this.mw.bombsMarked;
            }
            else if (this.field.innerHTML == "X") {
                this.field.innerHTML = "?";
                this.field.className = coveredClassName;
                this.mw.bombsMarked--;
                pointDisplay.innerHTML = this.mw.maxBombs - this.mw.bombsMarked;
            }
        }

        mapClickEvents(this.field, leftClickAction, rightClickAction);
    }
}

class sqmw {

    constructor(dim, canvas) {
        this.dim = dim;
        this.canvas = canvas;
        this.points = 0;
        this.maxBombs = Math.floor(this.dim*this.dim/4);
        this.pointsToWin = this.dim*this.dim - this.maxBombs;
        this.bombsMarked = 0;
        pointDisplay.innerHTML = this.maxBombs - this.bombsMarked;
        this.buildGrid();
    }

    buildGrid() {
        const fields = [];
        for (let x = 0; x < this.dim; x++) {
            let tmpRow = []; 
            for (let y = 0; y < this.dim; y++) {
                let tmpField = new mwField(x, y, this);
                tmpRow.push(tmpField);
            }
            fields.push(tmpRow);
        }
        this.fields = fields;
    }

    processFirstClick(x_0,y_0) {

        this.buryBombs(x_0,y_0);

        for (let x = 0; x < this.dim; x++) {
            for (let y = 0; y < this.dim; y++) {
                let tmpField = this.fields[x][y];
                if (!(tmpField.bomb)) {
                    tmpField.countAdjBombs();
                    tmpField.changeOnclick();
                }
            }
        }

        this.uncover(x_0,y_0);
        for (let x = 0; x < this.dim; x++) {
            for (let y = 0; y < this.dim; y++) {
                this.fields[x][y].field.onclick = function() {this.uncover(x,y);}
            }
        }
    }

    buryBombs(x,y) {
        let bombs = 0;
        while (bombs < this.maxBombs) {
            let r_x = Math.floor(Math.random()*this.dim);
            let r_y = Math.floor(Math.random()*this.dim);
            if ((r_x != x || r_y != y) && !(this.fields[r_x][r_y].bomb)) {
                this.fields[r_x][r_y].placeBomb();
                bombs++;
            }
        }
    }

    uncover(x,y) {

        let tmpField = this.fields[x][y];
        if (!(tmpField.hasBeenClicked)) {
            tmpField.field.innerHTML = tmpField.numOfAdjBombs;
            tmpField.hasBeenClicked = true;
            this.incAndEvalPoints();
            tmpField.field.className = clickedClassNames[tmpField.numOfAdjBombs];
        }

        /* uncover top */
        if (x > 0) {
            let tmp = this.fields[x-1][y];
            if (!(tmp.bomb)) {
                this.uncover(x-1,y);
            }
        }

        /* uncover diagonal top right */
        if (x > 0 && y < this.dim - 1) {
            let tmp = this.fields[x-1][y+1];
            if (!(tmp.bomb)) {
                this.uncover(x-1,y+1);
            }
        }

        /* uncover right */
        if (y < this.dim - 1) {
            let tmp = this.fields[x][y+1];
            if (!(tmp.bomb)) {
                this.uncover(x,y+1);
            }
        }

        /* uncover diagonal bot right */
        if (x < this.dim - 1 && y < this.dim - 1) {
            let tmp = this.fields[x+1][y+1];
            if (!(tmp.bomb)) {
                this.uncover(x+1,y+1);
            }
        }

        /* uncover bot */
        if (x < this.dim - 1) {
            let tmp = this.fields[x+1][y];
            if (!(tmp.bomb)) {
                this.uncover(x+1,y);
            }
        }

        /* uncover diagonal bot left */
        if (x < this.dim - 1 && y > 0) {
            let tmp = this.fields[x+1][y-1];
            if (!(tmp.bomb)) {
                this.uncover(x+1,y-1);
            }
        }

        /* uncover left */
        if (y > 0) {
            let tmp = this.fields[x][y-1];
            if (!(tmp.bomb)) {
                this.uncover(x,y-1);
            }
        }

        /* uncover diagonal top left */
        if (x > 0 && y > 0) {
            let tmp = this.fields[x-1][y-1];
            if (!(tmp.bomb)) {
                this.uncover(x-1,y-1);
            }
        }
    }

    incAndEvalPoints() {
        this.points++;
        console.log(this.points+"/"+this.pointsToWin);
        if (this.points == this.dim*this.dim - this.maxBombs) {
            alert("Congratulations, you have won!");
            window.location.reload();
        }
    }
}

const mw = new sqmw(dim, canvas);
