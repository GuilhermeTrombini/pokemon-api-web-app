import React, { useState, useEffect } from "react";
import {
  InputGroup,
  InputRightElement,
  Input,
  Button,
  useToast,
  Grid,
} from "@chakra-ui/react";
import PokemonApi from "../../PokemonApi";
import { FaSearch } from "react-icons/fa";
import { BallTriangle } from "react-loading-icons";
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
  const [isLoading, setIsLoading] = useState(false);
  const [searchName, setSearchName] = useState("");
  const toast = useToast();

  const handleSearch = async (keyword: string) => {
    const arrayToSet: any = [];
    setIsLoading(true);
    try {
      const response: any = await PokemonApi.get(`/pokemon/${keyword}`);
      if (response.data.results) {
        const arrayPokemonSuggest: any = [];
        for (const item of response.data.results) {
          PokemonApi.get(`/pokemon/${item.name}`).then((responseArray) => {
            arrayPokemonSuggest.push(responseArray.data);
            if (arrayPokemonSuggest.length === response.data.results.length) {
              setPokemonSearched(arrayPokemonSuggest);
              setIsLoading(false);
            }
          });
        }
      } else {
        arrayToSet.push(response.data);
        setPokemonSearched(arrayToSet);
        setIsLoading(false);
      }
    } catch (rejection: any) {
      toast({
        title: "An error occurred",
        description: "An error occurred on finding this pokemon",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (pokemonSearched.length <= 0) {
      setIsLoading(true);
      PokemonApi.get(`/pokemon/`).then((response) => {
        if (response.data.results) {
          const arrayPokemonSuggest: any = [];
          try {
            for (const item of response.data.results) {
              PokemonApi.get(`/pokemon/${item.name}`).then((responseArray) => {
                arrayPokemonSuggest.push(responseArray.data);
                if (
                  arrayPokemonSuggest.length === response.data.results.length
                ) {
                  setPokemonSearched(arrayPokemonSuggest);
                  setIsLoading(false);
                }
              });
            }
          } catch {
            toast({
              title: "An error occurred",
              description: "An error occurred on loading pokemons",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            setIsLoading(false);
          }
        }
      });
    }
  }, [pokemonSearched.length, toast]);

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
      {isLoading ? (
        <BallTriangle
          style={{ margin: "0 auto", marginTop: "60px" }}
          stroke="#2b6cb0"
        />
      ) : (
        <Grid
          templateColumns={
            window.innerWidth > 1500
              ? "repeat(4, 1fr)"
              : window.innerWidth > 1170
              ? "repeat(3, 1fr)"
              : window.innerWidth > 768
              ? "repeat(2, 1fr)"
              : "repeat(1, 1fr)"
          }
          gap={6}
        >
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
      )}
    </div>
  );
}
