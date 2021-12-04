import React, { useState } from "react";
import {
  InputGroup,
  InputRightElement,
  Input,
  Button,
  useToast,
  Grid,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import PokemonApi from "../../PokemonApi";
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
export function Searcher() {
  const [pokemonSearched, setPokemonSearched]: any = useState([]);
  const [searchName, setSearchName] = useState("");
  const toast = useToast();

  const handleSearch = async (keyword: string) => {
    const arrayToSet: any = [];
    try {
      const response: any = await PokemonApi.get(`/pokemon/${keyword}`);
      if (response.data.results) {
        return response.data.results;
      } else {
        arrayToSet.push(response.data);
        setPokemonSearched(arrayToSet);
      }
    } catch (rejection: any) {
      toast({
        title: "An error occurred",
        description: "An error occurred on finding this pokemon",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <div>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type="text"
          variant="outline"
          placeholder="Search a pokemon"
          onChange={(e) => setSearchName(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={() => handleSearch(searchName)}
          >
            <FaSearch />
          </Button>
        </InputRightElement>
      </InputGroup>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {pokemonSearched.map((pokemon: any, index: any) => {
          const newPokemonObject: PokemonObj = {
            id: pokemon.id,
            name: pokemon.name,
            img: pokemon.sprites?.front_default,
            species: pokemon.species.name,
            health: pokemon.stats[0]?.base_stat,
            height: pokemon.height,
            weight: pokemon.weight,
            attack: pokemon.stats[1]?.base_stat,
            defense: pokemon.stats[2]?.base_stat,
          };
          return (
            <Card
              key={index}
              pokemon={newPokemonObject}
              onEditClik={() => null}
              setEditingPokemon={() => null}
              isAdd={true}
            />
          );
        })}
      </Grid>
    </div>
  );
}
