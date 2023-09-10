import types from "../constants/reducers/pokedexConstant";

const loading = () => {
  const pokedex = {
    loading: true,
  };
  return {
    type: types.POKEDEX_FETCHING,
    pokedex,
  };
};

const getDispatch = (pokedex) => {
  pokedex.complete = true;

  return { type: types.POKEDEX, pokedex };
};

const errorDispath = (pokedex) => {
  pokedex.error = true;
  return {
    type: types.POKEDEX_ERROR,
    pokedex,
  };
};

const get = async (_request, dispatch, onSuccess, onError) => {
  dispatch(loading());
  try {
    await fetch(`${process.env.REACT_APP_API}/pokemon?limit=100000&offset=0`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((response) => {
        dispatch(getDispatch(response));
        onSuccess && onSuccess(response);
      });
  } catch (e) {
    dispatch(errorDispath({ message: e }));
    onError && onError({ message: e });
  }
};

const update = async (pokedex, dispatch) => {
  dispatch(getDispatch(pokedex));
};
const loaded = (_pokemonsBySearch, dispatch) => {
  try {
    dispatch(loading());
  } catch (e) {
    dispatch(errorDispath());
  }
};

const pokedexAction = {
  get,
  loaded,
  update
};

export default pokedexAction;
