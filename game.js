const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector(".time");
const spanRecord = document.querySelector(".record");
const pResult = document.querySelector("#result");
const restart = document.querySelector(".restart");
const btnRestart = document.querySelector("#btnRestart");
const timeShow = document.querySelector(".timeShow");
const recordShow = document.querySelector(".recordShow");


let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;
let record;

playerPosition = {
    x:undefined,
    y:undefined
};
giftPosition = {
    x:undefined,
    y:undefined
};
let enemyPositions =[];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    {       /*Notas*/ 
        // game.fillRect(0, 0, 100, 100);
        // game.clearRect(45, 45, 10, 10)
        
        //     game.font = '25px Verdana'
        //     game.fillStyle = 'green';
        //     game.textAlign = 'center'; //de donde ba empezar (star, end, center or left right)
        //     game.fillText('platzi', 25, 25);
    }

    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.5;
    } else {
        canvasSize = window.innerHeight * 0.5;
    }

    canvasSize = Number(canvasSize.toFixed(0));

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementsSize = (canvasSize / 10.8);
    
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function startGame() {
    console.log({ canvasSize, elementsSize});

    game.font = elementsSize + 'px Impact';
    game.textAlign = 'center';
    
    const map = maps[level];

    if (!map) {
        gameWin();
        return;
    }

    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100)
        showRecord();
    }

    const mapRows = map.trim().split('\n'); 
    const mapRowsCols = mapRows.map(row => row.trim().split(''));
    console.log({mapRows :mapRows ,mapRowsCols:mapRowsCols})
    { /* alineación de elementos de arrays para mostrar emojis con ciclo for */
        // for (let row = 1; row <= 10; row++) {
        //     for (let column = 1; column <= 10; column++){
        //         game.fillText(emojis[mapRowsCols[row-1][column-1]], elementsSize * column, elementsSize * row);
        //     }
        // }  
    }

    showLives();

    enemyPositions = [];
    game.clearRect(0, 0, canvasSize, canvasSize);

    mapRowsCols.forEach((row, rowIndex )=> {
        row.forEach((col,colIndex) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colIndex + 1);
            const posY = elementsSize * (rowIndex + 1);

            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    console.log({ playerPosition });
                }
            } else if(col == 'I'){
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if (col == 'X') {
                enemyPositions.push({
                    x: posX,
                    y: posY
                })
            }

            game.fillText(emoji,posX,posY)
        })
    });

    movePlayer();
}

function movePlayer() {
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;

    if (giftCollision) {
        levelWin();
    }

    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
        const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
        if (enemyCollisionX && enemyCollisionY) {
            enemyBurst(enemy.x, enemy.y)
        }

        return enemyCollisionX && enemyCollisionY;
    })
        
    if( enemyCollision ) {
        levelFail();
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y );
}

function moveByKeys(event){
    switch (event.key) {
        case 'ArrowUp':
            moveUp()
            break;
        case 'ArrowDown':
            moveDown()
            break;
        case 'ArrowLeft':
            moveLeft()
            break;
        case 'ArrowRight':
            moveRight()
            break;
        default:
            break;
    }
}
        
function moveDown() {
    console.log('down')
    if ((playerPosition.y + elementsSize) > canvasSize) {
        console.log('Out');
    } else {
        playerPosition.y += elementsSize;
        startGame();
    }
}

function moveLeft(){
    console.log('left')
    if ((playerPosition.x - elementsSize) < elementsSize) {
        console.log('Out');
    } else {
        playerPosition.x -= elementsSize;
        startGame();
    }
}

function moveUp(){
    console.log('up')
    if ((playerPosition.y - elementsSize) < elementsSize) {
        console.log('Out');
    } else {
        playerPosition.y -= elementsSize;
        startGame();
    }
}

function moveRight(){
    console.log('right')
    if ((playerPosition.x + elementsSize) > canvasSize) {
        console.log('Out');
    } else {
        playerPosition.x += elementsSize;
        startGame();
    }
}

function levelWin() {
    console.log('subiste nivel');
    level++;
    startGame();
}

function levelFail() {
    lives--;

    
    if (lives <= 0) {
        level = 0;
        lives = 3;
        timeStart = undefined;
    }

    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()
}

function gameWin() {
    console.log('Terminaste');
    clearInterval(timeInterval);
    const recordTime = localStorage.getItem('record_time');
    const playerTime = Date.now() - timeStart;
    if (recordTime) {
        if (recordTime >= playerTime) {
            localStorage.setItem('record_time', playerTime)
            pResult.innerHTML = 'Superaste el record 🎉🏆';
        } else {
            pResult.innerHTML = 'No superaste el record 😕';
        }
    } else {
        localStorage.setItem('record_time', playerTime);
        pResult.innerHTML = 'Primer vez!, muy bien!!👍..., superalo!';
    }
    console.log({ recordTime, playerTime });
    showRestartGame();
}

function showLives() {
    const heartsArray=Array(lives).fill(emojis['HEART']) 

    spanLives.innerHTML = '';
    heartsArray.forEach(heart => spanLives.append(heart));
}

function showTime() {
    spanTime.innerHTML = Date.now() - timeStart;

}

function showRecord() {
    spanRecord.innerHTML = localStorage.getItem('record_time');
}

function showRestartGame() {
    restart.classList.add('show');
    const playerTime = Date.now() - timeStart;
    recordShow.innerHTML = spanTime.innerText; 
    timeShow.innerHTML = playerTime;
}

function reloadGame() {
    location.reload();
}

function showBreakHeart() {
    game.font = "150px Impact";
    game.fillText("💔", 200, 200)
    game.font = elementsSize + 'px Impact';
}

function enemyBurst(x, y) {
    console.log(lives)
    if (lives > 1) {
        setTimeout(() => {
            game.clearRect(x-20, y-27, 35, 32)
        }, 0)
        setTimeout(
            () => {
                game.fillText(emojis['BURST'], x, y);
            },
            0
        )
        setTimeout(() => {
            showBreakHeart();    
        },0) 
    }
}

window.addEventListener('keydown',moveByKeys)
btnUp.addEventListener('click',moveUp);
btnDown.addEventListener('click',moveDown);
btnLeft.addEventListener('click',moveLeft);
btnRight.addEventListener('click', moveRight);
btnRestart.addEventListener('click', reloadGame);