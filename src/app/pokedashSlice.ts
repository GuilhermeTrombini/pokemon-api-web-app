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
      const indexToRemove = state.pokemons.indexOf(action.payload.id);
      state.pokemons.splice(indexToRemove, 1);
    },
    editPokemon: (state, action) => {
      const indexToEdit = state.pokemons.indexOf(action.payload.id);
      state.pokemons[indexToEdit] = action.payload;
    },
  },
});

export const { add, remove, editPokemon } = pokemonSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const pokemons = (state: RootState) => state.pokemons;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default pokemonSlice.reducer;
