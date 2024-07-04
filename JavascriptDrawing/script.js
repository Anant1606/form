const canvas = document.getElementById("drawing-board");
const toolbar = document.getElementById("toolbar");
const ctx = canvas.getContext("2d");

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = 700;
canvas.height = 200;

let isPainting = false;
let startX;
let startY;

toolbar.addEventListener("click", (e) => {
  if (e.target.id === "clear") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  } else if (e.target.id === "download") {
    const imgData = canvas.toDataURL("image/png", 1.0);

    const downloadLink = document.createElement("a");
    downloadLink.download = "canvas_image.png";
    downloadLink.href = imgData;
    downloadLink.click();
  }
});

const draw = (e) => {
  if (!isPainting) {
    return;
  }

  ctx.lineWidth = 5;
  ctx.lineCap = "round";

  ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
  ctx.stroke();
};

canvas.addEventListener("mousedown", (e) => {
  isPainting = true;
  startX = e.clientX;
  startY = e.clientY;
});

canvas.addEventListener("mouseup", (e) => {
  isPainting = false;
  ctx.stroke();
  ctx.beginPath();
});

canvas.addEventListener("mousemove", draw);
