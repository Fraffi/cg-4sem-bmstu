import {dot, draw_on_dots, getRndColor} from './funcs.js';

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

function on_click_func(ctx, canvas, e)
{
    let coords = getCursorPosition(ctx, canvas, e);
    push_coords(coords[0], coords[1], dots_counter);
    dot(ctx, getRndColor(), dots[dots_counter].x, dots[dots_counter].y);
    dots_counter += 1;
    draw_on_dots(dots_counter, ctx, dots);
}

canvas.addEventListener('mousedown', function(evt) {
    on_click_func(ctx, canvas, evt);
});

$('.task-button').click(function(evt) {
  evt.preventDefault();
  $('.task-menu').toggleClass('task_show');
});

$('.task').click(function(evt) {
    evt.preventDefault();
    $('.task-menu').removeClass('task_show');
});
