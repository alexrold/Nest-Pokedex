import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from '../common/adapters/axios.adapter';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { PokeResponse } from './interface/poke-response';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSedd() {
    if (process.env.NODE_ENV === 'production') {
      return;
    }
    await this.pokemonModel.deleteMany();
    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segmento = url.split('/');
      const no: number = +segmento[segmento.length - 2];
      pokemonToInsert.push({ name, no });
    });
    this.pokemonModel.insertMany(pokemonToInsert);
    return 'Seed executed';
  }
}
