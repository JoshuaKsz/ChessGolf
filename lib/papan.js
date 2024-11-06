import {Bidak} from "./bidak.js"

export class Papan {
    constructor(Canvas) {
        let warnaPutih = {r:255, g:255, b:255, a:255};
        let warnaHitam = {r:0, g:0, b:0, a:255}
        
        // https://www.freecodecamp.org/news/javascript-array-of-objects-tutorial-how-to-create-update-and-loop-through-objects-using-js-array-methods/
        // Sama aja array of object masukin gitu-gitu sama seperti array biasa

        // membuat array 1D dengan object bidak
        this.grid = [
            new Bidak('r', warnaHitam),
            new Bidak('n', warnaHitam),
            new Bidak('b', warnaHitam),
            new Bidak('q', warnaHitam),
            new Bidak('k', warnaHitam),
            new Bidak('b', warnaHitam),
            new Bidak('n', warnaHitam),
            new Bidak('r', warnaHitam),
        ];

        for (let i = 0; i < 8; i++) {
            this.grid.push(new Bidak('p', warnaHitam));
        }

        for (let i = 0; i < 32; i++) {
            this.grid.push(null);
        }
        
        for (let i = 0; i < 8; i++) {
            this.grid.push(new Bidak('P', warnaPutih));
        }

        this.grid.push(
            new Bidak('R', warnaPutih),
            new Bidak('N', warnaPutih),
            new Bidak('B', warnaPutih),
            new Bidak('Q', warnaPutih),
            new Bidak('K', warnaPutih),
            new Bidak('B', warnaPutih),
            new Bidak('N', warnaPutih),
            new Bidak('R', warnaPutih),
        );
        console.log(this.grid);
            // 'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',
            // 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
            // '.', '.', '.', '.', '.', '.', '.', '.',
            // '.', '.', '.', '.', '.', '.', '.', '.',
            // '.', '.', '.', '.', '.', '.', '.', '.',
            // '.', '.', '.', '.', '.', '.', '.', '.',
            // 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
            // 'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'
        this.gameEnded = false;
        this.turn = 'white';
        // Belajar dari algoritma struktur data pointer object dijadikan atribut catur
        this.Canvas = Canvas;
        this.canvasWidth = Canvas.c_handler.width;
        this.canvasHeight = Canvas.c_handler.height;
    }

    drawKotakIndex(index) {
        let warnaPutih = {r:235, g:236, b:208, a:255};
        let warnaHitam = {r:115, g:149, b:82, a:255};

        let baris = Math.floor(index / 8);
        let kolom = index % 8;
        // console.log(baris, kolom)
         
        let ukuran = this.canvasWidth/8;
        for (let i = ukuran*baris; i < ukuran*baris+ukuran; i++) {
            if ((baris + kolom) % 2 == 0) {
                this.Canvas.create_line(kolom*ukuran, i, Math.floor(kolom*ukuran+ukuran), i, warnaPutih);
            } else {
                this.Canvas.create_line(kolom*ukuran, i, Math.floor(kolom*ukuran+ukuran), i, warnaHitam);
            }
        }
    }

    drawSemuaKotak() {
        for (let i = 0; i < 64; i++) {
            this.drawKotakIndex(i);
        }
    }
    
    drawSemuaBidak() {
        for (let i = 0; i < this.grid.length; i++) {
            if (this.grid[i] != null) {   
                this.grid[i].drawBidak(this.Canvas, i);
            }
        }
    }
}