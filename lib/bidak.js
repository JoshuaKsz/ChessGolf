import MatrixUtility from "./matrix.js"

export class Bidak {
    constructor(namaBidak, warna) {
        this.element = namaBidak;
        this.warna = warna;
        this.warna = warna;
        this.warna1 = 0;
        this.warna2= 0;
        if (warna.r == 0, warna.g == 0, warna.b == 0) {
            this.tipe = 'h';
            this.outline = {r: 255, g: 255, b: 255, a: 255};
        } else if (warna.r == 255, warna.g == 255, warna.b == 255) {
            this.tipe = 'p';
            this.outline = {r: 0, g: 0, b: 0, a: 255};
        }
        
    }


    drawBidak(Canvas, index) {
        let baris = Math.floor(index / 8);
        let kolom = index % 8;

        const tinggiKotak = Canvas.c_handler.height/8;
        const panjangKotak = Canvas.c_handler.width/8;

        // deret aritmetika
        // an = a1 + (n-1) x b
        baris = tinggiKotak/2 + baris * (tinggiKotak) ;
        kolom = panjangKotak/2 + kolom * (panjangKotak);
        
        // https://www.w3schools.com/jsref/jsref_tolowercase.asp
        // mengubah menjadi kecil/lower case
        switch (this.element.toLowerCase()) {
            case 'p':
                this.drawPion(baris, kolom, Canvas);
                break;
            case 'r':
                this.drawBenteng(baris, kolom, Canvas);
                break;
            case 'n':
                this.drawKuda(baris, kolom, Canvas);
                break;
            case 'b':
                this.drawGajah(baris, kolom, Canvas);
                break;
            case 'q':
                this.drawRatu(baris, kolom, Canvas);
                break;
            case 'k':
                this.drawRaja(baris, kolom, Canvas);
                break;
            default:
                console.error(`Error bidak tidak diketahui: ${this.element}`);
        }
    
    }

    drawRaja(baris, kolom, Canvas) {
        let titikArray = [
            {x: -20, y:  -5}, /* */
            {x:  -5, y:  -5}, /* */
            {x:  -5, y: -25}, /* */
            {x:   5, y: -25}, /* */
            {x:   5, y:  -5}, /* */
            {x:  20, y:  -5}, /* */

        ]; 
        // tranformasi ke kordinat tersebut
        let m = MatrixUtility.createTranslationMatrix(kolom, baris);

        titikArray = MatrixUtility.transform_point_array(titikArray, m);

        Canvas.polyLineXY(titikArray, {r: 255, g: 0, b: 0, a: 255});

    }

    drawRatu(baris, kolom, Canvas) {
        let titikArray = [
            {x: -20, y: -10}, /* */
            {x: -10, y:  10}, /* */
            {x:   0, y: -10}, /* */
            {x:  10, y:  10}, /* */
            {x:  20, y: -10}, /* */
        ];
        // tranformasi ke kordinat tersebut
        let m = MatrixUtility.createTranslationMatrix(kolom, baris);

        titikArray = MatrixUtility.transform_point_array(titikArray, m);

        Canvas.polyLineXY(titikArray, {r: 255, g: 0, b: 0, a: 255});
    }

    drawKuda(baris, kolom, Canvas) {
        let titikArray = [
            {x: 0, y: -15}, /* */
            {x: 10, y: -7}, /* */
            {x: 0, y: 0}, /* */
        ]; 
        // tranformasi ke kordinat tersebut
        let m = MatrixUtility.createTranslationMatrix(kolom, baris);

        titikArray = MatrixUtility.transform_point_array(titikArray, m);
        
        Canvas.polygonXY(titikArray, {r: 255, g: 0, b: 0, a: 255});
    }

    drawGajah(baris, kolom, Canvas) {
        let titikArray = [
            {x: -10, y: -1}, /* */
            {x:  10, y: -1}, /* */
            {x:   0, y: -10}, /* */
        ]; 
        // tranformasi ke kordinat tersebut
        let m = MatrixUtility.createTranslationMatrix(kolom, baris);

        titikArray = MatrixUtility.transform_point_array(titikArray, m);
        
        Canvas.polygonXY(titikArray, {r: 255, g: 0, b: 0, a: 255});
    }

    drawPion(baris, kolom, Canvas) {
        let titikArray = [
            {x:0, y:0}, 
        ];
        let m = MatrixUtility.createTranslationMatrix(kolom,baris);
        titikArray = MatrixUtility.transform_point_array(titikArray,m);
        Canvas.lingkaranFill(titikArray[0].x, titikArray[0].y, 10, this.warna);

        Canvas.lingkaranPolar(titikArray[0].x, titikArray[0].y, 10, this.outline);

    }

    drawBenteng(baris, kolom, Canvas) {
        let titikArray = [
            {x: -10, y: -10}, /* */
            {x: -10, y: -20}, /* */
            {x:  10, y: -20}, /* */
            {x:  10, y: -10}, /* */
            
        ]; 
        // tranformasi ke kordinat tersebut
        let m = MatrixUtility.createTranslationMatrix(kolom, baris);

        titikArray = MatrixUtility.transform_point_array(titikArray, m);
        console.log(titikArray)
        Canvas.polyLineXY(titikArray, {r: 255, g: 0, b: 0, a: 255});
    }
}