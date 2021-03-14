import {dot, draw_on_dots, redraw_dots, redraw_tri} from './funcs.js';

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

function new_btn(ctx, x, y)
{
    let new_btn = document.createElement('button');
    new_btn.setAttribute('id',x + '-' + y);
    let co_btn = document.querySelector('.coordinates-buttons');
    new_btn.innerText = 'X = ' + x + ', ' + 'Y = ' + y;
    new_btn.addEventListener('click', function() {
        on_click_coords_b(ctx, new_btn.id);
    });
    co_btn.appendChild(new_btn);
}

function on_click_func(ctx, canvas, evt)
{
    let coords = getCursorPosition(ctx, canvas, evt);
    let in_flag = push_coords(coords[0], coords[1], dots.length);
    if (in_flag === 0)
    {
        dot(ctx, dots[dots.length - 1].x, dots[dots.length - 1].y, 1, 'red', 'black');
        new_btn(ctx, dots[dots.length - 1].x, dots[dots.length - 1].y);
        draw_on_dots(ctx, dots, dots.length);
    }
}

canvas.addEventListener('click', function(evt) {
    on_click_func(ctx, canvas, evt);
});

$(document).click(function(e){
    let task = $('.task-menu');
    if ( $(e.target).closest('.task-button').length) {
        task.toggleClass('task_show');
        return;
    }
    task.removeClass('task_show');
});

function on_click_coords_b_del(ctx, name) {
    for (let i = 0; i < dots.length; i++)
    {
        if (name === dots[i].x + '-' + dots[i].y)
        {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            dots.splice(i, 1);
            redraw_dots(ctx, dots);
            redraw_tri(ctx, dots);
        }
    }
    document.getElementById(name).remove();
}

/*function on_click_coords_b_zoom(ctx, name)
{
    let x, y;
    for (let i = 0; i < dots.length; i++)
    {
        if (name === dots[i].x + '-' + dots[i].y)
        {
            x = dots[i].x;
            y = dots[i].y;
        }
    }
    dot(ctx, x, y, 4, 'red', 'green');
}*/

function on_click_coords_b(ctx, name) {
    let coords = $('.coordinates-buttons');
    if (coords.hasClass('to-delete')) {
        on_click_coords_b_del(ctx, name);
    }
    /*if (coords.is(":focus"))
    {
        on_click_coords_b_zoom(ctx, name);
    }
    else
    {
        on_out_coordinates_button(ctx, name);
    }*/
}

$('.rem-button').click(function() {
    $('.rem-button').toggleClass('rem-button-active');
    $('.coordinates-buttons').toggleClass('to-delete');
});

/*function on_out_coordinates_button(ctx, name)
{
    $(document).click(function(e){
        console.log(e.target.id);
        if ( $(e.target).find(name)) {
            on_click_coords_b_zoom(ctx, name);
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        redraw_dots(ctx, dots);
        redraw_tri(ctx, dots);
    });
}*/