function dot(colour, x, y)
{
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
    }
    if (canvas.getContext)
    {
        ctx.translate(0.5, 0.5);
        ctx.fillStyle = colour;
        ctx.fillRect(x, y, 1, 1);
    }
}

function getRndColor() {
    var r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function draw_tri(x1, y1, x2, y2, x3, y3)
{
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.translate(0.5, 0.5);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.fillStyle = getRndColor();
        ctx.fill();
    }
}

export {dot, draw_tri, getRndColor};