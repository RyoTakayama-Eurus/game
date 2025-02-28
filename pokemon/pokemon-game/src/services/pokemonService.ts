import axios from 'axios';
import { Pokemon, Move, PokedexEntry } from '../types/pokemon';

const API_URL = 'https://pokeapi.co/api/v2';

// ポケモンの基本情報を取得
export const getPokemon = async (idOrName: number | string): Promise<Pokemon> => {
  try {
    const response = await axios.get(`${API_URL}/pokemon/${idOrName}`);
    const data = response.data;
    
    // 技の詳細情報を取得
    const movesPromises = data.moves.slice(0, 4).map(async (moveData: any) => {
      const moveResponse = await axios.get(moveData.move.url);
      const moveDetails = moveResponse.data;
      
      return {
        name: moveDetails.name,
        power: moveDetails.power || 0,
        type: moveDetails.type.name,
        accuracy: moveDetails.accuracy || 100
      } as Move;
    });
    
    const moves = await Promise.all(movesPromises);
    
    // ポケモンデータを整形
    return {
      id: data.id,
      name: data.name,
      types: data.types.map((type: any) => type.type.name),
      sprites: {
        front_default: data.sprites.front_default,
        back_default: data.sprites.back_default || data.sprites.front_default
      },
      stats: {
        hp: data.stats.find((stat: any) => stat.stat.name === 'hp').base_stat,
        attack: data.stats.find((stat: any) => stat.stat.name === 'attack').base_stat,
        defense: data.stats.find((stat: any) => stat.stat.name === 'defense').base_stat,
        speed: data.stats.find((stat: any) => stat.stat.name === 'speed').base_stat
      },
      moves
    };
  } catch (error) {
    console.error('ポケモンデータの取得に失敗しました:', error);
    throw error;
  }
};

// ポケモン一覧を取得（ポケデックス用）
export const getPokedexList = async (limit: number = 20, offset: number = 0): Promise<PokedexEntry[]> => {
  try {
    const response = await axios.get(`${API_URL}/pokemon?limit=${limit}&offset=${offset}`);
    const results = response.data.results;
    
    const pokemonPromises = results.map(async (pokemon: any) => {
      const detailResponse = await axios.get(pokemon.url);
      const detail = detailResponse.data;
      
      return {
        id: detail.id,
        name: detail.name,
        image: detail.sprites.front_default,
        types: detail.types.map((type: any) => type.type.name)
      } as PokedexEntry;
    });
    
    return await Promise.all(pokemonPromises);
  } catch (error) {
    console.error('ポケモン一覧の取得に失敗しました:', error);
    throw error;
  }
};

// ランダムなポケモンを取得
export const getRandomPokemon = async (): Promise<Pokemon> => {
  const randomId = Math.floor(Math.random() * 151) + 1; // 初代ポケモン（1-151）からランダム
  return getPokemon(randomId);
}; 