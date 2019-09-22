class PlanetGenerator {
    constructor(canvasEl) {
        this.canvasEl = canvasEl;
        this.ctx = canvasEl.getContext('2d');
        this.pixels = this.Create2DArray(32);
        this.canvasEl.width = 256;
        this.canvasEl.height = 256;
    }

    Create2DArray(rows) {
        const arr = [];
        for (let i = 0; i < rows; i++) {
            arr[i] = [];
        }
        return arr;
    }

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

    getPixel(x, y) {
        return {
            x,
            y,
            rgba: this.pixels[x][y] ? this.pixels[x][y] : 'rgba(0, 0, 0, 255)'
        };
    }

    rgba(r, g, b, a) {
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    setPixel(x, y, rgba) {
        this.pixels[x][y] = rgba;
    }
}

function initGenerator() {
    const canvas = document.getElementById('planetCanvas');
    const pGen = new PlanetGenerator(canvas);
    pGen.setPixel(12, 12, pGen.rgba(255, 0, 0, 255));
    pGen.render();
}

window.addEventListener('load', initGenerator);
