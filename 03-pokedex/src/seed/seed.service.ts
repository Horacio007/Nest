import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse, PokemonToInsert } from './interfaces/index';
// import { PokemonService } from 'src/pokemon/pokemon.service';
import { CreatePokemonDto } from 'src/pokemon/dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {

  private readonly axios:AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model<Pokemon>
  ) { }

  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    const {data} = await this.axios.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=650`)

    const pokemonToInsert:PokemonToInsert[] = [];

    data.results.forEach(({name,url}) => {
      const segments:string[] = url.split('/');
      const no:number = +segments[segments.length-2];

      let pokemon = new CreatePokemonDto();
      pokemon = {no, name};
      
      pokemonToInsert.push(pokemon);
    });

    await this.pokemonModel.insertMany(pokemonToInsert);


    //la otra forma con las mejoras una forma buena
    // const insertPromisesArray = [];
    // data.results.forEach(({name,url}) => {
    //   const segments:string[] = url.split('/');
    //   const no:number = +segments[segments.length-2];

    //   let pokemon = new CreatePokemonDto();
    //   pokemon = {no, name};
      
    //   insertPromisesArray.push(this.pokemonModel.create(pokemon));
    // });

    // await Promise.all(insertPromisesArray);

    // mi forma usando el service del pokemon, pero si esta mejor usar el modelo dentro
    // para ciertos casos
    // data.results.forEach(async({name,url}) => {
    //   const segments:string[] = url.split('/');
    //   const no:number = +segments[segments.length-2];

    //   let pokemon = new CreatePokemonDto();
    //   pokemon = {no, name};
      
    //   await this.pokemonService.create(pokemon);
    // })

    return 'Seed executed';
  }

}
