var canvas, ctx,
    brush = {
        x: 0,
        y: 0,
        color: '#000000',
        size: 5,
        down: false,
    },
    strokes = [],
    currentStroke = null;

function redraw() {
    ctx.clearRect(0, 0, canvas.width(), canvas.height());
    ctx.lineCap = 'round';
    for (var i = 0; i < strokes.length; i++) {
        var s = strokes[i];
        ctx.strokeStyle = s.color;
        ctx.lineWidth = s.size;
        ctx.beginPath();
        ctx.moveTo(s.points[0].x, s.points[0].y);
        for (var j = 0; j < s.points.length; j++) {
            var p = s.points[j];
            ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
    }
}

function init() {
    canvas = $('.render');
    canvas.attr({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    ctx = canvas[0].getContext('2d');

    $('.save-btn').click(function save() {
        var image = canvas.toDataURL("image/jpg");
        canvas[0].href = image;
    });

    $('.pen-btn').click(function () {
        function mouseEvent(e) {
            var offset = canvas.offset();
            brush.x = (e.pageX - offset.left) * 1.235;
            brush.y = (e.pageY - offset.top) * 1.95;

            currentStroke.points.push({
                x: brush.x,
                y: brush.y,
            });

            redraw();
        }

        canvas.mousedown(function (e) {
            brush.down = true;

            currentStroke = {
                color: brush.color,
                size: brush.size,
                points: [],
            };

            strokes.push(currentStroke);

            mouseEvent(e);
        }).mouseup(function (e) {
            brush.down = false;

            mouseEvent(e);

            currentStroke = null;
        }).mousemove(function (e) {
            if (brush.down)
                mouseEvent(e);
        });
    });

    $('.eraser-btn').click(function () {
        function mouseEvent(e) {
            var offset = canvas.offset();
            brush.x = (e.pageX - offset.left) * 1.235;
            brush.y = (e.pageY - offset.top) * 1.95;

            currentStroke.points.push({
                x: brush.x,
                y: brush.y,
            });

            redraw();
        }

        canvas.mousedown(function (e) {
            brush.down = true;

            currentStroke = {
                color: '#fff',
                size: brush.size,
                points: [],
            };

            strokes.push(currentStroke);

            mouseEvent(e);
        }).mouseup(function (e) {
            brush.down = false;

            mouseEvent(e);

            currentStroke = null;
        }).mousemove(function (e) {
            if (brush.down)
                mouseEvent(e);
        });
    });

    $('.line-btn').click(function () {
        function mouseEvent(e) {
            var offset = canvas.offset();
            brush.x = (e.pageX - offset.left) * 1.235;
            brush.y = (e.pageY - offset.top) * 1.95;

            currentStroke.points.push({
                x: brush.x,
                y: brush.y,
            });

            ctx.beginPath();
            ctx.moveTo(brush.xdown, brush.ydown);
            ctx.lineTo(brush.xup, brush.yup);
            ctx.stroke();
        }

        canvas.mousedown(function (e) {
            brush.down = true;
            var offset = canvas.offset();
            brush.xdown = (e.pageX - offset.left) * 1.235;
            brush.ydown = (e.pageY - offset.top) * 1.95;

            currentStroke = {
                color: brush.color,
                size: brush.size,
                points: [],
            };

            strokes.push(currentStroke);

            mouseEvent(e);
        }).mouseup(function (e) {
            brush.down = false;
            var offset = canvas.offset();
            brush.xup = (e.clientX - offset.left) * 1.235;
            brush.yup = (e.clientY - offset.top) * 1.95;

            mouseEvent(e);
        });
    });

    $('.square-btn').click(function () {
        function mouseEvent(e) {
            var offset = canvas.offset();
            brush.x = (e.pageX - offset.left) * 1.235;
            brush.y = (e.pageY - offset.top) * 1.95;

            ctx.beginPath();
            ctx.rect(brush.xdown, brush.ydown, brush.xup, brush.yup);
            ctx.stroke();
        }

        canvas.mousedown(function (e) {
            brush.down = true;
            var offset = canvas.offset();
            brush.xdown = (e.pageX - offset.left) * 1.235;
            brush.ydown = (e.pageY - offset.top) * 1.95;

            currentStroke = {
                color: brush.color,
                size: brush.size,
                points: [],
            };

            strokes.push(currentStroke);

            mouseEvent(e);
        }).mouseup(function (e) {
            brush.down = false;
            var offset = canvas.offset();
            brush.xup = (e.clientX - offset.left) * 1.235;
            brush.yup = (e.clientY - offset.top) * 1.95;

            mouseEvent(e);
        });
    });

    $('.color-btn').on('input', function () {
        brush.color = this.value;
    });

    $('.brush-size').on('input', function () {
        brush.size = this.value;
    });
}

$(init);

setInterval("hour();", 1000);

function hour() {
    var date = new Date();

    var h = date.getHours();
    if (h < 10) {
        h = "0" + h
    }
    var m = date.getMinutes();
    if (m < 10) {
        m = "0" + m
    }
    var s = date.getSeconds();
    if (s < 10) {
        s = "0" + s
    }
    $('.hour').empty().prepend(h + ":" + m);
}

$(hour);

$('.close-btn').click(function () {
    setTimeout(1);
    $('.bluescreen').css('display', 'block');
});

$(document).keyup(function (e) {
    if (e.key === "Escape") {
        $('.bluescreen').css('display', 'none')
    }
});

$('.reduce-btn').click(function () {
    $('.window').css('display', 'none');
    $('.paint-btn').removeClass('active-btn');
});

$('.paint-btn').click(function () {
    $('.window').css('display', 'block');
    $('.paint-btn').addClass('active-btn');
});