import "./dft.js"
import { dft } from "./dft.js";
import { Complex } from "./utils/complex.js";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

let isHolding = false;
const N = 200;
const samples = new Array(N + 1).fill(-1);

window.addEventListener("load", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

canvas.addEventListener("mousedown", eventData => {
    isHolding = true;
})

canvas.addEventListener("mousemove", eventData => {
    if (!isHolding) return;

    const k = Math.round(eventData.x / canvas.width * N);

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

    const frequencies = dft(
        samples.map(element => new Complex(element))
    )

    
})