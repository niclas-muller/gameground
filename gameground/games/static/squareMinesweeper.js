const dim = 12;
const canvas = document.getElementById("sq_mw_cnvs");

class mwField {

    constructor(x, y, mw) {
        this.x = x;
        this.y = y;
        this.mw = mw;
        this.bomb = false;
        this.numOfAdjBombs = 0;
        this.hasBeenClicked = false;

        let field = document.createElement("a");
        field.innerHTML = "?";
        field.className = "text-center border border-black hover:bg-yellow-300 hover:cursor-pointer";
        field.onclick = () => {mw.processFirstClick(this.x,this.y);}
        this.field = field;

        mw.canvas.appendChild(field);
    }

    placeBomb() {
        this.bomb = true;
        this.field.onclick = () => {
            alert("You have lost!");
            window.location.reload();
        }
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
        if (!(this.bomb)) {
            this.field.onclick = () => {
                this.field.innerHTML = this.numOfAdjBombs;
                if (!(this.hasBeenClicked)) {
                    this.mw.incAndEvalPoints();
                    this.hasBeenClicked = true;
                }
                switch(this.numOfAdjBombs) {
                    case 0:
                        this.field.className = "bg-blue-100 text-center";
                        break;
                    case 1:
                        this.field.className = "bg-blue-200 text-center";
                        break;
                    case 2:
                        this.field.className = "bg-blue-300 text-center";
                        break;
                    case 3:
                        this.field.className = "bg-blue-400 text-center";
                        break;
                    case 4:
                        this.field.className = "bg-blue-500 text-center";
                        break;
                    case 5:
                        this.field.className = "bg-blue-600 text-center";
                        break;
                    case 6:
                        this.field.className = "bg-blue-700 text-center";
                        break;
                    case 7:
                        this.field.className = "bg-blue-800 text-center";
                        break;
                    case 8:
                        this.field.className = "bg-blue-900 text-center";
                        break;
                }
            }
        }
    }
}

class sqmw {

    constructor(dim, canvas) {
        this.dim = dim;
        this.canvas = canvas;
        this.points = 0;
        this.maxBombs = Math.floor(this.dim*this.dim/4);
        this.pointsToWin = this.dim*this.dim - this.maxBombs;
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
                this.fields[x][y].countAdjBombs();
                this.fields[x][y].changeOnclick();
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
            switch(tmpField.numOfAdjBombs) {
                case 0:
                    tmpField.field.className = "bg-blue-100 text-center";
                    break;
                case 1:
                    tmpField.field.className = "bg-blue-200 text-center";
                    break;
                case 2:
                    tmpField.field.className = "bg-blue-300 text-center";
                    break;
                case 3:
                    tmpField.field.className = "bg-blue-400 text-center";
                    break;
                case 4:
                    tmpField.field.className = "bg-blue-500 text-center";
                    break;
                case 5:
                    tmpField.field.className = "bg-blue-600 text-center";
                    break;
                case 6:
                    tmpField.field.className = "bg-blue-700 text-center";
                    break;
                case 7:
                    tmpField.field.className = "bg-blue-800 text-center";
                    break;
                case 8:
                    tmpField.field.className = "bg-blue-900 text-center";
                    break;
            }
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
            alert("You have won!");
            window.location.reload();
        }
    }
}

const mw = new sqmw(dim, canvas);
