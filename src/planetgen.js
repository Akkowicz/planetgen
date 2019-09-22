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

    midPointCircle(centerX, centerY, r, borderColor) {
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
}

function initGenerator() {
    const canvas = document.getElementById('planetCanvas');
    const pGen = new PlanetGenerator(canvas);
    pGen.midPointCircle(16, 16, 10, pGen.rgba(40, 150, 70, 255));
    pGen.render();
}

window.addEventListener('load', initGenerator);
