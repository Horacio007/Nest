import { Injectable } from '@nestjs/common';
import { PokeResponse, PokemonToInsert } from './interfaces/index';
// import { PokemonService } from 'src/pokemon/pokemon.service';
import { CreatePokemonDto } from 'src/pokemon/dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model<Pokemon>,
    private readonly http:AxiosAdapter
  ) { }

  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    // const {data} = await this.http .get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=650`)
    const data = await this.http .get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=650`)

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
