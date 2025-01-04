let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
const x = "X";
const o = "O";
let player = x;
let spaces = Array(9).fill(null);
let winningIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')
const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}
function boxClicked(e) {
    const id = e.target.id;
    if(!spaces[id]) {
        spaces[id] = player;
        e.target.innerText = player;
        if(isWinner() != false) {
            playerText.innerText = `${player} has won!`;
            let winningBlox = isWinner();
            winningBlox.map(box => boxes[box].style.backgroundColor = winningIndicator)
            return;
        }
        else if(spaces.every(space => space !== null)) {
            playerText.innerText = `Tie!`;
            return
        }
        player = player == x ? o : x;
    }

}
const winningCombo = [
    [0, 1, 2], 
    [0, 3, 6],
    [0, 4, 8], 
    [1, 4, 7], 
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
function isWinner() {
    for (const condition of winningCombo) {
        let [a, b, c] = condition;
        if(spaces[a] && spaces[a]==spaces[b] && spaces[a] == spaces[c]) {
            return [a, b, c]
        }
    }
    return false;
}
restartBtn.addEventListener('click', restart);
function restart() {
    spaces.fill(null);
    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
    })
    playerText.innerText = 'Tic Tac Toe';
    player = x;
}
startGame();