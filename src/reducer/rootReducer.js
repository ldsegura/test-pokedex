import {combineReducers} from "redux";
import locale from "./localeReducer";
import locales from "./localesReducer";
import auth from "./authReducer";
import pokedex from "./pokedexReducer";
import pokemons from "./pokemonsReducer";
import pokemonsBySearch from "./pokemonsBySearchReducer";

const rootReducer = combineReducers({
    locale,
    locales,
    auth,
    pokedex,
    pokemons,
    pokemonsBySearch,
});

export default rootReducer;