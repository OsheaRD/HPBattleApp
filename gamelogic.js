const victoryMessages=[" is the Champion!", " emerges victorious!", " vanquisged his opponent!"];

// literal !After "DUEL" is pressed the div underneath is populated with: (characterOne) used the (magic/ spell type) and (characterTwo) selected (magic/spell type) ...



function rockPS(playerOne, playerTwo) {
    if (playerOne === playerTwo) {
      return 'The game is a tie!';
    } // closing if tie clause!!!
      
    else if (playerOne === 'rock') {
      if (playerTwo === 'paper') {
         return 'Computer Won!';
      } else {
         return 'You won!';
     } 
    }
    
    else if (playerOne === 'scissors') {
      if (playerTwo === 'rock') {
        return 'Computer won!';
      } else {
        return 'You won!';
      }
    } 
    else if (playerOne === 'paper') {
      if (playerTwo === 'scissors') {
        return 'Computer won!';
      } else {
        return 'You won!';
        
      }
      // console.log(rockPS)
     }
    //  console.log(rockPS)
    };

  

    console.log(rockPS("rock","scissors"))


    /////  ASK ABOUT OUTPUT

    jinx
    curse
    hex
    
    spell
    enchantment
    charm