import axios from "axios";

const POKEMON_API = process.env.REACT_APP_POKEMON_API;
console.log(process.env.REACT_APP_POKEMON_API);
const PokemonApiService = axios.create({
  baseURL: `${POKEMON_API}`,
});

export default PokemonApiService;
