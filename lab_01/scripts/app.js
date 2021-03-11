import {dot, draw_on_dots, getRndColor} from './funcs.js';

let dots = [];

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

function push_coords(x, y, dots_counter)
{
    let in_flag = check_in_arr(x, y, dots);
    if (in_flag === 0)
    {
        dots[dots_counter] = {};
        dots[dots_counter].x = x;
        dots[dots_counter].y = y;
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

function new_btn(x, y)
{
    let new_btn = document.createElement('button');
    new_btn.setAttribute('id',x + '-' + y);
    let co_btn = document.querySelector('.coordinates-buttons');
    new_btn.innerText = 'X = ' + x + ', ' + 'Y = ' + y;
    new_btn.addEventListener('click', function() {
        on_click_coords_b(new_btn.id, dots);
    });
    co_btn.appendChild(new_btn);
}

function on_click_func(ctx, canvas, evt)
{
    let coords = getCursorPosition(ctx, canvas, evt);
    let in_flag = push_coords(coords[0], coords[1], dots.length);
    if (in_flag === 0)
    {
        dot(ctx, getRndColor(), dots[dots.length - 1].x, dots[dots.length - 1].y);
        new_btn(dots[dots.length - 1].x, dots[dots.length - 1].y);
        draw_on_dots(dots.length, ctx, dots);
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

function on_click_coords_b(name){
    for (let i = 0; i < dots.length; i++)
    {
        if (name === dots[i].x + '-' + dots[i].y)
        {
            dots.splice(i, 1);
        }
    }
    document.getElementById(name).remove();
}