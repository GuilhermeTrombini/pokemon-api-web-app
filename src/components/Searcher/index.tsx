import React, { useState } from "react";
import {
  InputGroup,
  InputRightElement,
  Input,
  Button,
  useToast,
  Grid,
  Box,
  Image,
  Badge,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useAppDispatch } from "../../app/hooks";
import { add } from "../../app/pokedashSlice";
import PokemonApi from "../../PokemonApi";
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
  const [pokemonSearched, setPokemonSearched] = useState([]);
  const [searchName, setSearchName] = useState("");
  const toast = useToast();
  const dispatch = useAppDispatch();

  const handleAdd = (pokemonToAdd: PokemonObj) => {
    dispatch(add(pokemonToAdd));
  };

  const handleSearch = async (keyword: string) => {
    try {
      const response: any = await PokemonApi.get(`/pokemon/${keyword}`);
      setPokemonSearched(response.data.results);
    } catch (rejection: any) {
      toast({
        title: "An error occurred",
        description: rejection,
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
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {pokemonSearched.map((pokemon: any) => {
          return (
            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <Image src={pokemon.img} alt={pokemon.name} />
              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                {pokemon.name}
              </Box>
              <Box p="6">
                <Badge borderRadius="full" px="2" colorScheme="teal">
                  New
                </Badge>
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
                    <Box>Height</Box>
                    <Box>{pokemon.height}</Box>
                  </Box>
                  <Box>
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
                  <Box>
                    <Box>Attack</Box>
                    <Box>{pokemon.attack}</Box>
                  </Box>
                  <Box>
                    <Box>Defense</Box>
                    <Box>{pokemon.defense}</Box>
                  </Box>
                </Box>
              </Box>
              <Box display="flex">
                <Button onClick={() => handleAdd(pokemon)}>Adicionar</Button>
              </Box>
            </Box>
          );
        })}
      </Grid>
    </div>
  );
}
