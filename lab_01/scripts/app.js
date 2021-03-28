import {dot, draw_on_dots, reset_all, push_coords} from './funcs.js';

//Check, array functions and definitions
let dots = [];

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

function add_new_dot_from_input()
{
    let in_flag = 0;
    let x_c = Number(document.getElementById('coordinates-inputX').value);
    let y_c = Number(document.getElementById('coordinates-inputY').value);
    if ((Number.isFinite(x_c)) && (Number.isFinite(y_c)))
    {
        in_flag = push_coords(x_c, y_c, dots.length, dots);
        add_to_canvas(in_flag);
    }
    else
    {
        in_flag = 1;
    }
    return in_flag;
}

//BUTTONS
//coordinates buttons functions
function new_btn(ctx, x, y)
{
    let new_btn = document.createElement('button');
    new_btn.setAttribute('id',x + '-' + y);
    let co_btn = document.querySelector('.coordinates-buttons');
    new_btn.innerText = 'X = ' + x + ', ' + 'Y = ' + y;
    new_btn.addEventListener('click', function() {
        on_click_coords_b(ctx, new_btn.id);
    });
    new_btn.addEventListener('mouseover', function() {
        on_click_coords_b_zoom(ctx, new_btn.id);
    });
    new_btn.addEventListener('mouseout', function() {
        reset_all(ctx, canvas, dots);
    });
    co_btn.appendChild(new_btn);
}

function on_click_coords_b_del(ctx, name) {
    for (let i = 0; i < dots.length; i++)
    {
        if (name === dots[i].x + '-' + dots[i].y)
        {
            dots.splice(i, 1);
            reset_all(ctx, canvas, dots);
        }
    }
    document.getElementById(name).remove();
}

function on_click_coords_b_zoom(ctx, name)
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
    dot(ctx, x, y, 1, 'red', 'green', 5);
}

function on_click_coords_b(ctx, name) {
    let coords = $('.coordinates-buttons');
    if (coords.hasClass('to-delete')) {
        on_click_coords_b_del(ctx, name);
    }
}


//JQuery buttons functions
//Task button
$(document).click(function(e){
    let task = $('.task-menu');
    if ( $(e.target).closest('.task-button').length) {
        task.toggleClass('task_show');
        return;
    }
    task.removeClass('task_show');
});

//Remove button
$('.rem-button').click(function() {
    $('.rem-button').toggleClass('rem-button-active');
    $('.coordinates-buttons').toggleClass('to-delete');
});

//Submit button
$('.sub-button').click(function() {
    $('.sub-button').addClass('sub-button-active').delay(250).queue(function () {
        let sbt_a = $('.sub-button');
        sbt_a.removeClass('sub-button-active');
        sbt_a.dequeue();
    })
});

document.querySelector('.sub-button').addEventListener('click', function(evt) {
    let err_flag = add_new_dot_from_input();
    if (err_flag === 0) {
        $('.sub-button').removeClass('sub-button-active-error');
    }
    else{
        $('.sub-button').addClass('sub-button-active-error').delay(250).queue(function () {
            let sbt_a = $('.sub-button');
            sbt_a.removeClass('sub-button-active-error');
            sbt_a.dequeue();
        })
    }
});


//Canvas functions
function on_click_func(ctx, canvas, evt)
{
    let coords = getCursorPosition(ctx, canvas, evt);
    let in_flag = push_coords(coords[0], coords[1], dots.length, dots);
    add_to_canvas(in_flag);
}

function add_to_canvas(in_flag)
{
    if (in_flag === 0)
    {
        dot(ctx, dots[dots.length - 1].x, dots[dots.length - 1].y, 1, 'red', 'black', 2);
        new_btn(ctx, dots[dots.length - 1].x, dots[dots.length - 1].y);
        draw_on_dots(ctx, dots, dots.length);
    }
}

canvas.addEventListener('click', function(evt) {
    on_click_func(ctx, canvas, evt);
});