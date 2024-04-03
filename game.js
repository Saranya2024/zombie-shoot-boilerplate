// Iteration 1: Declare variables required for this game
let gameBody=document.getElementById("game-body");
let $lives=document.getElementById("lives");
let seconds=document.getElementById("timer").textContent;
let zombieId=0;
const imgs=[
    "zombie-1.png",
    "zombie-2.png",
    "zombie-3.png",
    "zombie-4.png",
    "zombie-5.png",
    "zombie-6.png"
]

// Iteration 1.2: Add shotgun sound
const shotgunAudio = new Audio("./assets/shotgun.wav");
shotgunAudio.volume = 0.5;
gameBody.onclick=()=>{
    shotgunAudio.pause();
    shotgunAudio.currentTime=0;
    shotgunAudio.play();
}

// Iteration 1.3: Add background sound
let backgroundSound = new Audio("./assets/bgm.mp3");
backgroundSound.play();
backgroundSound.loop=true;

// Iteration 1.4: Add lives
const maxlives = 4;
let lives=4;

// Iteration 2: Write a function to make a zombie
function makeZombie(zombieId){
    let zombieImg=document.createElement("img");
    let randomIndex=Math.floor(Math.random()*6);
    zombieImg.src=`./assets/${imgs[randomIndex]}`
    zombieImg.setAttribute("class","zombie-image");
    zombieImg.setAttribute("id",`${zombieId}`);
    document.body.append(zombieImg)
    
    let randomleftProp=generateRandomInt(20,80);
    zombieImg.style.left=`${randomleftProp}vw`
    // zombieImg.style.animationDuration=`${generateRandomInt(2,6)}s`;
    zombieImg.onclick=()=>{
        zombieDestruct(zombieImg);
    }
    zombieId++; 

}
// makeZombie(0)

// Iteration 3: Write a function to check if the player missed a zombie
function checkCollision(zombie){
    if(zombie.getBoundingClientRect().top<=0){
        lives--;
        return true;
    }else{
        return false;
    }
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function zombieDestruct(zombie){
    zombie.style.display="none";
    zombieId++;
    makeZombie(zombieId);
}
// console.log(lives)

// Iteration 5: Creating timer
let timer=setInterval(()=>{
    seconds--;
    document.getElementById("timer").textContent=seconds;
    let zombie=document.getElementById(zombieId);
    if(checkCollision(zombie)){
        zombieDestruct(zombie);
    }
        if(lives==0){
            clearInterval(timer);
            location.href="./game-over.html";
        }
        console.log(seconds)
        if(seconds==0){
            location.href="./win.html";
        }
},1000);

// Iteration 6: Write a code to start the game by calling the first zombie
makeZombie(zombieId);

// Iteration 7: Write the helper function to get random integer
function generateRandomInt(min,max){
    min=Math.ceil(min);
    max=Math.floor(max);
    let randomNo=Math.floor(Math.random()*(max-min)+min);
    return randomNo;
}
