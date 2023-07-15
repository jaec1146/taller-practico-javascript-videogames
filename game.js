const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementsSize;

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

    mapRowsCols.forEach((row, rowIndex )=> {
        row.forEach((col,colIndex) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colIndex + 1);
            const posY = elementsSize * (rowIndex + 1);
            game.fillText(emoji,posX,posY)
        })
    });
        
}
