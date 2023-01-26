const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = 500;
const height = 500;
let scaleFactor = 1/125;
let originR = 0;
let originI = 0;
//cr = 0.25018777549400006 ci = 0.000004099827279999976

// sateenkaari värit"rgb(254, 0, 0)",
    
const colors = [
    "#010326",
    "#011140",
    "#112140",
    "#485673",
    "#F2F2F2",
];

function drawImage() {
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            plotInSet(x, y);
        }
    }
}
drawImage();

canvas.addEventListener("click", (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    const [cr, ci] = screenToWorld(x, y);
    originR = cr;
    originI = ci;

    scaleFactor = scaleFactor / 10;
    console.log("depth: ", scaleFactor);

    
    
    console.log(cr, ci);
    drawImage();
});


canvas.addEventListener("mousemove", (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    
    const [cr, ci] = screenToWorld(x, y);
    label.textContent = `cr = ${cr} \n ci = ${ci}`;

    //plotInSet(x, y);
});



function plotInSet(x, y) {
    // ctx.clearRect(0, 0, width, height);
    // console.log("x", x, "y", y);
    const [cr, ci] = screenToWorld(x, y);
    // console.log("r", cr, "i", ci);
    
    let zr = 0;
    let zi = 0;
    for (let k = 0; k < 10000; k++) {
        const _zr = zr * zr - zi * zi + cr;
        const _zi = 2 * zr * zi + ci;
        zr = _zr;
        zi = _zi;
        const dist = Math.sqrt(zr * zr + zi * zi);
        if (dist > 2) {
            const color = colors[k % colors.length];
            ctx.fillStyle = color;
            plotPoint(x, y, 1);
            return;
        }
        // const [x1, y1] = worldToScreen(zr, zi);
        
        // ctx.fillStyle = color;
        // plotPoint(x1, y1);
    }
    
    ctx.fillStyle = "black";
    plotPoint(x, y, 1);
}

function plotPoint(x, y, radius=1) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

function screenToWorld(x, y) {
    const r = originR + (x - width / 2) * scaleFactor;
    const i = originI - (y - height / 2) * scaleFactor;
    return [r, i];
}

function worldToScreen(r, i) {
    const x = (r - originR) / scaleFactor + width / 2;
    const y = -(i - originI) / scaleFactor + height / 2;
    return [x, y];
}

