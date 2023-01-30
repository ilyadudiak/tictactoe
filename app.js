
let buttons = document.querySelectorAll('button');
let board = document.querySelector('.gameBoard');
let players = ['X', 'O'];
let currentPlayer = players[Math.floor(Math.random() * 2)];
let currentPlayerP = document.querySelector('.currentPlayerP');
function showCurrentPlayer(){
    currentPlayerP.textContent = currentPlayer;
}
showCurrentPlayer()

function move (){
    if(this.classList.contains('used')) return;
    this.classList.add('used');
    if(currentPlayer === 'X'){
        this.value = 'X';
        currentPlayer = 'O';
        showCurrentPlayer();
        this.style.background = 'url(img/X.png)';
        this.style.backgroundSize = '90%';
        this.style.backgroundPosition = 'center';
        this.style.backgroundRepeat = 'no-repeat';
        setTimeout(checkGame, 200);
    } else{
        this.value = 'O';
        currentPlayer = 'X';
        showCurrentPlayer();
        this.style.background = 'url(img/0.png)';
        setTimeout(checkGame, 200);
    }
}
let winner;
function checkGame(){
    let isDraw = true;
    let buttonsArr = [...buttons];
    buttons.forEach(btn=>{
        if(!btn.classList.contains('used')){
            isDraw = false;

        }
    });
    if(isDraw) {
        board.classList.add('draw');
        clearBoard();
        setTimeout(()=>board.classList.remove('draw'), 2000);
    };
    console.log(isDraw);
    let field1 = [buttons[0], buttons[1], buttons[2]];
    let field2 = [buttons[3], buttons[4], buttons[5]];
    let field3 = [buttons[6], buttons[7], buttons[8]];
    let field4 = [buttons[1], buttons[4], buttons[7]];
    let field5 = [buttons[2], buttons[5], buttons[8]];
    let field6 = [buttons[0], buttons[3], buttons[6]];
    let field7 = [buttons[0], buttons[4], buttons[8]];
    let field8 = [buttons[2], buttons[4], buttons[6]];

    let allFields = [
        field1,
        field2,
        field3,
        field4,
        field5,
        field6,
        field7,
        field8,
    ]

    allFields.forEach(field=>{
       if(checkField(field)){
           if(winner == 'O'){
               console.log('O')
               board.classList.add('O-win');
               setTimeout(()=>{
                   board.classList.remove('O-win');
                   clearBoard();
               }, 2000);
           } else{
               console.log('')
               board.classList.add('X-win');
               setTimeout(()=>{
                   board.classList.remove('X-win');
                   clearBoard();
               }, 2000);
           }

       };
    });


}
function checkField(fieldArr){
    let endGame = false;
    if(!fieldArr[0].value || !fieldArr[1].value || !fieldArr[2].value){
        return;
    } else{
        if(fieldArr[0].value == fieldArr[1].value && fieldArr[1].value == fieldArr[2].value){
            endGame = true;
            winner = fieldArr[0].value;
            return endGame;
        }
    }

}
function clearBoard(){
    buttons.forEach(btn=>{
        btn.classList.remove('used');
        btn.style.background = 'none';
        btn.value = '';
    })
}
buttons.forEach(btn=>{
    btn.addEventListener('click', move);
});

