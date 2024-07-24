import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interfaces';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { CreatePokemonDto } from 'src/pokemon/dto';

@Injectable()
export class SeedService {

  private readonly axios:AxiosInstance = axios;

  constructor(private readonly pokemonService:PokemonService) { }

  async executeSeed() {
    const {data} = await this.axios.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=10`);

    data.results.forEach(async({name,url}) => {
      const segments:string[] = url.split('/');
      const no:number = +segments[segments.length-2];

      let pokemon = new CreatePokemonDto();
      pokemon = {no, name};
      
      await this.pokemonService.create(pokemon);
    })

    return 'Seed executed';
  }

}
