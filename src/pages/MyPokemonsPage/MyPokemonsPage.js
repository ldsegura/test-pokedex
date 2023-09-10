import React, { useEffect, useState } from "react";
import { useDispatch, useGlobalState } from "../../store/StoreProvider";
import { useIntl } from "react-intl";
import pokedexAction from "../../actions/pokedexAction";
import pokemonAction from "../../actions/pokemonAction";
import listPokemonAction from "../../actions/listPokemonAction";
import SearchPokemonSection from "../../components/section/SearchPokemonSection";
import listPokemonBySearchAction from "../../actions/listPokemonBySearchAction";
import ListMyPokemonSection from "../../components/section/ListMyPokemonSection";

const MyPokemonsPage = () => {
  const { auth, pokedex, pokemons, pokemonsBySearch } = useGlobalState();
  const dispatch = useDispatch();
  const intl = useIntl();
  const [showPokemons, setShowPokemons] = useState(12);
  useEffect(() => {
    listPokemonAction.update({complete: false, data: [] }, dispatch);
    listPokemonBySearchAction.update({complete: false, data: [] }, dispatch);
    pokedexAction.update({complete: false, results: []}, dispatch);
  },[])
  useEffect(() => {
    //TODO modifica el pokedex con los pokemones de la sesion
    if (auth.complete) {
      console.log("debio modificar la chingadera")
      pokedexAction.loaded({}, dispatch);
      const auxData = auth.pokemons.map((item) => {
        return {
          ...item,
          name: item.id,
        };
      });
      console.log(auxData.length)
      setShowPokemons(auxData.length);
      pokedexAction.update({ results: auxData }, dispatch);
    }
  }, [auth]);

  useEffect(() => {
    if (pokedex.complete) {
      console.log(pokedex, "esta entrando y modificando por primera vez")
      morePokemons();
    }
  }, [pokedex]);

  const morePokemons = (eIndex = null) => {
    const startIndex = pokemons.data.length;
    const endIndex = eIndex ? eIndex : showPokemons;
    const auxPokemons = [...pokedex.results];
    const itemsPokemon = auxPokemons.slice(startIndex, endIndex);
    const promises = [];
    listPokemonAction.loaded(pokemons, dispatch);

    itemsPokemon.map((item, i) => {
      const nPromise = new Promise((resolve, reject) => {
        pokemonAction.get({ id: item.name }, (response) => {
          resolve(response);
        });
      });
      promises.push(nPromise);
    });
    Promise.all([...promises]).then((values) => {
      const items = { data: [...pokemons.data, ...values] };
      listPokemonAction.update(items, dispatch);
    });
  };

  const onMorePokemons = () => {
    //TODO aumenta la lista de pokemones por 12
    if (pokedex.complete) {
      if (showPokemons + 12 <= pokedex.results.length) {
        const next = showPokemons + 12;
        setShowPokemons(next);
        morePokemons(next);
      } else {
        const next = pokedex.results.length;
        setShowPokemons(next);
        morePokemons(next);
      }
    }
  };

  const onSelectAutocomplete = (value) => {
    console.log(value);
    listPokemonBySearchAction.loaded({}, dispatch);
    pokemonAction.get({ id: value }, (response) => {
      const items = { data: [response] };
      listPokemonBySearchAction.update(items, dispatch);
    });
  };

  const onChangeAutocomplete = () => {
    const items = { data: [] };
    listPokemonBySearchAction.update(items, dispatch);
  };

  return (
    <div className="container mb-4 bg-white rounded-3">
      <div>
        <h1 className="text-uppercase pt-4 text-center">
          {intl.formatMessage({ id: "website.myPokemonstitle" })}
        </h1>
      </div>
      {pokedex.complete && (
        <SearchPokemonSection
          items={pokedex.results}
          onSelect={onSelectAutocomplete}
          onChange={onChangeAutocomplete}
        />
      )}
      <div>
        <ListMyPokemonSection
          pokemons={
            pokemonsBySearch.data.length === 0
              ? pokemons.data
              : pokemonsBySearch.data
          }
          loading={
            pokedex.loading || pokemons.loading || pokemonsBySearch.loading
          }
          onMorePokemons={onMorePokemons}
          hasButton={
            pokemonsBySearch.data.length !== 0 ? false : pokedex.complete
          }
        />
      </div>
    </div>
  );
};

export default MyPokemonsPage;
