export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  sprites: {
    front_default: string;
    back_default: string;
  };
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
  moves: Move[];
}

export interface Move {
  name: string;
  power: number;
  type: string;
  accuracy: number;
}

export interface BattlePokemon extends Pokemon {
  currentHp: number;
  selectedMove?: Move;
}

export interface PokedexEntry {
  id: number;
  name: string;
  image: string;
  types: string[];
} 