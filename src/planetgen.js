/**
 * @description Contains all of the planet related logic
 * @class PlanetGenerator
 */
class PlanetGenerator {
    /**
     * @description Creates an instance of PlanetGenerator.
     * @param {*} canvasEl
     * @memberof PlanetGenerator
     */
    constructor(canvasEl) {
        this.canvasEl = canvasEl;
        this.ctx = canvasEl.getContext('2d');
        this.pixels = this.Create2DArray(32);
        this.canvasEl.width = 256;
        this.canvasEl.height = 256;
        this.planet = {
            radius: 0,
            center: { x: 16, y: 16 },
            borderColor: this.rgba(20, 20, 30, 255),
            backgroundColor: ''
        };
    }

    /**
     * @description Generates a two dimensional array of specified size
     * @param {*} Size of the two dimensional array
     * @returns Two dimensional array of specified size
     * @memberof PlanetGenerator
     */
    Create2DArray(rows) {
        const arr = [];
        for (let i = 0; i < rows; i++) {
            arr[i] = [];
        }
        return arr;
    }

    /**
     * @description Renders all of the data stored in pixels 2D array.
     * @memberof PlanetGenerator
     */
    render() {
        this.ctx.scale(8, 8);
        for (let x in this.pixels) {
            for (let y in this.pixels) {
                const px = this.getPixel(x, y);
                this.ctx.fillStyle = px.rgba;
                this.ctx.fillRect(x, y, 1, 1);
            }
        }
    }

    /**
     * @description
     * @param {*} x
     * @param {*} y
     * @returns 
     * @memberof PlanetGenerator
     */
    getPixel(x, y) {
        return {
            x,
            y,
            rgba: this.pixels[x][y] ? this.pixels[x][y] : 'rgba(0, 0, 0, 255)'
        };
    }

    /**
     * @description
     * @param {*} r
     * @param {*} g
     * @param {*} b
     * @param {*} a
     * @returns 
     * @memberof PlanetGenerator
     */
    rgba(r, g, b, a) {
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    /**
     * @description
     * @param {*} x
     * @param {*} y
     * @param {*} rgba
     * @memberof PlanetGenerator
     */
    setPixel(x, y, rgba) {
        this.pixels[x][y] = rgba;
    }

    /**
     * @description
     * @param {*} centerX
     * @param {*} centerY
     * @param {*} r
     * @param {*} borderColor
     * @memberof PlanetGenerator
     */
    drawBorder(centerX, centerY, r, borderColor) {
        let x = r;
        let y = 0;

        // Set four initial points
        if (r > 0) {
            this.setPixel(x + centerX, -y + centerY, borderColor);
            this.setPixel(-x + centerX, y + centerY, borderColor);
            this.setPixel(y + centerX, x + centerY, borderColor);
            this.setPixel(-y + centerX, -x + centerY, borderColor);
        }

        // P value
        let P = 1 - r;

        while (x > y) {
            y++;

            if (P <= 0) {
                P = P + 2 * y + 1;
            } else {
                x--;
                P = P + 2 * y - 2 * x + 1;
            }

            // All points already set
            if (x < y) {
                break;
            }

            // Setting generated points
            this.setPixel(x + centerX, y + centerY, borderColor);
            this.setPixel(-x + centerX, y + centerY, borderColor);
            this.setPixel(x + centerX, -y + centerY, borderColor);
            this.setPixel(-x + centerX, -y + centerY, borderColor);

            if (x !== y) {
                this.setPixel(y + centerX, x + centerY, borderColor);
                this.setPixel(-y + centerX, x + centerY, borderColor);
                this.setPixel(y + centerX, -x + centerY, borderColor);
                this.setPixel(-y + centerX, -x + centerY, borderColor);
            }
        }
    }

    /**
     * @description
     * @memberof PlanetGenerator
     */
    background() {
        for (let x in this.pixels) {
            for (let y in this.pixels) {
                this.pixels[x][y] = this.planet.backgroundColor;

                // Add stars?
                if (Math.random() > 0.997) {
                    let starColor = this.rgba(
                        Math.round(Math.random() * 40 + 210),
                        Math.round(Math.random() * 10 + 210),
                        Math.round(Math.random() * 80 + 130),
                        Math.round(Math.random() * 120 + 130)
                    );
                    this.pixels[x][y] = starColor;
                }
            }
        }
    }

    /**
     * @description
     * @memberof PlanetGenerator
     */
    generateBasicPlanetData() {
        this.planet.backgroundColor = this.rgba(
            Math.round(Math.random() * 20 + 30),
            Math.round(Math.random() * 20 + 30),
            Math.round(Math.random() * 20 + 50),
            255
        );

        this.planet.radius = 9 + Math.round(Math.random() * 4);
    }

    /**
     * @description
     * @memberof PlanetGenerator
     */
    createPlanet() {
        this.generateBasicPlanetData();
        this.background();
        this.runOnPlanetSurface();
        this.drawBorder(
            this.planet.center.x,
            this.planet.center.y,
            this.planet.radius,
            this.planet.borderColor
        );
        this.render();
    }

    /**
     * @description
     * @memberof PlanetGenerator
     */
    runOnPlanetSurface() {
        for (let x in this.pixels) {
            for (let y in this.pixels) {
                if (this.isOnSurface(x, y)) {
                    console.log('On surface!');
                    this.setPixel(x, y, this.rgba(20, 40, 30, 255));
                } else {
                    console.log('Not on surface?');
                    console.log({ x, y });
                }
            }
        }
    }

    /**
     * @description
     * @param {*} x
     * @param {*} y
     * @returns {boolean}
     * @memberof PlanetGenerator
     */
    isOnSurface(x, y) {
        return (
            Math.pow(x - this.planet.center.x, 2) +
                Math.pow(y - this.planet.center.y, 2) <
            Math.pow(this.planet.radius, 2)
        );
    }
}

function initGenerator() {
    const canvas = document.getElementById('planetCanvas');
    const pGen = new PlanetGenerator(canvas);
    pGen.createPlanet();
}

window.addEventListener('load', initGenerator);
