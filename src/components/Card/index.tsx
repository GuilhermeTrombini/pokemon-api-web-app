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
    }
  };
  const handleRemove = (id: number) => {
    dispatch(remove(id));
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
      <Box p="6">
        <Badge borderRadius="full" px="2" colorScheme="teal">
          {pokemon.species}
        </Badge>
        <Box
          display="flex"
          alignItems="baseline"
          justifyContent="space-between"
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
        </Box>
        <Box
          display="flex"
          alignItems="baseline"
          justifyContent="space-between"
        >
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
      <Box display="flex" p="2" justifyContent="space-around">
        {isAdd ? (
          <Button onClick={() => handleAdd(pokemon)}>Adicionar</Button>
        ) : (
          <>
            <Button onClick={() => handleRemove(pokemon.id)}>Remover</Button>
            <Button
              onClick={() => {
                onEditClick(true);
                setEditingPokemon(pokemon);
              }}
            >
              Editar
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
