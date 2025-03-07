const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")
const pokemonId = document.getElementById("pokemon-id")
const pokemonName = document.getElementById("pokemon-name")
const pokemonWeight = document.getElementById("weight")
const pokemonHeight = document.getElementById("height")
const pokemonImg = document.getElementById("pic-container")
const pokemonType = document.getElementById("types")
const pokemonHp = document.getElementById("hp")
const pokemonAttack = document.getElementById("attack")
const pokemonDefense = document.getElementById("defense")
const pokemonSpecialAttack = document.getElementById("special-attack")
const pokemonSpecialDefense = document.getElementById("special-defense")
const pokemonSpeed = document.getElementById("speed")

const searchRegex = /^[a-z]+$/i;


const getPokemon = (str) => {
  fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon")
  .then(response => response.json())
  .then(data => {
    let pokemon = null;

    const idOrStr = str => {
      if(!str){return}
      else if(!isNaN(str)){
        return pokemon = data.results.find(p => p.id === Number(str));
      }else{
        return pokemon = data.results.find(p => p.name === str.toLowerCase());
      }  
    }
    
    idOrStr(str)

    if(!pokemon){
        alert("Pokémon not found")
      pokemonId.textContent = "Pokémon not found";
      pokemonType.textContent = "";
      pokemonName.textContent = "";
      pokemonType.innerHTML = "";
      pokemonImg.src = "";
      return;
    }
    
    
return fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemon.id}`)
.then(response => response.json())
.then(pokemonDetails => {
  
  pokemonId.textContent = `#${pokemonDetails.id}`;
  pokemonName.textContent = pokemonDetails.name;
  pokemonWeight.textContent = `Weight: ${pokemonDetails.weight}`;
  pokemonHeight.textContent = `Height: ${pokemonDetails.height}`;
  pokemonImg.innerHTML = `<img id="sprite" src="${pokemonDetails.sprites.front_default}" alt="${pokemonDetails.name}"></img>`;
  if(pokemonDetails.types.length === 1){
    pokemonType.innerHTML = `<div>${pokemonDetails.types[0].type.name}</div>`
  }else{
    pokemonType.innerHTML = `<div>${pokemonDetails.types[0].type.name}</div>
    <div>${pokemonDetails.types[1].type.name}</div>`
  }
    pokemonHp.textContent = pokemonDetails.stats[0].base_stat;
  pokemonAttack.textContent = pokemonDetails.stats[1].base_stat;
  pokemonDefense.textContent = pokemonDetails.stats[2].base_stat;
  pokemonSpecialAttack.textContent = pokemonDetails.stats[3].base_stat;
  pokemonSpecialDefense.textContent = pokemonDetails.stats[4].base_stat;
  pokemonSpeed.textContent = pokemonDetails.stats[5].base_stat;
})
  
     
    
  })
  .catch(error => console.error(error))
}


searchButton.addEventListener("click", ()=>{
  const searchTerm = searchInput.value.trim();
  if(searchTerm){
    getPokemon(searchTerm)
  }
  searchInput.value = "";
  
  
  })
