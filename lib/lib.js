export class DrawLib {
    constructor (canvasid) {
        // console.log(canvasid);

        this.c_handler = document.querySelector(`#${canvasid}`);
        this.ctx = this.c_handler.getContext("2d");
        this.image_data = this.ctx.getImageData(0,0,
            this.c_handler.width, this.c_handler.height);
            // console.log(image_data);
    }

    setImageData(newData) {
        this.image_data = newData;
    }


    // debugging dari 1 demi 1 jadi busa dilihat garisnya dibuat
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    titik(x,y, color) {
        // await this.wait(1);
        if (x < this.c_handler.width && x > 0 && y < this.c_handler.height && y > 0) {
            let index = (Math.ceil(x) + (Math.ceil(y) * this.c_handler.height))*4;
            this.image_data.data[index] = color.r; // R
            this.image_data.data[index+1] = color.g; // G
            this.image_data.data[index+2] = color.b; // B
            this.image_data.data[index+3] = color.a; // A
        }
    }
    
    create_line(x0, y0, x1, y1, color) {
        const dy = y1-y0;
        const dx = x1-x0;

        let m = dy/dx;
        if (Math.abs(dx) >= Math.abs(dy)) {
            if (x0 <= x1) {
                for (let x = x0; x < x1; x++) {
                    const y = y0 + m * (x - x0);
                    this.titik(Math.round(x), Math.round(y), color);
                }
            } else {
                for (let x = x0; x>= x1; x--) {
                    const y = y0 + m * (x - x0);
                    this.titik(Math.round(x), Math.round(y), color);
                }
            }
        } else {
            m = dx/dy;
            if (y0 <= y1) {
                for (let y = y0; y < y1; y++) {
                    const x = x0 + m * (y - y0);
                    this.titik(Math.round(x), Math.round(y), color);
                }
            } else {
                for (let y = y0; y>= y1; y--) {
                    const x = x0 + m * (y - y0);
                    this.titik(Math.round(x), Math.round(y), color);
                }
            }
        }

    }

    polyLine(vertices, color) {
        console.log(vertices);
        if (vertices.length > 1) {
            for (let i = 0; i < vertices.length - 1; i++) {
                this.create_line(vertices[i][0], vertices[i][1], vertices[i+1][0], vertices[i+1][1], color);
            }
        } else {
            console.log("Kurang vertex");
        }
    }

    polyLineXY(vertices, color) {
        if (vertices.length > 1) {
            for (let i = 0; i < vertices.length - 1; i++) {
                this.create_line(vertices[i].x, vertices[i].y, vertices[i+1].x, vertices[i+1].y, color);
            }
        } else {
            console.log("Kurang vertex");
        }
    }

    polygon(vertices, color) {
        if (vertices.length > 1) {
            this.polyLine(vertices, color);
            this.create_line(vertices[vertices.length - 1][0], vertices[vertices.length - 1][1], vertices[0][0], vertices[0][1], color);
        } else {
            console.log("Kurang vertex");
        }
    }
    
    polygonXY(vertices, color) {
        if (vertices.length > 1) {
            this.polyLineXY(vertices, color);
            this.create_line(vertices[vertices.length - 1].x, vertices[vertices.length - 1].y, vertices[0].x, vertices[0].y, color);
        } else {
            console.log("Kurang vertex");
        }
    }
    // buat pisah untuk dapat jam tiap 12 
    buatVertex(xc, yc, r, numVertices) {
        let vertices = [];
        // Math.PI/2 = 360 derajat untuk contohnya hexagon berarti / 5 untuk dapat 5 vertex tiap baris tiap hexagonal
        let sudutSelanjutnya = 2*Math.PI/numVertices;
        // -(Math.PI/2) penyesuaian jadi mulai dati atas dulu
        for (let theta = -(Math.PI/2); theta < Math.PI*2-(Math.PI/2) /* kelebihan 1 jadi kurang sudutSelanjutnya */ ; theta += sudutSelanjutnya) {
            let x = xc + r * Math.cos(theta); 
            let y = yc + r * Math.sin(theta); 
            // vertices.push([Math.ceil(x), Math.ceil(y)]);
            vertices.push({x: Math.ceil(x), y: Math.ceil(y) });
        }
        /* alternatif
        for (let i = 0; i < numVertices; ++i) {
            let theta = (2 * Math.PI / numVertices) * i - (Math.PI/2); // untuk penyesuaian
            let x = xc + r * Math.cos(theta);
            let y = yc + r * Math.sin(theta);       
            vertices.push([Math.ceil(x), Math.ceil(y)]);
        }
        */
        console.log(vertices)
        return vertices;
    }

    gambarShape(xc, yc, radius, numVertices, color) {
        this.polygon(this.buatVertex(xc, yc, radius, numVertices, color), color);
    }

    lingkaranPolar(xc, yc, r, color) {
        for (let theta = 0; theta < Math.PI*2 /* radians */ ; theta += 0.001) {
            let x = xc + r * Math.cos(theta); 
            let y = yc + r * Math.sin(theta); 
            this.titik(Math.ceil(x), Math.ceil(y), color);
        }
    }

    lingkaranFill(xc, yc, r, color) {
        for (let theta = 0; theta < Math.PI*2 /* radians */ ; theta += 0.001) {
            let x = xc + r * Math.cos(theta); 
            let y = yc + r * Math.sin(theta); 
            this.create_line(xc, yc, x, y, color);
        }
    }

    colorRef(r, g, b, a) {
        return { r: r, g: g, b: b, a: a };
    }
   
    Draw() {
        this.ctx.putImageData(this.image_data,0,0); //draw 
    }

    floodFillStack(x0, y0, toFlood, color) {
        // chek kalo sama untuk menghidari looping
    

        let index = 4 * ( x0 + y0 * this.c_handler.width);
        let stack = [];
        stack.push({x: x0, y: y0});

        let iteration = 0;
        while (stack.length > 0) {
            iteration++;
            let titikSkrg = stack.pop();
            let indexTitik = 4 * (titikSkrg.x + titikSkrg.y * this.c_handler.width);

            let r0 = this.image_data.data[indexTitik];
            let g0 = this.image_data.data[indexTitik + 1];
            let b0 = this.image_data.data[indexTitik + 2];
            // debuging
            if(iteration == 1) {
                // console.log(r0, g0, b0, toFlood);
            } else if (iteration > this.c_handler.width * this.c_handler.width*4) {
                // jika Melebihi batas 
                // console.log(titikSkrg);
                // console.log(r0, g0, b0, toFlood);
                // console.log(titikSkrg);
            }
            if ((r0 == toFlood.r) && (g0 == toFlood.g) && (b0 == toFlood.b) 
            // && !(toFlood.r === color.r && toFlood.g === color.g && toFlood.b === color.b)
            ) {
                // Supaya tidak looping jika color = toflood sama
                this.image_data.data[indexTitik] = color.r;
                this.image_data.data[indexTitik + 1] = color.g;
                this.image_data.data[indexTitik + 2] = color.b;
                this.image_data.data[indexTitik + 3] = color.a;
                
                // visualisasi
                // await this.wait(1);
                // this.ctx.putImageData(this.image_data,0,0); //draw 
                
                stack.push({x: titikSkrg.x-1, y: titikSkrg.y})
                stack.push({x: titikSkrg.x+1, y: titikSkrg.y})
                stack.push({x: titikSkrg.x, y: titikSkrg.y+1})
                stack.push({x: titikSkrg.x, y: titikSkrg.y-1})
    
            }
            
        }
        // console.log("fungsi berhasil interasi ke: ",iteration);
    }
    

    mengambilWarnaImage(x, y) {
        let index = (Math.ceil(x) + (Math.ceil(y) * this.c_handler.height))*4;

        // let index = ( x0 + y0 * this.c_handler.width) * 4;
        return this.colorRef(this.image_data.data[index],this.image_data.data[index+1],this.image_data.data[index+2],this.image_data.data[index+3]);
    }

    angkaRandom(angkaKecil, angkaAkhir) {
        return Math.floor(Math.random() * (angkaAkhir - angkaKecil)) + angkaKecil;
    }
    
    persegiPanjang(xc, yc, sisi0, sisi1, color) {
        let titik = [
            [xc-sisi0/2, yc-sisi1/2],
            [xc+sisi0/2, yc-sisi1/2],
            [xc+sisi0/2, yc+sisi1/2],
            [xc-sisi0/2, yc+sisi1/2]
        ];
        this.polygon(titik, color);
    }

    

};
