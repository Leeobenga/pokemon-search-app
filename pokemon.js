const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const pokemonImage = document.getElementById('image');
const pokemonType = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');


const allPokemonsUrl = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';

const checkInput = input => {
  let checkedInput = input.value;

  if (!isNaN(Number(checkedInput))){
    return Number(checkedInput);
  }else{     
    const specialRegex1 =  /(\w+)([\s.,-]+)?(\w+)?([\s-])?(♀|♂)/; 
    const specialRegex2 = /(\w+)([\s.,-])(\w+)/;   
    const regex = /[^\w\s]/g;    
    const matched1 = checkedInput.match(specialRegex1); 
    const matched2 = checkedInput.match(specialRegex2);   

    
    if (matched1) {
      checkedInput = checkedInput.replace(specialRegex1, (_match, firstName, _specialCharacter, lastName, _specialCharacter2, gender) => {
        if (gender === '♀') {
          return `${firstName}-${lastName}-f`;
        } 
        else if(gender === '♂'){
          return `${firstName}-${lastName}-m`;
          }           
        });
    } else if (matched2) {
      checkedInput = checkedInput.replace(specialRegex2, (_match, firstName, _specialCharacter, lastName) => {
        return `${firstName}-${lastName}`;
      })
    }
    else{
      checkedInput = checkedInput.replace(regex, '');      
    }
    console.log(checkedInput);
    return checkedInput.toLowerCase();    
  }
  
};

searchBtn.addEventListener('click', () => {  
  overwriteElements();   

  const fetchData = async () => {
     try{
       let input = checkInput(searchInput);
       const url = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${input}`;

       const res = await fetch(url);
       const pokemonData = await res.json();
       const pokemonArr = pokemonData;
       console.log(pokemonArr);

       if (pokemonArr.types.length > 1){        
        for (const i in pokemonArr.types) {
          pokemonType.innerHTML += `<p  class='pokemon-type' margin-right='10px'>${pokemonArr.types[i].type.name.toUpperCase()}</p>`;  
        }
      }else {
        pokemonType.innerHTML = `<p>pokemonArr.types[0].type.name.toUpperCase()</p>`;
       }

       height.textContent += pokemonArr.height;             
       weight.textContent += pokemonArr.weight;       
       pokemonName.textContent = pokemonArr.name;       
       pokemonId.textContent += pokemonArr.id; 
       console.log(pokemonArr.id);     
       pokemonImage.innerHTML = `<img src='${pokemonArr.sprites.front_default}' alt='${pokemonArr.name}'/>`;       
       hp.textContent = pokemonArr.stats[0].base_stat;      
       attack.textContent = pokemonArr.stats[1].base_stat;       
       defense.textContent = pokemonArr.stats[2].base_stat;
       specialAttack.textContent = pokemonArr.stats[3].base_stat;
       specialDefense.textContent = pokemonArr.stats[4].base_stat;
       speed.textContent = pokemonArr.stats[5].base_stat;

     } catch (err) {
       console.log(err);
       alert('Pokemon not found');
     }  
  };
  fetchData();
    
});

const overwriteElements = () => {
  height.textContent = '';             
  weight.textContent = '';       
  pokemonName.textContent = '';       
  pokemonId.textContent = '';        
  pokemonImage.innerHTML = '';
  pokemonType.textContent = ''; 
  hp.textContent = '';      
  attack.textContent = '';       
  defense.textContent = '';
  specialAttack.textContent = '';
  specialDefense.textContent = '';
  speed.textContent = '';
 }











