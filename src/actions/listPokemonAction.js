import types from "../constants/reducers/pokemonsConstant";

const loading = () => {
  const pokemons = {
    loading: true,
  };
  return {
    type: types.POKEMONS_FETCHING,
    pokemons,
  };
};

const loadingData = (data) => {
  const pokemons = {
    ...data,
    loading: true,
  };
  return {
    type: types.POKEMONS_FETCHING,
    pokemons,
  };
};
const errorDispath = (pokemons) => {
  pokemons.error = true;
  return {
    type: types.POKEMONS_ERROR,
    pokemons,
  };
};
const getDispatch = (pokemons) => {
  pokemons.complete = true;

  return { type: types.POKEMONS, pokemons };
};

const update = async (pokemons, dispatch) => {
  dispatch(getDispatch(pokemons));
};

const loaded = (pokemons, dispatch) => {
  try {
    dispatch(loadingData(pokemons));
  } catch (e) {
    dispatch(errorDispath());
  }
};
const initial = (dispatch) => {
  try {
    dispatch(loading());
  } catch (e) {
    dispatch(errorDispath());
  }
};

const listPokemonAction = {
  update,
  loaded,
  initial
};

export default listPokemonAction;
