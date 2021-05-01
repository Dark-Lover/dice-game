const btnNewGame=document.querySelector('.newGame'),
      diceBlock=document.querySelector('.diceImg'),
      btnRollDice=document.querySelector('.rollDice'),
      btnHold=document.querySelector('.hold'),
      scorePlOne=document.querySelector('#pOneScore'),
      scorePlTwo=document.querySelector('#pTwoScore'),
      currentPlOne=document.querySelector('#csPone'),
      currentPlTwo=document.querySelector('#csPtwo'),
      pOneHide=document.querySelector('#pOneHide'),
      pTwoHide=document.querySelector('#pTwoHide'),
      winArea=document.querySelector('.win');

let score=0,
    currentScore=0;
    pId=1,
    playerOne=0,
    playerTwo=0;
// set dice image
    const setImage = function (id){
        let number;
        switch(id){
            case 1: number='one'; break;
            case 2: number='two' ; break;
            case 3: number='three' ; break;
            case 4: number='four' ; break;
            case 5: number='five' ; break;
            case 6: number='six' ; break;
        }
        diceBlock.innerHTML=`<i class="fas fa-dice-${number} fa-5x">`;
    }
// set new game
    const setNewGame = function(){
        winArea.classList.add('hidden');
        btnRollDice.addEventListener("click",rollDice);
        btnHold.addEventListener('click', holdScore);
        reinitialize(0);
        showScore(0,0);
        score=0;
        
    }
// game over check function
    const gameOver = function(){
        if(playerOne >= 20){
            winArea.textContent="The winner is Player 1";
            winArea.classList.remove('hidden');
            reinitialize();
            return true;
        }
        if(playerTwo >= 20){
            winArea.textContent="The winner is Player 2";
            winArea.classList.remove('hidden');
            reinitialize();
            return true;
        }
    }
// Hide inactive player
    const hidePlayer = function(){
        pOneHide.classList.toggle('hidden');
        pTwoHide.classList.toggle('hidden');
    }
// Show score updated
    const showScore= function(score,pId=0){
        if(pId===0){
          scorePlOne.textContent=0;
          currentPlOne.textContent=0;
          scorePlTwo.textContent=0;
          currentPlTwo.textContent=0;
        }
        if(pId===1){
          scorePlOne.textContent=score;
          playerOne=playerOne+score;
          currentPlOne.textContent=playerOne;
        }
        if(pId===2){
          scorePlTwo.textContent=score;
          playerTwo=playerTwo+score;
          currentPlTwo.textContent=playerTwo;
        }
    }
// Reinitialize score when loosing
    const reinitialize = function(id=0){
        if(id===0){
            playerOne=0;
            playerTwo=0;
        }
        if(id===1){
            playerOne=0;
        }
        if(id===2){
            playerTwo=0;
        }
    }
// Hold score function
    const holdScore = function(){
         if(pId===1){
             console.log(`${pId} im holding`);
             playerOne=playerOne;
             pId=2;
             hidePlayer();
             return
         }
         if(pId===2){
            console.log(`${pId} im holding`);
            playerTwo=playerTwo;
            pId=1;
            hidePlayer();
            return
        }
        
    }
// Roll dice function with its event listener
    let rollDice;
    btnRollDice.addEventListener('click',rollDice = function(){
        let roll=Math.floor(Math.random()*6+1);
       setImage(roll);
    if(roll===1){
      score=0;
      reinitialize(pId);
      showScore(score,pId); 
      pId= pId===1 ? pId=2:pId=1;
      hidePlayer();
    }
    if(roll!== 1){
      score=roll;
      currentScore=currentScore + roll;
      showScore(score,pId);
    }
    if(gameOver() === true){
        btnRollDice.removeEventListener("click",rollDice);
        btnHold.removeEventListener('click', holdScore);
    return}
    
})

// Holding and Starting a new game 
btnHold.addEventListener('click', holdScore);
btnNewGame.addEventListener('click', setNewGame);
