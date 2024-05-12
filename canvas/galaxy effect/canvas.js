var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.height = innerHeight;
canvas.width = innerWidth;

var mouse = {
    x: innerWidth / 2,
    y: innerHeight /2
}
const colors = ['#2185C5','#7ECEFD','#FFF6E5','#FF7F66']

let mouseDown = false;
addEventListener('mousedown', () =>{
    mouseDown = true;
})
addEventListener('mouseup', () =>{
    mouseDown = false;
})
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

class Particle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
        update() {
            this.draw();
        };
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 15;
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        };
    }

let particles;
function init(){
    particles = [];

    for(let i = 0; i<400; i++){
        const canvasWidth = canvas.width+300;
        const canvasHeight = canvas.height +300;
        const x = (Math.random() * canvasWidth)-canvasWidth/2;
        const y = (Math.random() * canvasHeight)-canvasHeight/2;
        const radius =  Math.random()*2;
        particles.push(new Particle(x,y,radius,randomColor(colors)));
    }
}

let radians = 0;
let alpha = 1;
function animate(){
    requestAnimationFrame(animate);

    ctx.fillStyle = `rgba(10,10,10,${alpha})`
    ctx.fillRect(0,0, canvas.width, canvas.height);
    
    ctx.save();
    ctx.translate(canvas.width/2,canvas.height/2)
    ctx.rotate(radians)
    particles.forEach(particle => {
        particle.update();
    });
    ctx.restore();
    radians += 0.005;
    if(mouseDown && alpha>=0.01){
        alpha-=0.01;
    }else if(!mouseDown && alpha<1){
        alpha+=0.01;
    }
}


init();
animate();