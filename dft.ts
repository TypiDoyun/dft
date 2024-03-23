import { Complex } from "./utils/complex.js";

export const dft = (xArr: Complex[]) => {
    const N = xArr.length;
    const wCache = new Map<number, Complex>();
    const XArr: Complex[] = new Array(N).fill(undefined).map(element => new Complex());

    for (let k = 0; k < N; k++) {
        for (let n = 0; n < N; n++) {
            const kn = (k * n) % N;
            const x = xArr[n];
            const w = wCache.get(kn) ?? Complex.expWithI(-2 * Math.PI / N * kn);

            XArr[k].add(x.clone.mul(w));
        }
    }

    return XArr.map(value => value.round(6));
}

const makeSample = (from: number, interval: number, to: number, func: (x: number) => number) => {
    const sample: number[] = [];
    const relativeTo = to - from;

    let repeat = 0;
    let t = 0;

    while (t <= relativeTo) {
        sample.push(func(t));

        repeat++;
        t = Math.round((from + interval * repeat) * 1_000_000) / 1_000_000;
    }

    return sample;
}

const sample = makeSample(0, 0.01, 9.99, x => {
    const value = Math.cos(2 * Math.PI * 1.5 * x) + 2 * Math.cos(2 * Math.PI * 6.5 * x);
    return Math.round(value * 1_000_000) / 1_000_000;
}).map(element => new Complex(element));

console.log(
    dft(sample)
)