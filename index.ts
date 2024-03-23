import "./dft.js"
import { dft, makeSample } from "./dft.js";
import { Complex } from "./utils/complex.js";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

let isHolding = false;
const N = 200;
const samples = new Array(N).fill(-1);

window.addEventListener("load", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

canvas.addEventListener("mousedown", eventData => {
    isHolding = true;
})

canvas.addEventListener("mousemove", eventData => {
    if (!isHolding) return;

    const k = Math.max(0, Math.min(N - 1, Math.round(eventData.x / canvas.width * N)));

    samples[k] = eventData.y;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#000";
    context.beginPath();
    for (let i = 0; i < N - 1; i++) {
        const x = i * canvas.width / N;
        const nextX = (i + 1) * canvas.width / N;
        if (samples[i] === -1) samples[i] = canvas.height;
        if (samples[i + 1] === -1) samples[i + 1] = canvas.height;
        moveTo(x, samples[i]);
        context.lineTo(nextX, samples[i + 1]);
    }
    context.stroke();
});

canvas.addEventListener("mouseup", eventData => {
    isHolding = false;

    const sample = makeSample(0, 1 / 200, 1 - (1 / 200), x => {
        const value = Math.cos(2 * Math.PI * 20 * x);
        return Math.round(value * 1_000_000) / 1_000_000;
    });

    const frequencies = dft(
        // sample.map(element => new Complex(element))
        samples.map(element => new Complex((element / canvas.height - 0.5) * 2))
    ).map(frequency => frequency)

    context.strokeStyle = "#F00";
    context.beginPath();
    for (let i = 0; i < N - 1; i++) {
        const x = i * canvas.width / N;
        const nextX = (i + 1) * canvas.width / N;
        moveTo(x, canvas.height - frequencies[i].real);
        context.lineTo(nextX, canvas.height - (frequencies[i + 1].real * 10));
    }
    context.stroke();
    context.closePath();

    context.strokeStyle = "#F0F";
    context.beginPath();
    for (let i = 0; i < N - 1; i++) {
        const x = i * canvas.width / N;
        const nextX = (i + 1) * canvas.width / N;
        moveTo(x, canvas.height - frequencies[i].imagine);
        context.lineTo(nextX, canvas.height - (frequencies[i + 1].imagine * 10));
    }
    context.stroke();
    context.closePath();
});