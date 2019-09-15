class PlanetGenerator {
    constructor(canvasEl) {
        this.canvasEl = canvasEl;
        this.ctx = canvasEl.getContext('2d');
        this.pixels = Create2DArray(32);
        this.canvasEl.width = 256;
        this.canvasEl.height = 256;
    }

    render() {

    }

    save() {

    }

    getPixel(x, y) {

    }

    setPixel(x, y, rgba) {
        this.ctx.scale(8, 8);
        this.pixels[x][y] = rgba;
        this.ctx.fillStyle = rgba;
        this.ctx.fillRect(x, y, 1, 1);
        console.log(this.pixels);

    }
}

function Create2DArray(rows) {
    const arr = [];
    for (let i = 0; i < rows; i++) {
        arr[i] = [];
    }
    return arr;
}

function initGenerator() {
    const pGen = new PlanetGenerator(document.getElementById('planetCanvas'));
    pGen.setPixel(12, 12, 'rgba(255, 0, 0, 255)');
}

window.addEventListener('load', initGenerator);