//defing all arrays
let spellList = [];
let duelist = [];
let charm = [];
let enchantment = [];
let spell = [];
let curse = [];
let jinx = [];
let hex = [];
let newArray = [];
let spellArray = [];

const db = firebase.firestore();
const increment = firebase.firestore.FieldValue.increment(1);
let winnersRef;
let unsubscribe;

//Grab all chracters
axios.get(`https://www.potterapi.com/v1/characters?key=$2a$10$kEWfepxiOOkIh/QC00kc2.sz3y.jwyUj/SmEzsFSsX5yEAxEeKO.u`)
.then(
     async (response) => {
        mapDuelist(response.data)
    }
)

mapDuelist = (currentDuelist) => {
   let dropDown1 =  document.getElementById("drop1")
   let i = 2;
    currentDuelist.forEach(element => {
        duelist.push(element.name);
        let option = document.createElement("option")
        option.text = `${element.name}`
        dropDown1.add(option,i);
        i++;
    });
    document.getElementById("drop2").innerHTML = dropDown1.innerHTML
}


//Grab Spells
// spells need to be sorted into individual categories
const spells = [];
axios.get(`https://www.potterapi.com/v1/spells?key=$2a$10$kEWfepxiOOkIh/QC00kc2.sz3y.jwyUj/SmEzsFSsX5yEAxEeKO.u`)
.then(
    async (response) => {
        mapSpells(response.data)
    }
)

mapSpells = async (currentSpell) => {
    let spell1 =  document.getElementById("spell1")
    let i = 2;
    let newSpellTypes = [];
   currentSpell.forEach(element => {
    newArray.push(element.spell)
      newSpellTypes.push(element.type)
    });

sliceArray(newArray, charm)
sliceArray(newArray, enchantment)
sliceArray(newArray, curse)

//Removes duplicates from spelltypes array
spellList = [...new Set(newSpellTypes)];

for(let i=spellList.length - 1;i >= 0;i--) {
    if(spellList[i] === "Hex" || spellList[i] === "Jinx" || spellList[i] === "Spell") {
        spellList.splice(i,1)
    }
}
console.log(spellArray);
spellList.forEach(element => {
    let option = document.createElement("option");
    option.text = element;
    spell1.add(option,i);
})
document.getElementById("spell2").innerHTML = spell1.innerHTML
}

function sliceArray(a, b) {
    let size = 50;
    b.push(a.splice(0, size))
    
}

//game logic

let duelButton = document.getElementById('duelButton');
duelButton.addEventListener("click", function() {
    console.log('game has started');
    let player1 = document.getElementById('drop1').value
    console.log(player1);
    let player2 = document.getElementById('drop2').value
    console.log(player2);
    let player1Spell = document.getElementById('spell1').value;
    console.log('player one chose ', player1Spell);
    let player2Spell = document.getElementById('spell2').value;
    console.log('player two chose ', player2Spell);
});

function duelApp(player1, player2) { // "charm" = rock, "Enchantment" = paper, "curse" = scissors
    if (player1 === player2) {
        return "Game tied. Try again may the best wizard win!";
    }

    else if (player1 === "Charm") {
        if (player2 === "Enchantment") {
            return "Player 2 wins!";
        } else {
            return "Player 1 wins!"
        }
    }
    else if (player1 === "Curse") {
        if (player2 === "Charm") {
            return "Player 2 wins!";
        } else {
            return "Player 1 wins!";
        }
    }
    else if (player1 === "Enchantment") {
        if (player2 === "Curse") {
            return "Player 2 wins!";
        } else {
            return "Player 1 wins!";
        }
    }
}
console.log(duelApp("Enchantment", "Curse"));

// let charm > en > spell > curse > jinx > hex
checkWinner = (duelist1,duelist2) => {

}

//select random
getRandomName = (duelist) => {
 return randomName = duelist[Math.floor(Math.random() * duelist.length)];
}


getRandomSpell = (spellList) => {
    randomType = spellList[Math.floor(Math.random() * spellList.length)];
    switch(randomType) {
        case "Charm": //rock
            return charm[Math.floor(Math.random() * charm.length)]
        case "Enchantment": // paper
            return enchantment[Math.floor(Math.random() * enchantment.length)]
        case "Curse": //scissor
            return curse[Math.floor(Math.random() * curse.length)]
      }  
}

writeInitialWin = (winner) => {
    winnersRef = db.collection('winners').doc(`${winner}`);
    winnersRef.set({
        wins: 1
    });

}

updateWin = (winner) => {
    const batch = db.batch();
    winnersRef = db.collection('winners').doc(`${winner}`);
    batch.set(winnersRef,{wins: increment}, {merge: true});
    batch.commit();
}

checkWinner = (winner) => {
    winnersRef = db.collection('winners').doc(`${winner}`);
    if(!winnersRef.exists) {
        updateWin(`${winner}`)
    } else {
        writeInitialWin(`${winner}`)
    }
}

// talk = (text) => {
//     TextToSpeech.talk(text)
// }

// talk("blah")

//TODO: At start have computer be a random character wtih random spell type connected
