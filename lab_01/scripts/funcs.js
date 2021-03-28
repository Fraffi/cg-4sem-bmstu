function dot(ctx, x, y, width, color, s_color, rad)
{
    ctx.beginPath ();
    ctx.arc (x, y, rad, 0, Math.PI * 2, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = width;
    ctx.strokeStyle = s_color;
    ctx.stroke();
}

function redraw_dots(ctx, dots)
{
    for (let i = 0; i < dots.length; i++)
    {
        dot(ctx, dots[i].x, dots[i].y, 1, 'red', 'black', 2);
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
            dots[dots_counter - 1].x, dots[dots_counter - 1].y, '#483D8B');
    }
}

function reset_all(ctx, canvas, dots)
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    redraw_dots(ctx, dots);
    redraw_tri(ctx, dots);
}

function check_in_arr(x, y, arr)
{
    let in_flag = 0;
    for (let i = 0; i < arr.length; i++)
    {
        if ((arr[i].x === x) && (arr[i].y === y))
        {
            in_flag = 1;
        }
    }
    if ((x < 0) || (y < 0))
    {
        in_flag = 1;
    }
    return in_flag;
}

function push_coords(x, y, dots_counter, arr)
{
    let in_flag = check_in_arr(x, y, arr);
    if (in_flag === 0)
    {
        arr[dots_counter] = {};
        arr[dots_counter].x = x;
        arr[dots_counter].y = y;
    }
    return in_flag;
}

function axes_drawing(ctx)
{
    ctx.translate(0, 0);
}

export {dot, draw_on_dots, getRndColor, reset_all, push_coords, axes_drawing};