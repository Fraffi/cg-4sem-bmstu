import {dot, draw_tri, getRndColor} from './funcs.js';

let dots = [];
let dots_counter = 0;
function push_coords(x, y, i)
{
    dots[i] = {};
    dots[i].x = x;
    dots[i].y = y;
}
const canvas = document.querySelector('canvas')
if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
}

function getCursorPosition(ctx, canvas, event)
{
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return[x, y];
}

function draw_on_dots(dots_counter, ctx)
{
    if (((dots_counter % 3) == 0) && (dots_counter != 0))
    {
        draw_tri(ctx, dots[dots_counter - 3].x, dots[dots_counter - 3].y,
            dots[dots_counter - 2].x, dots[dots_counter - 2].y,
            dots[dots_counter - 1].x, dots[dots_counter - 1].y);
    }
}

function on_click_func(ctx, canvas, e)
{
    let coords = getCursorPosition(ctx, canvas, e);
    push_coords(coords[0], coords[1], dots_counter);
    dot(ctx, getRndColor(), dots[dots_counter].x, dots[dots_counter].y);
    dots_counter += 1;
    draw_on_dots(dots_counter, ctx);
}

canvas.addEventListener('mousedown', function(e) {
    on_click_func(ctx, canvas, e);
})
