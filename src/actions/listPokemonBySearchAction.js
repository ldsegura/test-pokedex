import types from "../constants/reducers/pokemonsBySearchConstant";

const loading = () => {
  const pokemonsBySearch = {
    loading: true,
  };
  return {
    type: types.POKEMONS_SEARCH_FETCHING,
    pokemonsBySearch,
  };
};

const loadingData = (data) => {
  const pokemonsBySearch = {
    ...data,
    loading: true,
  };
  return {
    type: types.POKEMONS_SEARCH_FETCHING,
    pokemonsBySearch,
  };
};
const errorDispath = (pokemonsBySearch) => {
  pokemonsBySearch.error = true;
  return {
    type: types.POKEMONS_SEARCH_ERROR,
    pokemonsBySearch,
  };
};
const getDispatch = (pokemonsBySearch) => {
  pokemonsBySearch.complete = true;

  return { type: types.POKEMONS_SEARCH, pokemonsBySearch };
};

const update = async (pokemonsBySearch, dispatch) => {
  dispatch(getDispatch(pokemonsBySearch));
};

const loaded = (pokemonsBySearch, dispatch) => {
  try {
    dispatch(loading());
  } catch (e) {
    dispatch(errorDispath());
  }
};

const listPokemonBySearchAction = {
  update,
  loaded
};

export default listPokemonBySearchAction;
