var canvas = document.getElementById("clock");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius,radius);
radius = radius * 0.9;

function drawClock(){
    ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
    drawFace(ctx,radius);
    drawNumbers(ctx,radius);
    drawTime(ctx,radius);
}

function drawFace(ctx,radius){
    ctx.beginPath();
    ctx.arc(0,0,radius,0, 2 * Math.PI);
    ctx.lineWidth = 5;
    ctx.stroke();

}

function drawNumbers(ctx,radius){
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px consolas";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num=1;num<13;num++){
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0,-radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(),0,0);
        ctx.rotate(ang);
        ctx.translate(0,radius * 0.85);
        ctx.rotate(-ang);
    }
}



function drawTime(ctx,radius){
    var now = new Date();
    var hr = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    var mil = now.getMilliseconds();
    
    hr = hr%12;
    hr = (hr*Math.PI/6) + (min*Math.PI/(6*60)) + (sec*Math.PI/(360*60));
    drawHand(ctx, hr, radius *0.5, radius * 0.04);

    min = (min*Math.PI/30) + (sec*Math.PI/(30*60)) + (mil*Math.PI/(3600*1000));;
    drawHand(ctx,min,radius * 0.7, radius *0.02);

    sec = (sec*Math.PI/30) + (mil*Math.PI/(30*1000));
    drawHand(ctx,sec,radius * 0.8, radius *0.007);
}

function drawHand(ctx,pos,length,width){
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0,-length);
    ctx.stroke();
    ctx.rotate(-pos);
}

setInterval(drawClock, 10);