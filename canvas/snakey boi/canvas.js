var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.height = innerHeight;
canvas.width = innerWidth;


const PERLIN_YWRAPB = 4
const PERLIN_YWRAP = 1 << PERLIN_YWRAPB
const PERLIN_ZWRAPB = 8
const PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB
const PERLIN_SIZE = 4095

let perlin_octaves = 4 // default to medium smooth
let perlin_amp_falloff = 0.5 // 50% reduction/octave

const scaled_cosine = (i) => 0.5 * (1.0 - Math.cos(i * Math.PI))

let perlin // will be initialized lazily by noise() or noiseSeed()

function noise(x, y = 0, z = 0) {
    if (perlin == null) {
      perlin = new Array(PERLIN_SIZE + 1)
      for (let i = 0; i < PERLIN_SIZE + 1; i++) {
        perlin[i] = Math.random()
      }
    }
  
    if (x < 0) {
      x = -x
    }
    if (y < 0) {
      y = -y
    }
    if (z < 0) {
      z = -z
    }
  
    let xi = Math.floor(x),
      yi = Math.floor(y),
      zi = Math.floor(z)
    let xf = x - xi
    let yf = y - yi
    let zf = z - zi
    let rxf, ryf
  
    let r = 0
    let ampl = 0.5
  
    let n1, n2, n3
  
    for (let o = 0; o < perlin_octaves; o++) {
      let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB)
  
      rxf = scaled_cosine(xf)
      ryf = scaled_cosine(yf)
  
      n1 = perlin[of & PERLIN_SIZE]
      n1 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n1)
      n2 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE]
      n2 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2)
      n1 += ryf * (n2 - n1)
  
      of += PERLIN_ZWRAP
      n2 = perlin[of & PERLIN_SIZE]
      n2 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n2)
      n3 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE]
      n3 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3)
      n2 += ryf * (n3 - n2)
  
      n1 += scaled_cosine(zf) * (n2 - n1)
  
      r += n1 * ampl
      ampl *= perlin_amp_falloff
      xi <<= 1
      xf *= 2
      yi <<= 1
      yf *= 2
      zi <<= 1
      zf *= 2
  
      if (xf >= 1.0) {
        xi++
        xf--
      }
      if (yf >= 1.0) {
        yi++
        yf--
      }
      if (zf >= 1.0) {
        zi++
        zf--
      }
    }
    return r
  }
class Circle {
    constructor(x, y, radius, color,offset) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.offset = offset;
    }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        };
        update() {
            this.draw();
        };
    }


// const circle = new Circle(canvas.width/2,canvas.height/2,10,'blue')

const circles = [];

for(let i=0; i<100;i++){
    circles.push((new Circle(canvas.width/2,canvas.height/2,10,`hsl(${Math.random()*360},100%,50%)`,i* 0.01)))
}

let time = 0;

function animate(){
    requestAnimationFrame(animate);

    ctx.fillStyle = 'rgba(0,0,0,0.01)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    circles.forEach((circle) => {
        
        circle.x = noise(time+20 + circle.offset) * canvas.width;
        circle.y = noise(time + circle.offset) * canvas.height;
        circle.draw();
    });
    // circle.update()
    
    time += 0.005
}

animate();