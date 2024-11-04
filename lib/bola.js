import VectorCalculation from "./vektor.js"

export class Bola {
    constructor(x,y,r,gesekan,warna,Canvas) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.gesekan = gesekan;
        this.warna = warna;
        this.arah = {x:0, y:0};
        this.velocity = {x:0, y:0};
        this.canMove = true;
        this.Canvas = Canvas;
    }

    gesekanBola() {
    
    }

    stopVelocity() {

    }

    pukulBola(x,y) {

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
}