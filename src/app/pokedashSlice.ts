import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface PokemonState {
  pokemons: {
    id: number;
    name: string;
    img: string;
    species: string;
    health: number;
    height: number;
    weight: number;
    attack: number;
    defense: number;
  }[];
}

export interface PokemonObj {
  id: number;
  name: string;
  img: string;
  species: string;
  health: number;
  height: number;
  weight: number;
  attack: number;
  defense: number;
}

const initialState: PokemonState = {
  pokemons: [],
};

export const pokemonSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    add: (state, action) => {
      state.pokemons.push(action.payload);
    },
    remove: (state, action) => {
      var indexToRemove = -1;
      state.pokemons.forEach((item, index) => {
        if (item.id === action.payload) {
          indexToRemove = index;
        } else {
          return null;
        }
      });
      state.pokemons.splice(indexToRemove, 1);
    },
    editPokemon: (state, action) => {
      var indexToEdit = -1;
      state.pokemons.map((item, index) => {
        if (item.id === action.payload.id) {
          return (indexToEdit = index);
        } else {
          return null;
        }
      });
      state.pokemons[indexToEdit] = action.payload;
    },
  },
});

export const { add, remove, editPokemon } = pokemonSlice.actions;

export const pokemons = (state: RootState) => state.pokemons;

export default pokemonSlice.reducer;
