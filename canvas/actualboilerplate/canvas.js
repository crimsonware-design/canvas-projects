var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.height = innerHeight;
canvas.width = innerWidth;

var mouse = {
    x: innerWidth / 2,
    y: innerHeight /2
}

var colors = [
    '#2185C5',
    '#7ECEFD',
    '#FFF6E5',
    '#FF7F66'
];


addEventListener('mousemove', (event) =>{
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});
addEventListener('resize', () =>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
})

//Utility Functions
function randomIntFromRange(min,max){
    return Math.floor(Math.random() * (max-min + 1) + min);
}
function randomColor(colors){
    return colors[Math.floor(Math.random()*colors.length)];
}

function Object(x,y,radius,color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.update = function(){
        this.draw();
    }
    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0 , Math.PI *2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

let objects;
function init(){
    objects = [];

    for(let i = 0; i<400; i++){
        // objects.push();
    }
    this.update();
    }


function animate(){
    requestAnimationFrame(animate);

    ctx.clearRect(0,0, canvas.width, canvas.height);

    ctx.fillText("Hello World",mouse.x,mouse.y);
}

init();
animate();