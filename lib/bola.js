export class ball {
    constructor (posisi, radius, friction) {
        this.posisi = posisi;
        this.r = radius;
        this.velocity = {x: 0, y: 0};
        this.velocity1D = 0;
        this.color = {r: 0, g: 0, b: 0, a: 255};
        this.canMove = true;
        this.friction = friction;
    }
}

export class Ball {
    constructor(pos, texture, pointTexture, powerMTexFG, powerMTexBG, index) {
        this.position = pos; // { x: number, y: number }
        this.texture = texture;
        this.pointTexture = pointTexture;
        this.powerMTexFG = powerMTexFG;
        this.powerMTexBG = powerMTexBG;
        this.index = index;

        this.velocity = { x: 0, y: 0 };
        this.launchedVelocity = { x: 0, y: 0 };
        this.initialMousePos = { x: 0, y: 0 };
        this.target = { x: 0, y: 0 };
        this.strokes = 0;
        this.win = false;
        this.canMove = true;
        this.playedSwingFx = true;
        this.friction = 0.001;
        this.points = [{ position: { x: -64, y: -64 }, texture: pointTexture }];
        this.powerBar = [
            { position: { x: -64, y: -64 }, texture: powerMTexBG },
            { position: { x: -64, y: -64 }, texture: powerMTexFG }
        ];
    }

    getVelocity() {
        return this.velocity;
    }

    getInitialMousePos() {
        return this.initialMousePos;
    }

    getPoints() {
        return this.points;
    }

    getPowerBar() {
        return this.powerBar;
    }

    getStrokes() {
        return this.strokes;
    }

    isWin() {
        return this.win;
    }

    setWin(value) {
        this.win = value;
    }

    setInitialMousePos(x, y) {
        this.initialMousePos = { x, y };
    }

    setVelocity(x, y) {
        this.velocity = { x, y };
    }

    setLaunchedVelocity(x, y) {
        this.launchedVelocity = { x, y };
    }

    update(deltaTime, mouseDown, mousePressed, tiles, holes, chargeSfx, swingSfx, holeSfx) {
        if (this.win) {
            this.moveToTarget(deltaTime);
            return;
        }

        this.checkForWin(holes, holeSfx);

        if (mousePressed && this.canMove) {
            this.handleMousePressed(chargeSfx);
        }

        if (mouseDown && this.canMove) {
            this.handleMouseDrag();
        } else {
            this.handleMouseRelease(swingSfx);
        }

        this.updatePosition(deltaTime, tiles);
    }

    moveToTarget(deltaTime) {
        if (this.position.x < this.target.x) {
            this.position.x += 0.1 * deltaTime;
        } else if (this.position.x > this.target.x) {
            this.position.x -= 0.1 * deltaTime;
        }
        if (this.position.y < this.target.y) {
            this.position.y += 0.1 * deltaTime;
        } else if (this.position.y > this.target.y) {
            this.position.y -= 0.1 * deltaTime;
        }
    }

    checkForWin(holes, holeSfx) {
        for (const hole of holes) {
            if (this.isCollidingWithHole(hole)) {
                this.playSound(holeSfx);
                this.setWin(true);
                this.target = { x: hole.position.x, y: hole.position.y + 3 };
            }
        }
    }

    isCollidingWithHole(hole) {
        return this.position.x + 4 > hole.position.x &&
               this.position.x + 16 < hole.position.x + 20 &&
               this.position.y + 4 > hole.position.y &&
               this.position.y + 16 < hole.position.y + 20;
    }

    handleMousePressed(chargeSfx) {
        this.playSound(chargeSfx);
        this.playedSwingFx = false;
        const { x: mouseX, y: mouseY } = this.getMousePosition();
        this.setInitialMousePos(mouseX, mouseY);
    }

    handleMouseDrag() {
        const { x: mouseX, y: mouseY } = this.getMousePosition();
        const velocityX = (mouseX - this.initialMousePos.x) / -150;
        const velocityY = (mouseY - this.initialMousePos.y) / -150;
        this.setVelocity(velocityX, velocityY);
        this.setLaunchedVelocity(velocityX, velocityY);
        this.updatePowerBar();
        this.updatePoints();
    }

    handleMouseRelease(swingSfx) {
        if (!this.playedSwingFx) {
            this.playSound(swingSfx);
            this.playedSwingFx = true;
            this.strokes++;
        }
        this.resetPointsAndPowerBar();
        this.canMove = false;
    }

    updatePowerBar() {
        const velocity1D = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
        const launchedVelocity1D = velocity1D;

        this.points[0].position = { x: this.position.x, y: this.position.y + 8 - 32 };
        const dirX = this.velocity.x / Math.abs(this.velocity.x);
        const dirY = this.velocity.y / Math.abs(this.velocity.y);
        
        this.powerBar[0].position = { x: this.position.x + 32 + 8, y: this.position.y - 32 };
        this.powerBar[1].position = {
            x: this.position.x + 32 + 8 + 4,
            y: this.position.y - 32 + 4 + 32 - 32 * this.powerBar[1].scale
        };

        if (velocity1D > 1) {
            this.powerBar[1].scale = 1;
        } else {
            this.powerBar[1].scale = velocity1D;
        }
    }

    resetPointsAndPowerBar() {
        this.points[0].position = { x: -64, y: -64 };
        this.powerBar[0].position = { x: -64, y: -64 };
        this.powerBar[1].position = { x: -64, y: -64 };
        this.canMove = false;
    }

    updatePosition(deltaTime, tiles) {
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;

        this.handleCollisions(tiles);
        this.applyFriction(deltaTime);
    }

    handleCollisions(tiles) {
        for (const tile of tiles) {
            if (this.isCollidingWithTile(tile)) {
                this.velocity.x *= -1;
            }
            if (this.isCollidingWithTile(tile, true)) {
                this.velocity.y *= -1;
            }
        }
    }

    isCollidingWithTile(tile, checkVertical = false) {
        const newX = checkVertical ? this.position.x : this.position.x + this.velocity.x;
        const newY = checkVertical ? this.position.y + this.velocity.y : this.position.y;

        return newX + 16 > tile.position.x && newX < tile.position.x + tile.width &&
               newY + 16 > tile.position.y && newY < tile.position.y + tile.height - 3;
    }

    applyFriction(deltaTime) {
        if (Math.abs(this.velocity.x) > 0.0001 || Math.abs(this.velocity.y) > 0.0001) {
            this.velocity.x *= (1 - this.friction * deltaTime);
            this.velocity.y *= (1 - this.friction * deltaTime);
        } else {
            this.setVelocity(0, 0);
            this.setInitialMousePos(this.getMousePosition().x, this.getMousePosition().y);
            this.canMove = true;
        }
    }

    getMousePosition() {
        return { x: mouseX, y: mouseY };
    }

}
