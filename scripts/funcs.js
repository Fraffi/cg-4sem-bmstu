function dot(ctx, colour, x, y)
{
    //ctx.translate(0.5, 0.5);
    ctx.fillStyle = colour;
    console.log(x, y);
    ctx.fillRect(x, y, 1, 1);
}

function getRndColor() {
    let r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function draw_tri(ctx, x1, y1, x2, y2, x3, y3)
{
    //ctx.translate(0.5, 0.5);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.strokeStyle = getRndColor();
    ctx.closePath();
    ctx.stroke();
}

export {dot, draw_tri, getRndColor};