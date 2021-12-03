import React from "react";
import { Grid } from "@chakra-ui/react";

import { useAppSelector } from "../../app/hooks";
import { pokemons } from "../../app/pokedashSlice";
import { Card } from "../Card";

interface PokemonObj {
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

export function Pokedash() {
  const myPokemons = useAppSelector(pokemons);

  return (
    <div>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {myPokemons.pokemons.map((pokemon: PokemonObj, index) => {
          return <Card key={index} pokemon={pokemon} />;
        })}
      </Grid>
    </div>
  );
}
