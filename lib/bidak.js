import MatrixUtillity from "./matrix.js"

export class Bidak {
    constructor(namaBidak, warna) {
        this.element = namaBidak;
        this.warna = warna;
        this.warna1 = 0;
        this.warna2= 0;
    }

    drawRaja(baris, kolom, Canvas) {
        let titikArray = [
            {x:0, y:0}, 
        ]
        let m = MatrixUtillity.createTranslationMatrix(kolom,baris)
        titikArray = MatrixUtillity.transform_point_array(titikArray,m)
    }

    drawRatu(baris, kolom, Canvas) {
        let titikArray = [
            {x:0, y:0}, 
        ]
        let m = MatrixUtillity.createTranslationMatrix(kolom,baris)
        titikArray = MatrixUtillity.transform_point_array(titikArray,m)
    }

    drawKuda(baris, kolom, Canvas) {
        let titikArray = [
            {x:0, y:0}, 
        ]
        let m = MatrixUtillity.createTranslationMatrix(kolom,baris)
        titikArray = MatrixUtillity.transform_point_array(titikArray,m)
    }

    drawGajah(baris, kolom, Canvas) {
        let titikArray = [
            {x:0, y:0}, 
        ]
        let m = MatrixUtillity.createTranslationMatrix(kolom,baris)
        titikArray = MatrixUtillity.transform_point_array(titikArray,m)
    }

    drawPion(baris, kolom, Canvas) {
        let titikArray = [
            {x:0, y:0}, 
        ]
        let m = MatrixUtillity.createTranslationMatrix(kolom,baris)
        titikArray = MatrixUtillity.transform_point_array(titikArray,m)
    }

    drawBenteng(baris, kolom, Canvas) {
        let titikArray = [
            {x:0, y:0}, 
        ]
        let m = MatrixUtillity.createTranslationMatrix(kolom,baris)
        titikArray = MatrixUtillity.transform_point_array(titikArray,m)
    }
}