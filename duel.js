//defing all arrays
let spellList = [];
let duelist = [];
let charm = [];
let enchantment = [];
let spell = [];
let curse = [];
let jinx = [];
let hex = [];


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
    newSpellTypes.push(element.type)
      switch(`${element.type}`) {
        case "Charm":
              charm.push(`${element.spell}`);
              break;
        case "Enchantment":
            enchantment.push(`${element.spell}`);
                break;
        case "Spell":
            spell.push(`${element.spell}`);
                break;
        case "Curse":
            curse.push(`${element.spell}`);
              break;
        case "Jinx":
            jinx.push(`${element.spell}`);
                break;
        case "Hex":
            hex.push(`${element.spell}`);
                break;
      }
    });

//Removes duplicates from spelltypes array
spellList = [...new Set(newSpellTypes)];
spellList.forEach(element => {
    let option = document.createElement("option");
    option.text = element;
    spell1.add(option,i);
})
document.getElementById("spell2").innerHTML = spell1.innerHTML
}


//game logic

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
        case "Charm":
            return charm[Math.floor(Math.random() * charm.length)]
        case "Enchantment":
            return enchantment[Math.floor(Math.random() * enchantment.length)]
        case "Spell":
            return spell[Math.floor(Math.random() * spell.length)]
        case "Curse":
            return curse[Math.floor(Math.random() * curse.length)]
        case "Jinx":
            return jinx[Math.floor(Math.random() * jinx.length)]
        case "Hex":
            return hex[Math.floor(Math.random() * hex.length)]
      }  
}


