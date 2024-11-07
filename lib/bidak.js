import MatrixUtility from "./matrix.js"

export class Bidak {
    constructor(namaBidak, warna) {
        this.element = namaBidak;
        this.warna = warna;
        this.lokasiIndex = 0;
        this.bisaGerakKe = [];
        this.sudahBergerak = false;

        if (warna.r == 0, warna.g == 0, warna.b == 0) {
            this.tipe = 'h';
            this.outline = {r: 255, g: 255, b: 255, a: 255};
        } else if (warna.r == 255, warna.g == 255, warna.b == 255) {
            this.tipe = 'p';
            this.outline = {r: 0, g: 0, b: 0, a: 255};
        }
        
        if (namaBidak == 'p' || namaBidak == 'P') {
            this.enPessant = false;
            if (namaBidak == 'P') {
                this.gerakLegal = [
                    // {kolomMulai: 0, barisMulai:  -1, kolomAkhir:  0, barisAkhir:  -1},
                    {iMulai: -8, increment: -8, iAkhir: -8}
                ];
            } else {
                this.gerakLegal = [
                    // {kolomMulai:  0, barisMulai:  1, kolomAkhir:  0, barisAkhir:  1},
                    {iMulai:  8, increment:  8, iAkhir:  8}
                ];
            }
        }

        switch (this.element.toLowerCase()) {
            case 'r':
                this.gerakLegal = [
                    // {kolomMulai:  1, barisMulai:  0, kolomAkhir:  7, barisAkhir:  0},
                    // {kolomMulai: -1, barisMulai:  0, kolomAkhir: -7, barisAkhir:  0},
                    // {kolomMulai:  0, barisMulai:  1, kolomAkhir:  0, barisAkhir:  7},
                    // {kolomMulai:  0, barisMulai: -1, kolomAkhir:  0, barisAkhir: -7},
                    
                    {iMulai:  8, increment:  8, iAkhir:  56},
                    {iMulai: -8, increment: -8, iAkhir: -56},
                    {iMulai:  1, increment:  1, iAkhir:  7},
                    {iMulai: -1, increment: -1, iAkhir: -7},

                ];
                break;
            case 'n':
                this.gerakLegal = [
                    // {kolomMulai: -1, barisMulai: -2, kolomAkhir:  -2, barisAkhir: -1},
                    // {kolomMulai:  1, barisMulai:  2, kolomAkhir:   2, barisAkhir:  1},
                    // {kolomMulai:  1, barisMulai: -2, kolomAkhir:   2, barisAkhir: -1},
                    // {kolomMulai: -1, barisMulai:  2, kolomAkhir:  -2, barisAkhir:  1},
                    {iMulai:  17, increment:  17, iAkhir:  17},
                    {iMulai: -17, increment: -17, iAkhir: -17},
                    {iMulai:  15, increment:  15, iAkhir:  15},
                    {iMulai: -15, increment: -15, iAkhir: -15},
                    {iMulai:  10, increment:  10, iAkhir:  10},
                    {iMulai: -10, increment: -10, iAkhir: -10},
                    {iMulai:   6, increment:   6, iAkhir:  6},
                    {iMulai:  -6, increment:  -6, iAkhir: -6},
                ];
                break;
            case 'b':
                this.gerakLegal = [
                    // {kolomMulai:  1, barisMulai:  1, kolomAkhir:  7, barisAkhir:  7},
                    // {kolomMulai: -1, barisMulai: -1, kolomAkhir: -7, barisAkhir: -7},
                    // {kolomMulai: -1, barisMulai:  1, kolomAkhir: -7, barisAkhir:  7},
                    // {kolomMulai:  1, barisMulai: -1, kolomAkhir:  7, barisAkhir: -7},
                    {iMulai:  9, increment:  9, iAkhir:  63},
                    {iMulai: -9, increment: -9, iAkhir: -63},
                    {iMulai:  7, increment:  7, iAkhir:  49},
                    {iMulai: -7, increment: -7, iAkhir: -49},

                ];
                break;
            case 'q':
                this.gerakLegal = [
                    // {kolomMulai:  1, barisMulai:  1, kolomAkhir:  7, barisAkhir:  7},
                    // {kolomMulai: -1, barisMulai: -1, kolomAkhir: -7, barisAkhir: -7},
                    // {kolomMulai: -1, barisMulai:  1, kolomAkhir: -7, barisAkhir:  7},
                    // {kolomMulai:  1, barisMulai: -1, kolomAkhir:  7, barisAkhir: -7},

                    // {kolomMulai:  1, barisMulai:  0, kolomAkhir:  7, barisAkhir:  0},
                    // {kolomMulai: -1, barisMulai:  0, kolomAkhir: -7, barisAkhir:  0},
                    // {kolomMulai:  0, barisMulai:  1, kolomAkhir:  0, barisAkhir:  7},
                    // {kolomMulai:  0, barisMulai: -1, kolomAkhir:  0, barisAkhir: -7},

                    {iMulai:  8, increment:  8, iAkhir:  56},
                    {iMulai: -8, increment: -8, iAkhir: -56},
                    {iMulai:  1, increment:  1, iAkhir:  7},
                    {iMulai: -1, increment: -1, iAkhir: -7},

                    {iMulai:  9, increment:  9, iAkhir:  63},
                    {iMulai: -9, increment: -9, iAkhir: -63},
                    {iMulai:  7, increment:  7, iAkhir:  49},
                    {iMulai: -7, increment: -7, iAkhir: -49},

                ];
                break;
            case 'k':
                this.gerakLegal = [
                    // {kolomMulai: -1, barisMulai: -1, kolomAkhir:  1, barisAkhir: -1},
                    // {kolomMulai:  1, barisMulai:  1, kolomAkhir: -1, barisAkhir:  1},
                    // {kolomMulai:  1, barisMulai:  0, kolomAkhir:  1, barisAkhir:  0},
                    // {kolomMulai:  0, barisMulai: -1, kolomAkhir:  0, barisAkhir: -1},

                    {iMulai: -9, increment:  1, iAkhir:  -7},
                    {iMulai:  9, increment: -1, iAkhir:   7},
                    {iMulai:  1, increment:  1, iAkhir:   1},
                    {iMulai: -1, increment: -1, iAkhir:  -1},

                ];
                break;
            case 'p':
                break;
            default:
                console.error(`Error bidak tidak diketahui: ${this.element}`);
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

    // https://www.chess.com/
    // Sumber: gambar
    // Slice: https://www.w3schools.com/jsref/jsref_slice_array.asp

    drawRaja(baris, kolom, Canvas) {
        let titikArray = [
            {x: -10, y: 13}, /* */
            {x: -14, y: 13}, /* */
            {x: -18, y: 16}, /* */
            {x: -18, y: 23}, /* */
            {x:  18, y: 23}, /* */
            {x:  18, y: 16}, /* */
            {x:  14, y: 13}, /* */
            {x:  10, y: 13}, /* */

            {x:  22, y: 1}, /* */
            {x:  22, y: -5}, /* */
            {x:  15, y: -13}, /* */
            {x:  9, y: -13}, /* */
            {x:  4, y: -11}, /* */
            {x:  3, y: -15}, /* */
            {x:  7, y: -15}, /* */
            {x:  7, y: -15}, /* */
            {x:  7, y: -21}, /* */
            {x:  3, y: -21}, /* */
            {x:  3, y: -25}, /* */

            {x: -3, y: -25}, /* */
            {x: -3, y: -21}, /* */
            {x: -7, y: -21}, /* */
            {x: -7, y: -15}, /* */
            {x: -7, y: -15}, /* */
            {x: -3, y: -15}, /* */
            {x: -4, y: -11}, /* */
            {x: -9, y: -13}, /* */
            {x: -15, y: -13}, /* */
            {x: -22, y: -5}, /* */
            {x: -22, y: 1}, /* */

            {x: -5, y: 6}, /* */
            {x: -5, y: -2}, /* */
            {x: -7, y: -4}, /* */
            {x: -11, y: -4}, /* */
            {x: -13, y: -2}, /* */
            {x: -13, y: -0}, /* */
            {x: -13, y: -0}, /* */
            {x: -7, y: 6}, /* */
            
            {x:  5, y: 6}, /* */
            {x:  5, y: -2}, /* */
            {x:  7, y: -4}, /* */
            {x:  11, y: -4}, /* */
            {x:  13, y: -2}, /* */
            {x:  13, y: -0}, /* */
            {x:  13, y: -0}, /* */
            {x:  7, y: 6}, /* */
        ];
        // tranformasi ke kordinat tersebut
        let m = MatrixUtility.createTranslationMatrix(kolom, baris);

        titikArray = MatrixUtility.transform_point_array(titikArray, m);

        Canvas.polygonXY(titikArray.slice(0,30), {r: 0, g: 0, b: 0, a: 255});
        Canvas.polygonXY(titikArray.slice(30,37), {r: 0, g: 0, b: 0, a: 255});
        Canvas.polygonXY(titikArray.slice(38,44), {r: 0, g: 0, b: 0, a: 255});
        Canvas.create_line(titikArray[0].x + 3, titikArray[0].y, titikArray[7].x - 3, titikArray[7].y, this.outline);
        Canvas.floodFillStack(Math.round(titikArray[44].x)-7, Math.round(titikArray[44].y)-6,Canvas.mengambilWarnaImage(titikArray[44].x-7, titikArray[44].y - 6), this.warna);

    }

    drawRatu(baris, kolom, Canvas) {
        let titikArray = [
            {x: -10, y: 13}, /* */
            {x: -14, y: 13}, /* */
            {x: -18, y: 16}, /* */
            {x: -18, y: 23}, /* */
            {x:  18, y: 23}, /* */
            {x:  18, y: 16}, /* */
            {x:  14, y: 13}, /* */
            {x:  10, y: 13}, /* */
            {x:  17, y: -10}, /* */
            {x:  8, y: -2}, /* */
            {x:  6, y: -20}, /* */
            {x: -1, y: -6}, /* */
            {x: -6, y: -20}, /* */
            {x: -8, y: -2}, /* */
            {x: -17, y: -10}, /* */
            {x: -10, y: 13}, /* */
        ];

        // tranformasi ke kordinat tersebut
        let m = MatrixUtility.createTranslationMatrix(kolom, baris);

        titikArray = MatrixUtility.transform_point_array(titikArray, m);

        Canvas.polyLineXY(titikArray, {r: 0, g: 0, b: 0, a: 255});
        Canvas.create_line(titikArray[0].x + 3, titikArray[0].y, titikArray[7].x - 3, titikArray[7].y, this.outline);
        Canvas.floodFillStack(Math.round(titikArray[11].x), Math.round(titikArray[11].y)+6,Canvas.mengambilWarnaImage(titikArray[11].x, titikArray[11].y + 6), this.warna);
    }

    drawKuda(baris, kolom, Canvas) {
        let titikArray = [
            {x: -7, y: -27}, /* */
            {x: -2, y: -19}, /* */
            {x: -3, y: -19}, /* */
            {x:  8, y: -15}, /* */
            {x: 13, y: -11}, /* */
            {x: 15, y:  -6}, /* */
            {x: 16, y:  4}, /* */
            {x: 14, y:  13}, /* */
            {x: 18, y:  17}, /* */
            {x: 18, y:  23}, /* */
            {x: -18, y:  23}, /* */
            {x: -18, y:  17}, /* */
            {x: -14, y:  13}, /* */
            {x: 0, y:  0}, /* */
            {x: -1, y: -4}, /* */
            {x:  -5, y: 1}, /* */
            {x: -10, y: 1}, /* */
            {x: -13, y: 4}, /* */
            {x: -16, y: 4}, /* */
            {x: -21, y: 0}, /* */
            {x: -15, y: -9}, /* */
            {x: -13, y: -15}, /* */
            {x: -9, y: -19}, /* */

            // mata kuda
            {x: -7, y: -12}, /* */


            {x:  11, y: 13}, /* */
            {x: -11, y: 13}, /* */
            
        ]; 
        // tranformasi ke kordinat tersebut
        let m = MatrixUtility.createTranslationMatrix(kolom, baris);

        titikArray = MatrixUtility.transform_point_array(titikArray, m);
        
        Canvas.polygonXY(titikArray.slice(0,23), {r: 0, g: 0, b: 0, a: 255});
        Canvas.lingkaranPolar(titikArray[23].x, titikArray[23].y, 1, this.outline);
        Canvas.create_line(titikArray[24].x, titikArray[24].y, titikArray[25].x, titikArray[25].y, this.outline);
        Canvas.floodFillStack(Math.round(titikArray[13].x+2), Math.round(titikArray[13].y+2),Canvas.mengambilWarnaImage(titikArray[13].x+2, titikArray[13].y+2), this.warna);
    }

    drawGajah(baris, kolom, Canvas) {
        let titikArray = [
            {x: 3, y: -22}, /* */
            {x: -7, y: -16}, /* */
            {x: -12, y: -9}, /* */
            {x: -14, y: -5}, /* */
            {x: -15, y: -2}, /* */
            {x: -15, y: 5}, /* */
            {x: -13, y: 8}, /* */
            {x: -10, y: 13}, /* */
            {x: -14, y: 13}, /* */
            {x: -18, y: 16}, /* */
            {x: -18, y: 23}, /* */
            {x:  18, y: 23}, /* */
            {x:  18, y: 16}, /* */
            {x:  14, y: 13}, /* */
            {x:  10, y: 13}, /* */
            {x:  13, y: 8}, /* */
            {x:  15, y: 5}, /* */
            {x:  15, y: -2}, /* */
            {x:  14, y: -5}, /* */
            {x:  12, y: -9}, /* */
            {x:  5, y: -15}, /* */
            {x:  2, y: -8}, /* */
            {x:  2, y: -8}, /* */
            {x:  1, y:  0}, /* */
            {x: -3, y:  0}, /* */
            {x: -3, y:  -8}, /* */

        ]; 
        // tranformasi ke kordinat tersebut
        let m = MatrixUtility.createTranslationMatrix(kolom, baris);

        titikArray = MatrixUtility.transform_point_array(titikArray, m);
        
        Canvas.polygonXY(titikArray, {r: 0, g: 0, b: 0, a: 255});

        Canvas.create_line(titikArray[7].x+3,titikArray[7].y, titikArray[14].x-3,titikArray[14].y, this.outline)
        Canvas.floodFillStack(Math.round(titikArray[23].x), Math.round(titikArray[23].y +4), Canvas.mengambilWarnaImage(titikArray[23].x, titikArray[23].y+4), this.warna);

    }

    drawPion(baris, kolom, Canvas) {
        let titikArray = [
            {x:  0, y: -10}, /* lingkaran */

            // garis Polyline
            {x: -4, y: -2},
            {x: -8, y: 3},
            {x: -4, y: 3},
            {x: -3, y: 7},
            {x: -11, y: 15},
            {x: -11, y: 20},
            // garis Polyline 2
            {x: 11, y: 20},
            {x: 11, y: 15},
            {x: 3, y: 7},
            {x: 4, y: 3},
            {x: 8, y: 3},
            {x: 4, y: -2},
        ];
        let m = MatrixUtility.createTranslationMatrix(kolom,baris);
        titikArray = MatrixUtility.transform_point_array(titikArray,m);
        Canvas.lingkaranPolar(titikArray[0].x, titikArray[0].y, 8, {r: 0, g: 0, b: 0, a: 255});
        Canvas.polyLineXY(titikArray.slice(1, 14), {r: 0, g: 0, b: 0, a: 255});
        Canvas.create_line(titikArray[1].x+1, titikArray[1].y, titikArray[12].x, titikArray[12].y, Canvas.mengambilWarnaImage(titikArray[0].x, titikArray[0].y))
        Canvas.floodFillStack(Math.round(titikArray[0].x), Math.round(titikArray[0].y), Canvas.mengambilWarnaImage(titikArray[0].x, titikArray[0].y), this.warna);

    }

    drawBenteng(baris, kolom, Canvas) {
        let titikArray = [
            {x: -17, y: -7}, 
            {x: -20, y: -20}, 
            {x:  -10, y: -20}, 
            {x:  -10, y: -15},
            {x:  -5, y: -15}, 
            {x:  -5, y: -20}, 
            {x:   5, y: -20}, 
            {x:   5, y: -15}, 
            {x:   10, y: -15}, 
            {x:   10, y: -20}, 
            
            {x:  20, y: -20}, 
            {x:  17, y: -7}, 
            {x:  12, y: -6}, 
            {x:  15, y: 15},

            {x: -18, y: 16}, /* */
            {x: -18, y: 23}, /* */
            {x:  18, y: 23}, /* */
            {x:  18, y: 16}, /* */

            
            {x: -15, y: 15}, 
            {x: -12, y: -6}, 
            {x: -17, y: -7}, 

        ]; 
        // tranformasi ke kordinat tersebut
        let m = MatrixUtility.createTranslationMatrix(kolom, baris);

        titikArray = MatrixUtility.transform_point_array(titikArray, m);
        Canvas.polyLineXY(titikArray, {r: 0, g: 0, b: 0, a: 255});
        Canvas.create_line(titikArray[12].x-5,titikArray[12].y,titikArray[19].x+5,titikArray[19].y, this.outline)
        Canvas.floodFillStack(Math.round(titikArray[0].x)+2 , Math.round(titikArray[0].y)-2, Canvas.mengambilWarnaImage(titikArray[0].x+2, titikArray[0].y-2), this.warna);
        Canvas.floodFillStack(Math.round(titikArray[0].x)+2 , Math.round(titikArray[0].y)+24, Canvas.mengambilWarnaImage(titikArray[0].x+2, titikArray[0].y+24), this.warna);

    }
}