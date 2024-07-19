// form explicita de crear una clase
// export class Pokemon {
//     public id:number;
//     public name:string;

import axios from "axios";
import { Move, PokeapiResponse } from "../interfaces/pokeapi-response.interface";

//     constructor(id:number, name:string) {
//         this.id = id;
//         this.name = name;
//         console.log('constructor llamdado');
//     }
// }

// forma implicita de crear una clase
export class Pokemon {
    
    constructor(public readonly id:number, 
        public name:string
    ) { }
    
    get imageURL():string {
        return `https://pokemon.com/${this.id}.jpg`;
    }

    scream():void {
        console.log(`${this.name.toUpperCase()}!!!`);
        this.speak();
    }

    speak():void {
        console.log(`${this.name}, ${this.name}`);
    }

    async getMoves():Promise<Move[]> {
        const {data} = await axios.get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon/4');
        console.log(data.moves);
        return data.moves;
        // return response;
        // return 10;
    }

}

export const charmander:Pokemon = new Pokemon(1, 'Charmander');

// charmander.id = 151;
// charmander.name = 'Mew';
// console.log(charmander);
// charmander.speak();,o
// charmander.scream();

// charmander.getMoves();
console.log(charmander.getMoves());