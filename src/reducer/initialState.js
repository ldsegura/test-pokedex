// eslint-disable-next-line import/no-anonymous-default-export
export default {
  locale: "es",
  locales: [
    {
      name: "ESP",
      value: "es",
    },
    {
      name: "ENG",
      value: "en",
    },
  ],
  auth: {
    loading: false,
    complete: false,
    error: false,
    pokemons: []
  },
  pokedex: {
    loading: false,
    complete: false,
    error: false,
    results: []
  },
  pokemons: {
    data: [],
    loading: false,
    complete: false,
    error: false,
  },
  pokemonsBySearch: {
    data: [],
    loading: false,
    complete: false,
    error: false,
  }
};
