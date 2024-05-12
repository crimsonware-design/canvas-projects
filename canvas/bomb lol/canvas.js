var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.height = innerHeight;
canvas.width = innerWidth;

var mouse = {
    x: innerWidth / 2,
    y: innerHeight /2
}



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

const gravity = 0.005;
const friction = 0.99;

class Particle {
    constructor(x, y, radius,color,velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
    }
        update() {
            this.draw();
            this.velocity.x *= friction;
            this.velocity.y *= friction;
            this.velocity.y+=gravity;
            this.x+=this.velocity.x;
            this.y+=this.velocity.y;
            this.alpha-=0.005;
            
        };
        draw(){
            ctx.save()
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
            ctx.restore()
        };
    }


let particles;
function init(){
    particles = [];
    }


function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0,0,0,0.05)'
    ctx.fillRect(0,0,canvas.width,canvas.height)

    particles.forEach((particle,i) =>{
        if(particle.alpha>0){
            particle.update();
        }else{
        particles.splice(i,1)
        }
    })
}

init();
animate();
const particlecount = 400;

addEventListener('click', (event) => {

    mouse.x = event.clientX;
    mouse.y = event.clientY;

    const angleIncrement = Math.PI * 2/particlecount
    const power = 10

    for(let i = 0; i<particlecount; i++){
        particles.push(new Particle(mouse.x,mouse.y,5,`hsl(${Math.random()*360},50%,50%)`,{
            x:Math.cos(angleIncrement*i)*Math.random() * power,
            y:Math.sin(angleIncrement*i)*Math.random()*power
        }));
    }
});