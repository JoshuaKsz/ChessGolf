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

    /** 
     * Mengurangi velocity bola per frame dengan gesekan
     * @returns {void}
     */
    gesekanBola() {
        /* contoh
        bola.veolcity.x = 10 * (1- 0.01)
        bola.veolcity.x = 10 * 0.99
        1. bola.veolcity.x = 99
        2. bola.veolcity.x = 98
        3. bola.veolcity.x = 97
        // dst

        contoh negatif
        bola.veolcity.x = -24 * (1- 0.05)
        bola.veolcity.x = -24 * 0.95
        bola.veolcity.x = -22.8
        kemudian semakin ke arah 0
        */

        this.velocity.x *= (1 - this.gesekan);
        this.velocity.y *= (1 - this.gesekan);
    }
    /**
     * kondisi kalo sudah melewati batas maka velocity menjadi 0
     * @param {float/double} batas 
     * @returns {void}
     */
    stopVelocity(batas) {
        // algoritma akan lanjut menjadi 0.0000000423141 jadi di buat begini 
        // Math.abs(-0.0000421421124) = 0.0000421421124 < 0.001 = true bola.velocity.x = 0
        if (Math.abs(this.velocity.x) < batas) {
            this.velocity.x = 0;
            return true;

        } 
    
        if (Math.abs(this.velocity.y) < batas) {
            this.velocity.y = 0;
            return true;
        }
        return false;
    }

    /**
     * periksa pantulan kalau melewati canvas maka akan memantul (velocity dikalikan negatif)
     * Berdasarkan lokasi
     * @param {number} canvasHeight  
     * @param {number} canvasWidth  
     * @returns {void}
     */
    pantulanBola(canvasWidth, canvasHeight) {
        // bola mantul hanya ganti velocity 
        // bola.velocity.x >/< 0 cek positif atau negatif
        // atas kiri
        if (this.x - this.r < 0 && this.velocity.x < 0) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.y - this.r < 0 && this.velocity.y < 0) {
            this.velocity.y = -this.velocity.y;
        }
        // kanan bawah
        if (this.x + this.r > canvasWidth && this.velocity.x > 0) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.y + this.r > canvasHeight && this.velocity.y > 0) {
            this.velocity.y = -this.velocity.y;
        }
    }

    /** 
     * mengkalkulasi arah dan jarak kemudian dikalikan menjadi velocity
     * @param {number} x - posisi cursor x 
     * @param {number} y - posisi cursor y
     * @returns {void}
     */
    pukulBola(x,y) {
        // if (this.velocity.x == 0 && this.velocity.y == 0) {
            // console.log({x: bola.x, y: bola.y}, {x: x, y: y})
            let jarak = VectorCalculation.jarak2vector({x: this.x, y: this.y}, {x: x, y: y});
            let arah = VectorCalculation.arah({x: this.x, y: this.y}, {x: x, y: y});
            this.arah = arah;
            this.velocity = {x: arah.x*(jarak/8), y: arah.y*(jarak/8)};
            // console.log(jarak, bola.velocity, bola.arah, jarak, arah);
        // } else {
            // console.log("Velocity belum 0/bola belum berhenti!", this.velocity)
        // }
    }

    drawKotakIndex(index, canvasWidth) {
        let warnaPutih = {r:235, g:236, b:208, a:255};
        let warnaHitam = {r:115, g:149, b:82, a:255};

        let baris = Math.floor(index / 8);
        let kolom = index % 8;
        console.log(baris, kolom)
         
        let ukuran = canvasWidth/8;
        for (let i = ukuran*baris; i < ukuran*baris+ukuran; i++) {
            if ((baris + kolom) % 2 == 0) {
                this.Canvas.create_line(kolom*ukuran, i, Math.floor(kolom*ukuran+ukuran), i, warnaPutih);
            } else {
                this.Canvas.create_line(kolom*ukuran, i, Math.floor(kolom*ukuran+ukuran), i, warnaHitam);
            }
        }
    }
}