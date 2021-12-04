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
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { editPokemon, pokemons } from "../../app/pokedashSlice";
import { Card } from "../Card";
import { Formik, Form } from "formik";

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
      health: formObject.health,
      height: formObject.height,
      weight: formObject.weight,
      attack: formObject.attack,
      defense: formObject.defense,
    };
    dispatch(editPokemon(newPokemonObject));
    setIsOpen(false);
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Formik
          initialValues={{ name: editingPokemon.name }}
          onSubmit={(values, actions) => {
            handleEdit(values, editingPokemon);
          }}
        >
          <Form>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit your pokemon</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {" "}
                <FormControl>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    defaultValue={editingPokemon.name}
                    id="name"
                    placeholder="name"
                  />
                  <FormLabel htmlFor="health">Health</FormLabel>
                  <Input
                    defaultValue={editingPokemon.health}
                    id="health"
                    placeholder="health"
                  />
                  <FormLabel htmlFor="height">Height</FormLabel>
                  <Input
                    defaultValue={editingPokemon.height}
                    id="height"
                    placeholder="height"
                  />
                  <FormLabel htmlFor="weight">Weight</FormLabel>
                  <Input
                    defaultValue={editingPokemon.weight}
                    id="weight"
                    placeholder="weight"
                  />
                  <FormLabel htmlFor="attack">Attack</FormLabel>
                  <Input
                    defaultValue={editingPokemon.attack}
                    id="attack"
                    placeholder="attack"
                  />
                  <FormLabel htmlFor="defense">Defense</FormLabel>
                  <Input
                    defaultValue={editingPokemon.defense}
                    id="defense"
                    placeholder="defense"
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button type="submit" colorScheme="blue" mr={3}>
                  Salvar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Form>
        </Formik>
      </Modal>
      {window.innerWidth > 1024 ? (
        <Grid templateColumns="repeat(4, 1fr)" gap={3}>
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
      ) : (
        <div
          style={{
            display: "flex",
            overflow: "auto",
            justifyContent: "space-between",
          }}
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
        </div>
      )}
    </div>
  );
}
