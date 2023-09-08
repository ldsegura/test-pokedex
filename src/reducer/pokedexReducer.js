import initialState from "./initialState";
import types from "../constants/reducers/pokedexConstant";

const pokedexReducer = (state = initialState.pokedex, action) => {
    switch(action.type) {
        case types.POKEDEX:
            return {...initialState.pokedex, ...action.pokedex};
        case types.POKEDEX_FETCHING:
            return {...initialState.pokedex, ...action.pokedex};
        case types.POKEDEX_ERROR:
            return {...initialState.pokedex, ...action.pokedex};
        default:
            return state;
    }
}
export default pokedexReducer;