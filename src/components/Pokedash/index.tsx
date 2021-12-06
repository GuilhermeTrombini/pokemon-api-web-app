import React, { useState } from "react";
import {
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { editPokemon, pokemons } from "../../app/pokedashSlice";
import { Card } from "../Card";
import { Formik, Form, Field } from "formik";

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
  const [isOpen, setIsOpen] = useState(false);
  const [editingPokemon, setEditingPokemon]: any = useState({});
  const myPokemons = useAppSelector(pokemons);
  const dispatch = useAppDispatch();
  const handleEdit = (formObject: any, pokemon: PokemonObj) => {
    const newPokemonObject: PokemonObj = {
      id: pokemon.id,
      name: formObject.name,
      img: pokemon.img,
      species: pokemon.species,
      health: Number(formObject.health),
      height: Number(formObject.height),
      weight: Number(formObject.weight),
      attack: Number(formObject.attack),
      defense: Number(formObject.defense),
    };
    dispatch(editPokemon(newPokemonObject));
    setIsOpen(false);
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit your pokemon</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              name: editingPokemon.name,
              health: editingPokemon.health,
              height: editingPokemon.height,
              weight: editingPokemon.weight,
              attack: editingPokemon.attack,
              defense: editingPokemon.defense,
            }}
            onSubmit={(values, actions) => {
              handleEdit(values, editingPokemon);
              actions.setSubmitting(false);
            }}
          >
            {(props) => (
              <Form>
                <ModalBody>
                  <Field name="name">
                    {({ field }: any) => (
                      <>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input
                          {...field}
                          type="text"
                          id="name"
                          placeholder="name"
                        />
                      </>
                    )}
                  </Field>
                  <Field name="health">
                    {({ field }: any) => (
                      <>
                        <FormLabel htmlFor="health">Health</FormLabel>
                        <Input
                          {...field}
                          type="number"
                          id="health"
                          placeholder="health"
                        />
                      </>
                    )}
                  </Field>
                  <Field name="height">
                    {({ field }: any) => (
                      <>
                        <FormLabel htmlFor="height">Height</FormLabel>
                        <Input
                          {...field}
                          type="number"
                          id="height"
                          placeholder="height"
                        />
                      </>
                    )}
                  </Field>
                  <Field name="weight">
                    {({ field }: any) => (
                      <>
                        <FormLabel htmlFor="weight">Weight</FormLabel>
                        <Input
                          {...field}
                          type="number"
                          id="weight"
                          placeholder="weight"
                        />
                      </>
                    )}
                  </Field>
                  <Field name="attack">
                    {({ field }: any) => (
                      <>
                        <FormLabel htmlFor="attack">Attack</FormLabel>
                        <Input
                          {...field}
                          type="number"
                          id="attack"
                          placeholder="attack"
                        />
                      </>
                    )}
                  </Field>
                  <Field name="defense">
                    {({ field }: any) => (
                      <>
                        <FormLabel htmlFor="defense">Defense</FormLabel>
                        <Input
                          {...field}
                          type="number"
                          id="defense"
                          placeholder="defense"
                        />
                      </>
                    )}
                  </Field>
                </ModalBody>

                <ModalFooter>
                  <Button
                    type="submit"
                    isLoading={props.isSubmitting}
                    colorScheme="blue"
                    mr={3}
                  >
                    Save
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
      {myPokemons.pokemons.length <= 0 ? (
        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          marginTop="60px"
          textTransform="uppercase"
          ml="2"
        >
          <Box>No Pokemons to be show, add pokemons to see them here.</Box>
        </Box>
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
          gap={3}
        >
          {myPokemons.pokemons.map((pokemon: any, index) => {
            return (
              <Card
                key={index}
                pokemon={pokemon}
                onEditClick={setIsOpen}
                setEditingPokemon={setEditingPokemon}
                isAdd={false}
              />
            );
          })}
        </Grid>
      )}
    </div>
  );
}
