// untuk Handle kalkulasi vektor
 

export default class VectorCalculation {
    constructor() {}

    static jarak2vector(v0, v1) {
        return Math.sqrt(Math.pow(v0.x - v1.x, 2) - Math.pow(v0.y - v1.y, 2));
    }


    static vectorTambah(v0, v1) {
        return {x: v0.x + v1.x, y: v0.y + v1.y};
    }
    
    static vectorKurang(v0, v1) {
        return {x: v0.x - v1.x, y: v0.y - v1.y};
    }

    static normalisasi(v) {
        let jarakVector = Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2));
        // menghidari pembagian 0;
        if (jarakVector == 0) {
            return { x: 0, y: 0 };
        }
        return {x: v.x / jarakVector, y: v.y / jarakVector};
    }

    static arah(vArahKe, vAsal) {
        return this.normalisasi(this.vectorKurang(vArahKe, vAsal));
    }
};