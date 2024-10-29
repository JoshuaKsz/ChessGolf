export default class MatrixUtility {
    constructor() {}

    static createIdentityMatrix() {
        let identitas =
        [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];
    
        return identitas;
    }
    
    static multiplyMatrix(m1, m2) {
        let hasil = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
    
        for (let i = 0; i < m1.length; i++) {
            for (let j = 0; j < m1.length; j++) {
                for (let k = 0; k < m1.length; k++) {
                    hasil[i][k] += m1[i][j] * m2[j][k];
                }
            }
        }
    
        return hasil;
    }
    
    static createTranslationMatrix(Tx, Ty) {
        let translasi = [
            [1, 0, Tx],
            [0, 1, Ty],
            [0, 0,  1] 
        ];
        return translasi;
    }
    
    static createScaleMatrix(Sx, Sy) {
        let skala = [
            [Sx,  0, 0],
            [ 0, Sy, 0],
            [ 0,  0, 1]
        ];
        return skala;
    }
    
    static createRotationMatrix(theta) {
        let rotasi = [
            [Math.cos(theta), -Math.sin(theta), 0],
            [Math.sin(theta),  Math.cos(theta), 0],
            [              0,                0, 1]
        ];
        return rotasi;
    }
    
    static rotation_fp_matrix(xc, yc, theta) {
        let m1 = this.createTranslationMatrix(-xc, -yc);
        let m2 = this.createRotationMatrix(theta);
        let m3 = this.createTranslationMatrix(xc, yc);
        
        let hasil;
        hasil = this.multiplyMatrix(m3, m2);
        hasil = this.multiplyMatrix(hasil, m1); // m3 . m2 . m1
        return hasil;
    }
    
    static scale_fp_matrix(xc, yc, Sx, Sy) {
        let m1 = this.createTranslationMatrix(-xc, -yc);
        let m2 = this.createScaleMatrix(Sx, Sy);
        let m3 = this.createTranslationMatrix(xc, yc);
        
        let hasil;
        hasil = this.multiplyMatrix(m3, m2);
        hasil = this.multiplyMatrix(hasil, m1); // m3 . m2 . m1
        return hasil;
    }
    
    static transform_titik(titik_lama, m) {
        let x_baru = m[0][0] * titik_lama.x + m[0][1] * titik_lama.y + m[0][2] * 1;
        let y_baru = m[1][0] * titik_lama.x + m[1][1] * titik_lama.y + m[1][2] * 1;

        return { x: x_baru, y: y_baru };
    }
    
    static transform_point_array(array_titik, m) {
        let hasil = [];
        for (let i = 0; i < array_titik.length; i++) {
            let titik_hasil;
            titik_hasil = this.transform_titik(array_titik[i], m);
            hasil.push(titik_hasil);
        }
        return hasil;
    }

}