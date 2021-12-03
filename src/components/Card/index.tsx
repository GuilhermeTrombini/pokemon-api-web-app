import React, { useState } from "react";
import {
  Input,
  Button,
  Box,
  Image,
  Badge,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

import { Field, Form, Formik } from "formik";
import { useAppDispatch } from "../../app/hooks";
import { remove, editPokemon } from "../../app/pokedashSlice";

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

export function Card(pokemon: any) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();

  const handleEdit = (formObject: any) => {
    const newPokemonObject: PokemonObj = {
      id: pokemon.id,
      name: formObject.name,
      img: pokemon.img,
      species: pokemon.species,
      health: formObject.health,
      height: formObject.height,
      weight: formObject.weight,
      attack: formObject.attack,
      defense: formObject.defense,
    };
    dispatch(editPokemon(newPokemonObject));
  };

  const handleRemove = (id: number) => {
    dispatch(remove(id));
  };

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={pokemon.img} alt={pokemon.name} />
      {isEditing ? (
        <Formik
          initialValues={{ name: "Sasuke" }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
              handleEdit(values);
            }, 1000);
          }}
        >
          {(props) => (
            <Form>
              <Field name="name">
                {({ field }: any) => (
                  <FormControl>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input {...field} id="name" placeholder="name" />
                    <FormLabel htmlFor="health">Health</FormLabel>
                    <Input {...field} id="health" placeholder="health" />
                    <FormLabel htmlFor="height">Height</FormLabel>
                    <Input {...field} id="height" placeholder="height" />
                    <FormLabel htmlFor="weight">Weight</FormLabel>
                    <Input {...field} id="weight" placeholder="weight" />
                    <FormLabel htmlFor="attack">Attack</FormLabel>
                    <Input {...field} id="attack" placeholder="attack" />
                    <FormLabel htmlFor="defense">Defense</FormLabel>
                    <Input {...field} id="defense" placeholder="defense" />
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      ) : (
        <></>
      )}
      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
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
        <Button onClick={() => handleRemove(pokemon.id)}>Remover</Button>
        <Button onClick={() => setIsEditing(true)}>Editar</Button>
      </Box>
    </Box>
  );
}
