const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height=576

const gravity = 0.7;
const playerspeed = 5;
ctx.fillRect(0,0,canvas.width,canvas.height)

class Sprite{
    constructor({position,velocity,color = 'red',offset}){
        this.position = position;
        this.velocity = velocity;
        this.color = color;
        this.width = 50;
        this.height = 150;
        this.attackBox = {
            position:{
                x:this.position.x,
                y:this.position.y
            },
            offset,
            width: 100,
            height:50
        }
        this.isAttacking;
        this.health = 100;
    }
    draw(){
        
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)

        //attack box
        if(this.isAttacking){
        ctx.fillStyle = 'green'
        ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y,this.attackBox.width,this.attackBox.height)
        }
    }
    update(){
        this.draw();  
        this.attackBox.position.x=this.position.x-this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        
        this.position.x+=this.velocity.x;
        this.position.y+=this.velocity.y;


        if(this.position.y+this.height+this.velocity.y>=canvas.height){
            this.velocity.y=0;
        }else{
            this.velocity.y+=gravity;
        }
    }
    attack(){
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }
}

const player = new Sprite({position:{
    x: 0,
    y:0
},
    velocity:{
    x:0,
    y:10
},
offset:{
    x:0,
    y:0
}
})
const enemy = new Sprite({
    position:{
    x: 400,
    y:100
},
    velocity:{
    x:0,
    y:0
}, 
color:'blue',
offset:{
    x:50,
    y:0
}
})
const keys = {
    a:{pressed:false},
    d:{pressed:false},
    w:{pressed:false},
    ArrowUp:{pressed:false},
    ArrowLeft:{pressed:false},
    ArrowRight:{pressed:false}

}

function rectCollision({rectangle1,rectangle2}){
    return(rectangle1.attackBox.position.x + rectangle1.attackBox.width >=rectangle2.position.x&&rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width&&rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && rectangle1.attackBox.position.y<=rectangle2.position.y + rectangle2.height&& rectangle1.isAttacking)

}

function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    player.update();
    enemy.update();
    player.velocity.x=0;
    enemy.velocity.x=0;
    if(keys.a.pressed){
        player.velocity.x=-playerspeed;
    }else if(keys.d.pressed){
        player.velocity.x=playerspeed
    }
    if(keys.w.pressed&&player.position.y+player.height>=canvas.height){
        player.velocity.y=-20;
    }

    if(keys.ArrowLeft.pressed){
        enemy.velocity.x=-playerspeed;
    }else if(keys.ArrowRight.pressed ){
        enemy.velocity.x=playerspeed
    }
    if(keys.ArrowUp.pressed&&enemy.position.y+enemy.height>=canvas.height){
        enemy.velocity.y=-20;
    }

    //collision
    if(rectCollision({rectangle1:player,rectangle2:enemy})&&player.isAttacking){
        player.isAttacking = false;
        enemy.health-=20;
        document.getElementById('enemyHealth').style.width=enemy.health+'%'
    }
    if(rectCollision({rectangle1:enemy,rectangle2:player})&&enemy.isAttacking){
        enemy.isAttacking = false;
        player.health-=20
        document.getElementById('playerHealth').style.width=player.health+'%'

    }  
    
    //end game based on health
    if(enemy.health <= 0 || player.health <=0){
        determineWinner({player,enemy})
    }
}

function determineWinner({player,enemy}){
    if(player.health === enemy.health){
        document.querySelector('#winner').innerHTML = 'Tie';
        document.querySelector('#winner').style.display = 'flex'
    }else if(player.health > enemy.health){
        document.querySelector('#winner').innerHTML = 'Player 1 Wins';
        document.querySelector('#winner').style.display = 'flex'
    }
    else if(player.health < enemy.health){
        document.querySelector('#winner').innerHTML = 'Player 2 Wins';
        document.querySelector('#winner').style.display = 'flex'
    }
}
let timer = 30;
let timerId;
function decreaseTimer(){
    if(timer >0){
    timer--;
    document.querySelector('#timer').innerHTML = timer
    timerId = setTimeout(decreaseTimer,1000)
    }else{
    determineWinner({player,enemy})
}
}
decreaseTimer();

animate();
addEventListener('keydown',(event) =>{
    switch(event.key){
        case 'd':
            keys.d.pressed= true;
        break;
        case 'a':
            keys.a.pressed= true;
        break;
        case 'w':
            keys.w.pressed=true;
        break;
        case ' ':
            player.attack();
        break;
        case 'ArrowRight':
            keys.ArrowRight.pressed= true;
        break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed= true;
        break;
        case 'ArrowUp':
            keys.ArrowUp.pressed=true;
        break;
        case 'ArrowDown':
            enemy.attack();
        break;
    }
})
addEventListener('keyup',(event) =>{
    switch(event.key){
        case 'd':
            keys.d.pressed= false;
        break;
        case 'a':
            keys.a.pressed= false;
        break;
        case 'w':
            keys.w.pressed= false;
        break;
        case 'ArrowRight':
            keys.ArrowRight.pressed= false;
        break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed= false;
        break;
        case 'ArrowUp':
            keys.ArrowUp.pressed= false;
        break;
    }
})