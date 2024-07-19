export const pokemonIds:number[] = [1, 5, 89, 76, 27, 28];
pokemonIds.push(+'1');

interface IPokemon {
    id:number;
    name:string;
    age?:number;
}

export const bulbasour:IPokemon = {
    id:1,
    name:'Bulbasour'   
}

export const charmander:IPokemon = {
    id:2,
    name:'Charmander'
}

export const pokemons:IPokemon[] = [];
pokemons.push(charmander,bulbasour);

console.log(pokemons);