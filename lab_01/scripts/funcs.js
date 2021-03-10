function dot(ctx, color, x, y)
{
    ctx.beginPath ();
    ctx.arc (x, y, 2, 0, Math.PI * 2, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke();
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

function draw_on_dots(dots_counter, ctx, dots)
{
    if (((dots_counter % 3) === 0) && (dots_counter !== 0))
    {
        draw_tri(ctx, dots[dots_counter - 3].x, dots[dots_counter - 3].y,
            dots[dots_counter - 2].x, dots[dots_counter - 2].y,
            dots[dots_counter - 1].x, dots[dots_counter - 1].y);
    }
}

export {dot, draw_on_dots, getRndColor};