//defing all arrays
let spellList = [];
var duelist = [];
let charm = [];
let enchantment = [];
let spell = [];
let curse = [];
let jinx = [];
let hex = [];
let newArray = [];
let spellArray = [];
let winners = [];
 
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
    let spell1 =  document.getElementById("spellRadio1")
    let i = 2;
    let newSpellTypes = [];
   currentSpell.forEach(element => {
      newArray.push(element.spell)
      newSpellTypes.push(element.type)
    });
    console.log(newArray)

charm = newArray.slice(0,50)
curse = newArray.slice(50,100)
enchantment = newArray.slice(100,150)

//Removes duplicates from spelltypes array
spellList = [...new Set(newSpellTypes)];

for(let i=spellList.length - 1;i >= 0;i--) {
    if(spellList[i] === "Hex" || spellList[i] === "Jinx" || spellList[i] === "Spell") {
        spellList.splice(i,1)
    }
}
//<input type="radio" id="male" name="gender" value="male">
console.log(spellArray);
let radioDiv = document.getElementById('radio1');
spellList.forEach(element => {

  let radio = document.createElement('input');
  let label = document.createElement('label');
  const br = document.createElement('br')
  radio.type = 'radio';
  radio.name = "spell";
  radio.value =`${element}`;

  label.setAttribute("for", `${element}`);
  label.innerHTML = `${element}`;
  radioDiv.appendChild(radio)
  radioDiv.appendChild(label)
  radioDiv.appendChild(br)

})

let radioDiv2 = document.getElementById('radio2');
spellList.forEach(element => {
  let radio2 = document.createElement('input');
  let label2 = document.createElement('label');
  const br = document.createElement('br')
  radio2.type = 'radio';
  radio2.name = "spell2";
  radio2.value =`${element}`;

  label2.setAttribute("for", `${element}`);
  label2.innerHTML = `${element}`;
  radioDiv2.appendChild(radio2)
  radioDiv2.appendChild(label2)
  radioDiv2.appendChild(br)

})

}

//game logic
let duelButton = document.getElementById('duelButton');
duelButton.addEventListener("click", function() {
    console.log('game has started');
    let player1 = selectDuelist();
    console.log(player1);
    let player2 = selectDuelist2();
    console.log(player2);
    let player1Spell = duelSpell();
    console.log(player1Spell);
    let player2Spell = duelSpell2();
    console.log(player2Spell);
    responsiveVoice.speak(`${player1} vs ${player2}`);
    responsiveVoice.pause();
    responsiveVoice.speak(`${player1} cast ${player1Spell[0]} ${player2} cast ${player2Spell[0]}`);
    checkWinner(duelApp(player1,player2,player1Spell[1],player2Spell[1]))
});


duelButton.addEventListener('click', function(){
   let newBoxes= document.getElementById('duel');
newBoxes.style.background= 'url(img/purplespectrumgif.gif)';
newBoxes.style.backgroundRepeat= 'repeat-x';
newBoxes.style.backgroundSize= '100% 100%';

})



let resetButton = document.getElementById('resetButton');
resetButton.addEventListener("click", function() {
    document.location.href= [];
})

selectDuelist = () => {
let player1 = document.getElementById('drop1').value
if(player1 === 'Random') {
    return getRandomName(duelist);
} else {
    return player1
}
}

selectDuelist2 = () => {
let player2 = document.getElementById('drop2').value
if(player2 === 'Random') {
    return getRandomName(duelist);
} else {
    return player2
}
}

duelSpell = () => {
    let player1Spell = document.getElementById('radio1').elements['spell'].value
    let spell = getRandomSpell(player1Spell)
    return spell;
}

duelSpell2 = () => {
    let player2Spell = document.getElementById('radio2').elements['spell2'].value
    let spell = getRandomSpell(player2Spell)
    return spell;
}

function duelApp(player1,player2,player1Spell,player2Spell) { // "charm" = rock, "Enchantment" = paper, "curse" = scissors
    if (player1Spell === player2Spell) {
        return undefined;
    }

    else if (player1Spell === "Charm") {
        if (player2Spell === "Enchantment") {
            return `${player2}`
        } else {
            return `${player1}`
        }
    }
    else if (player1Spell === "Curse") {
        if (player2Spell === "Charm") {
            return `${player2}`
        } else {
            return `${player1}`
        }
    }
    else if (player1Spell === "Enchantment") {
        if (player2Spell === "Curse") {
            return `${player2}`
        } else {
            return `${player1}`
        }
    }
}

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
  }

getRandomName = (duelist) => {
     return duelist.random();
}

getRandomSpell = (spell) => {
    const spellList = ["Charm", "Enchantment", 'Curse']
    if(spellList.includes(spell)) {
        randomType = spell;
    } else {
        randomType = spellList[Math.floor(Math.random() * spellList.length)];
    }
    switch(randomType) {
        case "Charm": //rock
            return [charm.random(), randomType]
        case "Enchantment": // paper
            return [enchantment.random(), randomType];
        case "Curse": //scissor
            return [curse.random(), randomType]
      }  
}

writeInitialWin = async (winner) => {
    winnersRef = db.collection('winners').doc(`${winner}`);
    winnersRef.set({
        name: `${winner}`,
        wins: 1
    });
    unsubscribe = winnersRef
}

updateWin = async (winner) => {
    const batch = db.batch();
    winnersRef = db.collection('winners').doc(`${winner}`);
    batch.set(winnersRef,{wins: increment}, {merge: true});
    batch.commit();
}

checkWinner = async (winner) => {
    winnersRef = await db.collection('winners').doc(`${winner}`);
    if(winner === undefined) {
       responsiveVoice.speak('Duel ends in draw')
       victor.innerHTML = 'Curses Duel Was a Tie'
    } else if(winnersRef.exists) {
        responsiveVoice.speak(`${winner} wins!`);
        victor.innerHTML = `${winner}`
        updateWin(`${winner}`)
    } else {
        responsiveVoice.speak(`${winner} wins!`);
        victor.innerHTML = `${winner}`
        writeInitialWin(`${winner}`)
    }
}

document.getElementById('winnersButton').addEventListener("click", function() {
    createTable();
})

getTableData = async () => {
    winners = await firebase.firestore().collection('winners').get()
    return await winners.docs.map(doc => doc.data());
}

createTable = () => {
    let table = document.getElementById("winnersInner");
    getTableData()
    .then( (winners) => {
        generateTable(table,winners)
})
}


  function generateTable(table, data) {
    for (let element of data) {
      let row = table.insertRow();
      for (key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element.name);
        let cell1 = row.insertCell();
        let text1 = document.createTextNode(element.wins);
        cell.appendChild(text);
        cell1.appendChild(text1);
        break;
      }
    }
  }

  createTable();


  
