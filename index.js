import { DrawLib } from "./lib/lib.js"
import MatrixUtility from "./lib/matrix.js"
import VectorCalculation from "./lib/vektor.js"
import {Papan} from "./lib/papan.js"
import { Bola } from "./lib/bola.js"

// https://www.youtube.com/watch?v=iEn0ozP-jxc&t=29s
// https://github.com/PolyMarsDev/Twini-Golf

/*

Penjelasan:
Bola golf Catur

bola golf akan dipukul dengan posisi mouse semakin jauh posisi mouse dengan bola semakin tinggi velocitynya 
bola akan memantul-mantul sampai akhirnya berhenti dengan velocity x: 0, y: 0 dikarenakan dengan friction (gesekan)
golf yang dapat memperlambat velocity golf tersebut

Var yang diperlukan:
objek bola untuk menyimpan data bola seperti posisi, radius, warna, kecepatan, arah, dan velocity
object catur yang menangani caturnya

click mouse dengan posisi dapat posisi mouse
??? kalkulasi jarak dan arah posisi mouse dengan posisi golf ??? (Antara pakai kekuatan pukulan atau jarak mouse)
??? jadikan velocity dengan arah kali jarak bagi angka ??? (hasil terlalu cepat)
jika kena tembok canvas velocity diubah menjadi negativ tapi ditambah check velocity if
jika velocity kekanan maka velcoity akan diubah kenegatif x dan sebaliknya y 
??? velocity tiba-tiba berkurang oleh fraction ??? (tidak bisa if kurangi velocity langsung)
Cek velocity x: 0, y: 0 maka akan mengaktifkan cek posisi dan mengubah canMove = false
cek posisi apakah ada di posisi target pilihan catur kalo tidak skip aktifkan canMove = true
kalo ada maka simpan bidak nya dan set canMove = true
ulangi lagi puku golf golfnya
cek posisi legal move kalo bisa maka bidak akan bergerak

caturnya
punya data array 1D/2D
simpan atau kalkulasi tata letak bidak dan kotak
periksa bidak yang bisa digerkaan
    for i in data
        if      
        if i.pos - 1 == ' ' (kosong) maka bisa
        else (ada bidak) tidak bisa
periksa input apakah legal move
    legalmove = chess.cariLegalMove() 
    if legalmove.includes(move) 
        gerak animasi()
        animasi gerkan dengan waktu
setelah gerakan selesai maka
if (move(done))
    set canMove = true;

*/

// Global
const lib = new DrawLib("my_canvas");
const lib2 = new DrawLib("my_canvas2");
const papan = new Papan(lib2);

const canvasWidth = lib.c_handler.width;
const canvasHeight = lib.c_handler.height;

let bola = new Bola(canvasWidth/2, canvasHeight/2, 20, 0.01, {r:0, g:0, b:0, a:255}, lib);

let turn = 'p';


let warna = {r:0, g:0, b:0, a:255};
let warnaHijau = {r:0, g:255, b:0, a:255};
let warnaBiru = {r:0, g:0, b:255, a:255};


// let bola = {
//     x: canvasWidth/2, 
//     y: canvasHeight/2, 
//     r: 20, 
//     color: warna, 
//     speed: 5, 
//     arah: {x: 0, y: 0}, 
//     velocity: {vx: 0, vy: 0}
// };

// fungsi cari kotak
function cariKotak(strBidak) {
    let temp = [];
    if ('p' == strBidak) {
        papan.bidakPutih.forEach(bidak => {
            if (bidak.bisaGerakKe.length != 0) {
                temp.push(bidak.lokasiIndex);
            }
        });
    } else if ('h' == strBidak) {
        papan.bidakHitam.forEach(bidak => {
            if (bidak.bisaGerakKe.length != 0) {
                console.log(bidak);
                temp.push(bidak.lokasiIndex);
            }
        });
    }
    return temp;
}

let bolaBerhenti = true;

let kotak = [];

let awal = false;

var startTime = new Date().getTime();
function animasi() {

    bola.gesekanBola();

    bola.stopVelocity(0.01);

    bola.pantulanBola(canvasWidth, canvasHeight);

    let m = MatrixUtility.createTranslationMatrix(bola.velocity.x, bola.velocity.y);

    let hasil = MatrixUtility.transform_titik({x: bola.x, y: bola.y}, m);

    bola.x = hasil.x;
    bola.y = hasil.y;

    bola.gesekanBola();

    bola.pantulanBola(canvasWidth, canvasHeight);
    
    bolaBerhenti = bola.stopVelocity(0.01);

    lib.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    lib.image_data = lib.ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    kotak.forEach(lokasi => {
        bola.drawKotakIndex(lokasi, canvasWidth);
    });
    lib.lingkaranFill(bola.x, bola.y, bola.r, bola.warna);

    lib.Draw();
    
    if (!bolaBerhenti) {
        requestAnimationFrame(animasi);
    } else {
        lib.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        lib.image_data = lib.ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        if (awal != false) {
            move(awal, Math.floor(bola.x/(canvasWidth/8)) + Math.floor(bola.y/(canvasHeight/8))*8);
            papan.setSemuaBidakGerakNull(turn);
            papan.setSemuaBidakGerak(turn);

            awal = false;
            console.log(turn);

            kotak = cariKotak(turn);
            console.log(kotak);

        } else {
            awal = Math.floor(bola.x/(canvasWidth/8)) + Math.floor(bola.y/(canvasHeight/8))*8;
            
        
            if (kotak.includes(awal)) {
                kotak = [];
                kotak = papan.grid[awal].bisaGerakKe;
                console.log(kotak);
            } else {
                awal = false;
                kotak = [];
                
                if (turn == 'p') {
                    turn = 'h';
                } else {
                    turn = 'p';
                }
                papan.setSemuaBidakGerakNull(turn);
                papan.setSemuaBidakGerak(turn);

                kotak = cariKotak(turn);
                console.log(turn, kotak);
            }
        }
        kotak.forEach(lokasi => {
            bola.drawKotakIndex(lokasi, canvasWidth);
        });

        lib.lingkaranFill(bola.x, bola.y, bola.r, bola.warna);

        lib.Draw();
        console.log(kotak);

    }
}


export function move(awal, akhir) {

    papan.setSemuaBidakGerak(turn);
    let berhasil = papan.gerakBidak(awal, akhir);

    papan.setSemuaBidakGerakNull(turn);
    
    // papan.drawSemuaKotak();
    // papan.drawSemuaBidak();

    papan.drawKotakIndex(awal);
    papan.drawKotakIndex(akhir);
    if (berhasil) {
        papan.drawBidakIndex(akhir);
    } else {
        papan.drawBidakIndex(awal);
    }


    if (turn == 'p') {
        turn = 'h';
    } else {
        turn = 'p';
    }

    // lib.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    // lib.image_data = lib.ctx.getImageData(0, 0, canvasWidth, canvasHeight);



    lib.Draw();
    lib2.Draw();
}
// How to use the function in console developer mode
// debugging
window.move = move;
window.papan = papan;


function main() {
    const slider = document.getElementById('volume');
    papan.setSemuaBidakGerak(turn);

    kotak = cariKotak(turn);

    lib.c_handler.addEventListener("click", function(evt) {
        let x = evt.offsetX;
        let y = evt.offsetY;
        console.log(x, y);
        if (bolaBerhenti) { 
            let pukul = slider.max - slider.value+1;
            bola.pukulBola(x, y, pukul);
            console.log("sadadsads",pukul);
            bolaBerhenti = false;
            animasi();
        }
    });

    kotak.forEach(lokasi => {
        bola.drawKotakIndex(lokasi, canvasWidth);
    });
    lib.lingkaranFill(bola.x, bola.y, bola.r, bola.warna);

    lib.Draw();

    // Draw the chessboard on the canvas
    papan.drawSemuaKotak();
    papan.drawSemuaBidak();
    lib2.Draw();
}

main();