import initialState from "./initialState";
import types from "../constants/reducers/pokemonsBySearchConstant";

const pokemonsBySearchReducer = (state = initialState.pokemonsBySearch, action) => {
    switch(action.type) {
        case types.POKEMONS_SEARCH:
            return {...initialState.pokemonsBySearch, ...action.pokemonsBySearch};
        case types.POKEMONS_SEARCH_FETCHING:
            return {...initialState.pokemonsBySearch, ...action.pokemonsBySearch};
        case types.POKEMONS_SEARCH_ERROR:
            return {...initialState.pokemonsBySearch, ...action.pokemonsBySearch};
        default:
            return state;
    }
}
export default pokemonsBySearchReducer;