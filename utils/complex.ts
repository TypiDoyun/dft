export class Complex {
    public constructor(
        public real: number = 0,
        public imagine: number = 0
    ) {

    }

    public static round(x: number, y: number) {
        const constant = 10 ** y;

        return Math.round(x * constant) / constant;
    }

    public static expWithI(x: number) {
        return new Complex(
            Complex.round(Math.cos(x), 12),
            Complex.round(Math.sin(x), 12)
        );
    }

    public get lengthSquared() {
        return this.real ** 2 + this.imagine ** 2;
    }

    public get length() {
        return this.lengthSquared ** 0.5;
    }

    public get clone() {
        return new Complex(this.real, this.imagine);
    }

    public round(x: number) {
        this.real = Complex.round(this.real, x);
        this.imagine = Complex.round(this.imagine, x);

        return this;
    }

    public add(other: Complex | number) {
        if (typeof other === "number") this.real += other;
        else {
            this.real += other.real;
            this.imagine += other.imagine;
        }
        return this;
    }

    public sub(other: Complex | number) {
        if (typeof other === "number") this.real -= other;
        else {
            this.real -= other.real;
            this.imagine -= other.imagine;
        }
        return this;
    }

    public mul(other: Complex | number) {
        if (typeof other === "number") {
            this.real *= other;
            this.imagine *= other;
        }
        else {
            const a = this.real;
            const b = this.imagine;
            const c = other.real;
            const d = other.imagine;
            this.real = a * c - b * d;
            this.imagine = a * d + b * c;
        }
        return this;
    }
    
    public div(other: Complex | number) {
        if (typeof other === "number") {
            this.real /= other;
            this.imagine /= other;
        }
        else {
            const denominator = other.real ** 2 + other.imagine ** 2;
            const a = this.real;
            const b = this.imagine;
            const c = other.real;
            const d = other.imagine;
            this.real = (a * c + b * d) / denominator;
            this.imagine = (-a * d + b * c) / denominator;
        }
        return this;
    }

    public toString() {
        if (this.real === 0) {
            if (this.imagine === 0) return `0`;
            else return `${this.imagine}i`;
        }
        else {
            if (this.imagine === 0) return `${this.real}`;
            else return `${this.real} ${Math.sign(this.imagine) === 1 ? "+" : "-"} ${Math.abs(this.imagine)}i`;
        }
    }
}

const a = new Complex(7);
const b = new Complex(2);

console.log(`${a.div(b)}`)