//Initial Data
let currentColor = 'black';
let canDraw = false;
let mouseX = 0;
let mouseY = 0;
let brushSize = 5;
let isErasing = false;

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

//Events
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', handleColorClick);
});
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mouseup', handleMouseUp);
document.querySelector('.clear').addEventListener('click', clearCanvas);
document.querySelector('.eraser').addEventListener('click', toggleEraser);

const colorPicker = document.querySelector('#colorPicker');
colorPicker.addEventListener('input', (e) => {
    currentColor = e.target.value;
    isErasing = false;
    document.querySelector('.eraser').classList.remove('active');
});

const brushInput = document.querySelector('#brushSize');
const brushValue = document.querySelector('#brushValue');
brushInput.addEventListener('input', (e) => {
    brushSize = e.target.value;
    brushValue.innerText = `${brushSize} px`;
});

//Functions
function handleColorClick(e) {
    let color = e.target.getAttribute('data-color');
    currentColor = color;
    isErasing = false;
    ctx.globalCompositeOperation = 'source-over';

    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
    document.querySelector('.eraser').classList.remove('active');
}

function handleMouseDown(e) {
    canDraw = true;
    mouseX = e.pageX - canvas.offsetLeft;
    mouseY = e.pageY - canvas.offsetTop;
}

function handleMouseMove(e) {
    if (canDraw) {
        draw(e.pageX, e.pageY);
    }
}

function handleMouseUp() {
    canDraw = false;
}

function draw(x, y) {
    let pointX = x - canvas.offsetLeft;
    let pointY = y - canvas.offsetTop;

    ctx.beginPath();
    ctx.lineWidth = brushSize;
    ctx.lineJoin = "round";
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath();
    ctx.strokeStyle = currentColor;
    ctx.stroke();

    mouseX = pointX;
    mouseY = pointY;
}

function clearCanvas() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function toggleEraser() {
    isErasing = !isErasing;
    if (isErasing) {
        ctx.globalCompositeOperation = 'destination-out';
        document.querySelector('.eraser').classList.add('active');
    } else {
        ctx.globalCompositeOperation = 'source-over';
        document.querySelector('.eraser').classList.remove('active');
    }
}
``
