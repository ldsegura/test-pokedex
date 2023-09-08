import React, { useEffect, useState } from "react";
import { useDispatch, useGlobalState } from "../../store/StoreProvider";
import { Button } from "react-bootstrap";
import ListPokemonSection from "../../components/section/ListPokemonSection";
import { useIntl } from "react-intl";
import pokedexAction from "../../actions/pokedexAction";
import pokemonAction from "../../actions/pokemonAction";
import listPokemonAction from "../../actions/listPokemonAction";

const SearchPage = () => {
  const { auth, pokedex, pokemons } = useGlobalState();
  const dispatch = useDispatch();
  const intl = useIntl();
  const [showPokemons, setShowPokemons] = useState(12);

  //const pokemons = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  console.log(pokemons);

  useEffect(() => {
    pokedexAction.get({}, dispatch);
  }, []);

  useEffect(() => {
    if (pokedex.complete) {
      morePokemons();
    }
  }, [pokedex]);

  const morePokemons = (eIndex = null) => {
    const startIndex = pokemons.data.length;
    const endIndex = eIndex ? eIndex : showPokemons;
    const auxPokemons = [...pokedex.results];
    const itemsPokemon = auxPokemons.slice(startIndex, endIndex);
    const promises = [];
    console.log("manda a loading")
    console.log(pokemons)
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
      console.log(values, "nuevo llamado");
      const items = { data: [...pokemons.data, ...values] };
      listPokemonAction.update(items, dispatch);
    });
  };

  const onMorePokemons = () => {
    //TODO aumenta la lista de pokemones por 12
    if (pokedex.complete) {
      if (showPokemons + 12 <= pokedex.results.length){
        const next = showPokemons + 12;
        setShowPokemons(next);
        morePokemons(next);
      }
      else {
        const next = pokedex.results.length;
        setShowPokemons(next);
        morePokemons(next);
      }
    }
  };
  return (
    <div className="container mb-4 bg-white rounded-3">
      <div>
        <h1 className="text-uppercase pt-4">
          {intl.formatMessage({ id: "website.title" })}
        </h1>
      </div>
      <div>busqueda</div>
      <div>
        <div>posible filtrado</div>
        <ListPokemonSection
          pokemons={pokemons.data}
          loading={pokedex.loading || pokemons.loading}
          onMorePokemons={onMorePokemons}
          hasButton={pokedex.complete}
        />
      </div>
    </div>
  );
};

export default SearchPage;
