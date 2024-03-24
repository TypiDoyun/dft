import { Complex } from "./utils/complex.js";
export const dft = (xArr) => {
    const N = xArr.length;
    const wCache = new Map();
    const XArr = new Array(N).fill(undefined).map(element => new Complex());
    for (let k = 0; k < N; k++) {
        for (let n = 0; n < N; n++) {
            const kn = (k * n) % N;
            const x = xArr[n];
            const w = wCache.get(kn) ?? Complex.expWithI(-2 * Math.PI / N * kn);
            wCache.set(kn, w);
            XArr[k].add(x.clone.mul(w));
        }
    }
    return XArr.map(value => value.round(6));
};
export const fft = (xArr) => {
    const N = xArr.length;
    if (N === 1)
        return xArr;
    const even = [];
    const odd = [];
    for (let i = 0; i < N; i++) {
        if (i % 2 === 0)
            even.push(xArr[i]);
        else
            odd.push(xArr[i]);
    }
    const XEven = fft(even);
    const XOdd = fft(odd);
    const XArr = new Array(N);
    for (let i = 0; i < N / 2; i++) {
        const w = Complex.expWithI(-2 * Math.PI / N * i);
        XArr[i] = XEven[i].clone.add(XOdd[i].clone.mul(w));
        XArr[i + N / 2] = XEven[i].clone.sub(XOdd[i].clone.mul(w));
    }
    return XArr;
};
export const makeSample = (from, interval, to, func) => {
    const sample = [];
    const relativeTo = to - from;
    let repeat = 0;
    let t = 0;
    while (t <= relativeTo) {
        sample.push(func(t));
        repeat++;
        t = Math.round((from + interval * repeat) * 1_000_000) / 1_000_000;
    }
    return sample;
};
// const sample = makeSample(0, 0.01, 9.99, x => {
//     const value = Math.cos(2 * Math.PI * 1.5 * x) + 2 * Math.cos(2 * Math.PI * 6.5 * x);
//     return Math.round(value * 1_000_000) / 1_000_000;
// }).map(element => new Complex(element));
// console.log(
//     dft(sample)
// )
