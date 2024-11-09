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

        this.bidakPutih = [];
        this.bidakHitam = [];
        this.grid.forEach((bidak, index) => {
            if (bidak) {
                if (bidak.tipe == 'p') {
                    bidak.lokasiIndex = index;
                    this.bidakPutih.push(bidak);
                } else if (bidak.tipe == 'h') {
                    bidak.lokasiIndex = index;
                    this.bidakHitam.push(bidak);
                }
            }
        });
        console.log(this.bidakHitam, this.bidakPutih);

        this.gameEnded = false;
        // Belajar dari algoritma struktur data pointer object dijadikan atribut catur
        this.Canvas = Canvas;
        this.canvasWidth = Canvas.c_handler.width;
        this.canvasHeight = Canvas.c_handler.height;
    }

    setSemuaBidakGerak(strBidak) {
        let pionGerak = 0;
        let arrBidak;
        if (strBidak == 'p') {
            pionGerak = -8;
            arrBidak = this.bidakPutih;
        } else if (strBidak == 'h') {
            pionGerak = 8;
            arrBidak = this.bidakHitam;
        } else {
            console.log("set gagal:", strBidak)
            return; 
        }

        arrBidak.forEach((bidak, index) => {
            switch (bidak.element.toUpperCase()) {
                case 'P':
                    if (bidak.lokasiIndex+pionGerak >= 0 && bidak.lokasiIndex+pionGerak < 64) {
                        bidak.bisaGerakKe.push(bidak.lokasiIndex+pionGerak);
                        if (!bidak.sudahBergerak && 2*pionGerak+bidak.lokasiIndex >= 0 && 2*pionGerak+bidak.lokasiIndex < 64 ) {
                            bidak.bisaGerakKe.push(2*pionGerak+bidak.lokasiIndex);
                        }
                    }
                    if (bidak.lokasiIndex % 8 != 0 && this.grid[pionGerak+bidak.lokasiIndex-1] != null && pionGerak+bidak.lokasiIndex-1 >= 0 && pionGerak+bidak.lokasiIndex-1 < 64) {
                        if (this.grid[pionGerak+bidak.lokasiIndex-1].tipe != strBidak) {
                            bidak.bisaGerakKe.push(pionGerak+bidak.lokasiIndex-1);
                        }
                    }
                    if ((bidak.lokasiIndex+1) % 8 != 0 && this.grid[pionGerak+bidak.lokasiIndex+1] != null && pionGerak+bidak.lokasiIndex+1>= 0 && pionGerak+bidak.lokasiIndex+1 < 64) {
                        if (this.grid[pionGerak+bidak.lokasiIndex+1].tipe != strBidak) {
                            bidak.bisaGerakKe.push(pionGerak+bidak.lokasiIndex+1);
                        }
                    }
                    break;
                case 'N':
                    for (let j = 0; j < bidak.gerakLegal.length; j++) {
                        if (j % 2 == 0) {
                            for (let k = bidak.lokasiIndex+bidak.gerakLegal[j].iMulai; k < 64 && k <= bidak.lokasiIndex+bidak.gerakLegal[j].iAkhir; k += bidak.gerakLegal[j].increment) {
                                if (this.grid[k] == null && k >= 0 && k < 64) {
                                    bidak.bisaGerakKe.push(k);
                                } else if (k >= 0 && k < 64) {
                                    if (this.grid[k].tipe == strBidak) {
                                        break;
                                    } else if (this.grid[k].tipe != strBidak) {
                                        bidak.bisaGerakKe.push(k);
                                        break;
                                    }
                                }
                            }
                        } else {
                            for (let k = bidak.lokasiIndex+bidak.gerakLegal[j].iMulai; k >= 0 && k>=bidak.lokasiIndex+bidak.gerakLegal[j].iAkhir-1; k += bidak.gerakLegal[j].increment) {
                                // if () {
                                    if (this.grid[k] == null && k >= 0 && k < 64) {
                                            bidak.bisaGerakKe.push(k);
                                    } else if (k >= 0 && k < 64) {
                                        if (this.grid[k].tipe == strBidak) {
                                            break;
                                        } else if (this.grid[k].tipe != strBidak) {
                                            bidak.bisaGerakKe.push(k);
                                            break;
                                        }
                                    }
                                // }
                            }
                        }
                    }
                    break;
                case 'R':
                case 'B':
                case 'K':
                case 'Q':
                    for (let j = 0; j < bidak.gerakLegal.length; j++) {
                        if (j % 2 == 0) {
                            for (let k = bidak.lokasiIndex+bidak.gerakLegal[j].iMulai; k < 64 && k <= bidak.lokasiIndex+bidak.gerakLegal[j].iAkhir; k += bidak.gerakLegal[j].increment) {
                                if (this.grid[k] == null && k >= 0 && k < 64) {
                                    bidak.bisaGerakKe.push(k);
                                } else if (k >= 0 && k < 64) {
                                    if (this.grid[k].tipe == strBidak ) {
                                        break;
                                    } else if (this.grid[k].tipe != strBidak || (k) % 8 == 0 || (k-1) % 8 == 0) {
                                        bidak.bisaGerakKe.push(k);
                                        break;
                                    }
                                }
                            }
                        } else {
                            for (let k = bidak.lokasiIndex+bidak.gerakLegal[j].iMulai; k >= 0 && k>=bidak.lokasiIndex+bidak.gerakLegal[j].iAkhir-1; k += bidak.gerakLegal[j].increment) {
                                if (this.grid[k] == null && k >= 0 && k < 64) {
                                    bidak.bisaGerakKe.push(k);
                                } else if (k >= 0 && k < 64) {
                                    if (this.grid[k].tipe == strBidak) {
                                        break;
                                    } else if (this.grid[k].tipe != strBidak || (k) % 8 == 0 || (k-1) % 8 == 0) {
                                        bidak.bisaGerakKe.push(k);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    break;
            }
        });
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    // splice
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
    // findIndex
    gerakBidak(indexAwal, indexTujuan) {
        if (this.grid[indexAwal] != null) {
            if (this.grid[indexAwal].bisaGerakKe.includes(indexTujuan)) {
                if (this.grid[indexTujuan] != null) {
                    if (this.grid[indexTujuan].tipe == 'p') {
                        this.bidakPutih.splice(this.bidakPutih.findIndex(bidak => bidak.lokasiIndex == indexTujuan), 1);
                    } else if (this.grid[indexTujuan].tipe == 'h') {
                        this.bidakHitam.splice(this.bidakHitam.findIndex(bidak => bidak.lokasiIndex == indexTujuan), 1);
                    }
                }
                this.grid[indexTujuan] = this.grid[indexAwal];
                this.grid[indexAwal] = null;

                this.grid[indexTujuan].sudahBergerak = true;
                this.grid[indexTujuan].lokasiIndex = indexTujuan;
                this.grid[indexTujuan].bisaGerakKe = [];
                return true
            } else {
                console.log("gerakan Illegal");
                return false;
            }
        } else {
            console.log("gerakan Illegal menggerakan null!");
            return false;
        }
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
    
    drawBidakIndex(index) {
        if (this.grid[index] != null) {   
            this.grid[index].drawBidak(this.Canvas, index);
        }
    }

    drawSemuaBidak() {
        for (let i = 0; i < this.grid.length; i++) {
            this.drawBidakIndex(i);
        }
    }
    setSemuaBidakGerakNull(strBidak) {
        for (let i = 0; i < this.grid.length; i++) {
            if (this.grid[i] != null) {
                if (this.grid[i] == strBidak) {
                    this.grid[i].bisaGerakKe = [];
                }
            }
        }
    } 
    /*
    setSemuaBidakGerak(strBidak) {
        for (let i = 0; i < this.grid.length; i++) {
            if (this.grid[i] != null) {
                let bidak = this.grid[i];
                if (bidak.tipe == strBidak) {
                    if (bidak.element.toUpperCase() == 'P') {
                        let arahIndex = bidak.gerakLegal[0].increment;
                        if (i+arahIndex >= 0 && i+arahIndex < 64 && this.grid[i+arahIndex] == null) {
                            bidak.bisaGerakKe.push(i+arahIndex);
                            if (!bidak.sudahBergerak) {
                                arahIndex = arahIndex * 2;
                                if (i+arahIndex >= 0 && i+arahIndex < 64 && this.grid[i+arahIndex] == null) {
                                    bidak.bisaGerakKe.push(i+arahIndex);
                                }
                            }
                        }
                        arahIndex = bidak.gerakLegal[0].increment;
                        if (i % 8 != 0) {
                            if (this.grid[i+arahIndex-1] != null && this.grid[i+arahIndex-1].tipe != strBidak) {
                                bidak.bisaGerakKe.push(i+arahIndex-1);
                            }
                        }
                        if ((i + 1) % 8 != 0) {
                            if (this.grid[i+arahIndex+1] != null && this.grid[i+arahIndex+1].tipe != strBidak) {
                                bidak.bisaGerakKe.push(i+arahIndex+1);
                            }
                        }
                    } else {
                        for (let j = 0; j < bidak.gerakLegal.length; j++) {
                            if (j % 2 == 0) {
                                console.log(i+bidak.gerakLegal[j].iMulai, i+bidak.gerakLegal[j].iAkhir, bidak.gerakLegal[j].increment, bidak)
                                for (let k = i+bidak.gerakLegal[j].iMulai; k < 64 && k <= i+bidak.gerakLegal[j].iAkhir; k += bidak.gerakLegal[j].increment) {
                                    if (this.grid[k] == null) {
                                        bidak.bisaGerakKe.push(k);
                                    } else {
                                        if (this.grid[k].tipe == strBidak) {
                                            break;
                                        } else if (this.grid[k].tipe != strBidak) {
                                            bidak.bisaGerakKe.push(k);
                                            break;
                                        }
                                    }
                                }
                            } else {
                                console.log(i+bidak.gerakLegal[j].iMulai, i+bidak.gerakLegal[j].iAkhir, bidak.gerakLegal[j].increment, bidak)
                                for (let k = i+bidak.gerakLegal[j].iMulai; k >= 0 && k>=i+bidak.gerakLegal[j].iAkhir-1; k += bidak.gerakLegal[j].increment) {
                                    if (this.grid[k] == null) {
                                        bidak.bisaGerakKe.push(k);
                                    } else {
                                        if (this.grid[k].tipe == strBidak) {
                                            break;
                                        } else if (this.grid[k].tipe != strBidak) {
                                            bidak.bisaGerakKe.push(k);
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    */
}

