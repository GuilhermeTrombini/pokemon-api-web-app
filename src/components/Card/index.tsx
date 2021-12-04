import React from "react";
import { Button, Box, Image, Badge, useToast } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { remove, add, pokemons } from "../../app/pokedashSlice";
import "./Card.css";
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
export function Card({ pokemon, onEditClick, setEditingPokemon, isAdd }: any) {
  const dispatch = useAppDispatch();
  const myPokemons = useAppSelector(pokemons);
  const toast = useToast();
  const handleAdd = (pokemonToAdd: PokemonObj) => {
    const arrayRepeat = [];
    myPokemons.pokemons.map((item) => {
      if (item.id === pokemonToAdd.id) {
        return arrayRepeat.push(item);
      } else {
        return null;
      }
    });
    if (arrayRepeat.length > 0) {
      return toast({
        title: "An error occurred",
        description: "You already have this pokemon on your pokedex",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      dispatch(add(pokemonToAdd));
      toast({
        title: "Success!",
        description: "Pokemon added to your pokedex!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleRemove = (id: number) => {
    dispatch(remove(id));
    toast({
      title: "Success!",
      description: "Pokemon removed from your pokedex!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      maxW="sm"
      minWidth="280px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      className="cardDiv"
    >
      <Image width="100%" src={pokemon.img} alt={pokemon.name} />
      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
        {pokemon.name}
      </Box>
      <Badge borderRadius="full" px="5" colorScheme="teal">
        Species: {pokemon.species}
      </Badge>
      <Box p="4">
        <Box
          display="flex"
          margin="5px 0px"
          alignItems="baseline"
          justifyContent="space-evenly"
          paddingTop="0px"
        >
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            <Box>Height</Box>
            <Box>{pokemon.height}</Box>
          </Box>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            <Box>Weight</Box>
            <Box>{pokemon.weight}</Box>
          </Box>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            <Box>HP</Box>
            <Box>{pokemon.health}</Box>
          </Box>
        </Box>
        <Box
          display="flex"
          margin="5px 0px"
          alignItems="baseline"
          justifyContent="space-evenly"
        >
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            <Box>Attack</Box>
            <Box>{pokemon.attack}</Box>
          </Box>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            <Box>Defense</Box>
            <Box>{pokemon.defense}</Box>
          </Box>
        </Box>
      </Box>
      <Box display="flex" p="3" justifyContent="space-around">
        {isAdd ? (
          <Button onClick={() => handleAdd(pokemon)}>Add</Button>
        ) : (
          <>
            <Button onClick={() => handleRemove(pokemon.id)}>Remove</Button>
            <Button
              onClick={() => {
                onEditClick(true);
                setEditingPokemon(pokemon);
              }}
            >
              Edit
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
