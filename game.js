const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');

let canvasSize;
let elementsSize;

playerPosition = {
    x:undefined,
    y:undefined
};

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
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementsSize = (canvasSize / 10.8)+1;
    
    startGame();
}

function startGame() {
    console.log({ canvasSize, elementsSize});

    game.font = elementsSize + 'px Impact';
    game.textAlign = 'center';
    
    const map = maps[0];
    const mapRows = map.trim().split('\n'); 
    const mapRowsCols = mapRows.map(row => row.trim().split(''));

    { /* alineación de elementos de arrays para mostrar emojis con ciclo for */
        // for (let row = 1; row <= 10; row++) {
        //     for (let column = 1; column <= 10; column++){
        //         game.fillText(emojis[mapRowsCols[row-1][column-1]], elementsSize * column, elementsSize * row);
        //     }
        // }  
    }

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
            }

            game.fillText(emoji,posX,posY)
        })
    });

    movePlayer();
}

function movePlayer() {
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

window.addEventListener('keydown',moveByKeys)
btnUp.addEventListener('click',moveUp);
btnDown.addEventListener('click',moveDown);
btnLeft.addEventListener('click',moveLeft);
btnRight.addEventListener('click', moveRight);