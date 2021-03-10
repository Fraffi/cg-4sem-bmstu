import {dot, draw_on_dots, getRndColor} from './funcs.js';

let dots = [];
let dots_counter = 0;

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
    return in_flag;
}

function push_coords(x, y, i)
{
    let in_flag = check_in_arr(x, y, dots);
    if (in_flag === 0)
    {
        dots[i] = {};
        dots[i].x = x;
        dots[i].y = y;
    }
    return in_flag;
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

function on_click_func(ctx, canvas, evt)
{
    let coords = getCursorPosition(ctx, canvas, evt);
    let in_flag = push_coords(coords[0], coords[1], dots_counter);
    if (in_flag === 0)
    {
        dot(ctx, getRndColor(), dots[dots_counter].x, dots[dots_counter].y);
        dots_counter += 1;
        draw_on_dots(dots_counter, ctx, dots);
    }
}

canvas.addEventListener('click', function(evt) {
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
