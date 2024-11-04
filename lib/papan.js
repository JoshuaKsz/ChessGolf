export class Papan {
    constructor (Canvas) {
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

}