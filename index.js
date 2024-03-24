import "./dft.js";
import { fft } from "./dft.js";
import { Complex } from "./utils/complex.js";
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let isHolding = false;
const N = 100;
const samples = new Array(N).fill(-1);
window.addEventListener("load", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
canvas.addEventListener("mousedown", eventData => {
    isHolding = true;
});
canvas.addEventListener("mousemove", eventData => {
    if (!isHolding)
        return;
    const k = Math.max(0, Math.min(N - 1, Math.round(eventData.x / canvas.width * N)));
    samples[k] = eventData.y;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#000";
    context.beginPath();
    for (let i = 0; i < N - 1; i++) {
        const x = i * canvas.width / N;
        const nextX = (i + 1) * canvas.width / N;
        if (samples[i] === -1)
            samples[i] = canvas.height;
        if (samples[i + 1] === -1)
            samples[i + 1] = canvas.height;
        moveTo(x, samples[i]);
        context.lineTo(nextX, samples[i + 1]);
    }
    context.stroke();
});
canvas.addEventListener("mouseup", eventData => {
    isHolding = false;
    const sample = new Array(Math.pow(2, Math.ceil(Math.log2(N)))).fill(undefined).map((_, i) => {
        return samples[i] ?? 0;
    });
    const frequencies = fft(
    // sample.map(element => new Complex(element))
    sample.map(element => new Complex((element / canvas.height - 0.5) * 2))).map(frequency => frequency).slice(0, 100);
    context.strokeStyle = "#F00";
    context.beginPath();
    for (let i = 0; i < N - 1; i++) {
        const x = i * canvas.width / N;
        const nextX = (i + 1) * canvas.width / N;
        moveTo(x, (canvas.height / 2) - frequencies[i].real);
        context.lineTo(nextX, (canvas.height / 2) - (frequencies[i + 1].real * 10));
    }
    context.stroke();
    context.closePath();
    context.strokeStyle = "#00F";
    context.beginPath();
    for (let i = 0; i < N - 1; i++) {
        const x = i * canvas.width / N;
        const nextX = (i + 1) * canvas.width / N;
        moveTo(x, (canvas.height / 2) - frequencies[i].imagine);
        context.lineTo(nextX, (canvas.height / 2) - (frequencies[i + 1].imagine * 10));
    }
    context.stroke();
    context.closePath();
    console.log(frequencies.length);
});
