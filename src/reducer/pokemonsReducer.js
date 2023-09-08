import initialState from "./initialState";
import types from "../constants/reducers/pokemonsConstant";

const pokemonsReducer = (state = initialState.pokemons, action) => {
    switch(action.type) {
        case types.POKEMONS:
            return {...initialState.pokemons, ...action.pokemons};
        case types.POKEMONS_FETCHING:
            return {...initialState.pokemons, ...action.pokemons};
        case types.POKEMONS_ERROR:
            return {...initialState.pokemons, ...action.pokemons};
        default:
            return state;
    }
}
export default pokemonsReducer;