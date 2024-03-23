export class Complex {
    real;
    imagine;
    constructor(real = 0, imagine = 0) {
        this.real = real;
        this.imagine = imagine;
    }
    static round(x, y) {
        const constant = 10 ** y;
        return Math.round(x * constant) / constant;
    }
    static expWithI(x) {
        return new Complex(Complex.round(Math.cos(x), 12), Complex.round(Math.sin(x), 12));
    }
    get lengthSquared() {
        return this.real ** 2 + this.imagine ** 2;
    }
    get length() {
        return this.lengthSquared ** 0.5;
    }
    get clone() {
        return new Complex(this.real, this.imagine);
    }
    round(x) {
        this.real = Complex.round(this.real, x);
        this.imagine = Complex.round(this.imagine, x);
        return this;
    }
    add(other) {
        if (typeof other === "number")
            this.real += other;
        else {
            this.real += other.real;
            this.imagine += other.imagine;
        }
        return this;
    }
    sub(other) {
        if (typeof other === "number")
            this.real -= other;
        else {
            this.real -= other.real;
            this.imagine -= other.imagine;
        }
        return this;
    }
    mul(other) {
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
    div(other) {
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
    toString() {
        if (this.real === 0) {
            if (this.imagine === 0)
                return `0`;
            else
                return `${this.imagine}i`;
        }
        else {
            if (this.imagine === 0)
                return `${this.real}`;
            else
                return `${this.real} ${Math.sign(this.imagine) === 1 ? "+" : "-"} ${Math.abs(this.imagine)}i`;
        }
    }
}
const a = new Complex(7);
const b = new Complex(2);
console.log(`${a.div(b)}`);
