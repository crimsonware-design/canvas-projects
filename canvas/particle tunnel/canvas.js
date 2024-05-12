var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.height = innerHeight;
canvas.width = innerWidth;

var mouse = {
    x: innerWidth / 2,
    y: innerHeight /2
}

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

class Particle {
    constructor(x, y, radius, color,velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity
        this.ttl = 1000;
    }
        update() {
            this.draw();
            this.x+=this.velocity.x;
            this.y+=this.velocity.y;
            this.ttl--;
        };
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        };
    }

const particleAmount = 36;
let particles;
function init(){
    particles = [];
    const radius = 100

    for(let i = 0; i<particleAmount; i++){
        const radian = Math.PI * 2/particleAmount
        Math.cos()
        let x = mouse.x
        let y = mouse.y
        particles.push(new Particle(x,y,5,'blue',{
            x:Math.cos(radian * i),
            y:Math.sin(radian * i)
        }));
    }
    }

let hue = 0;
let hueRadians =0;
function generateRing(){
    setTimeout((generateRing), 100);
    hue = Math.sin(hueRadians);
    for(let i = 0; i<particleAmount; i++){
        const radian = Math.PI * 2/particleAmount
        Math.cos()
        const x = mouse.x
        const y = mouse.y
        particles.push(new Particle(x,y,5,`hsl(${Math.abs(hue*360)},50%,50%)`,{
            x:Math.cos(radian * i),
            y:Math.sin(radian * i)
        }));
    }
    hueRadians+=0.01;
}


function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle='rgba(0,0,0,0.1'
    ctx.fillRect(0,0, canvas.width, canvas.height);

    particles.forEach((particle,i) => {

        if(particle.ttl<0){
            particles.splice(i,1)
        }else{
            particle.update();
        }
        
    });
}

init();
animate();
generateRing();