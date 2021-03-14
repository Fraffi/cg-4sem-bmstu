function dot(ctx, x, y, width, color, s_color)
{
    ctx.beginPath ();
    ctx.arc (x, y, 2, 0, Math.PI * 2, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = width;
    ctx.strokeStyle = s_color;
    ctx.stroke();
}

/*function clear_dot(ctx, x, y)
{
    dot(ctx, x, y, 3, 'white', 'white');
}*/

function redraw_dots(ctx, dots)
{
    for (let i = 0; i < dots.length; i++)
    {
        dot(ctx, dots[i].x, dots[i].y);
    }
}

function redraw_tri(ctx, dots)
{
    let dots_counter = dots.length;
    while ((dots_counter % 3) !== 0)
    {
        dots_counter--;
    }
    for (let i = 0; i < dots_counter; i++)
    {
        draw_on_dots(ctx, dots, i+1);
    }
}

function getRndColor() {
    let r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function draw_tri(ctx, x1, y1, x2, y2, x3, y3, color)
{
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.strokeStyle = color;
    ctx.closePath();
    ctx.stroke();
}

function draw_on_dots(ctx, dots, dots_counter)
{
    if (((dots_counter % 3) === 0) && (dots_counter !== 0))
    {
        draw_tri(ctx, dots[dots_counter - 3].x, dots[dots_counter - 3].y,
            dots[dots_counter - 2].x, dots[dots_counter - 2].y,
            dots[dots_counter - 1].x, dots[dots_counter - 1].y, getRndColor());
    }
}

export {dot, draw_on_dots, getRndColor, redraw_dots, redraw_tri};