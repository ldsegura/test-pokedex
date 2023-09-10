import React, { useEffect, useState } from "react";
import { useDispatch, useGlobalState } from "../../store/StoreProvider";
import ListPokemonSection from "../../components/section/ListPokemonSection";
import { useIntl } from "react-intl";
import pokedexAction from "../../actions/pokedexAction";
import pokemonAction from "../../actions/pokemonAction";
import listPokemonAction from "../../actions/listPokemonAction";
import SearchPokemonSection from "../../components/section/SearchPokemonSection";
import listPokemonBySearchAction from "../../actions/listPokemonBySearchAction";
import { useParams } from "react-router-dom";
import { Button, Stack } from "react-bootstrap";
import CardPokemon from "../../components/CardPokemon";
import localstorageConstants from "../../constants/localstorageConstants";
import authAction from "../../actions/authAction";
import { useMediaQuery } from "react-responsive";
import breakpointConstants from "../../constants/breakpointConstants";

const PokemonPage = () => {
  const { auth } = useGlobalState();
  const dispatch = useDispatch();
  const intl = useIntl();
  const isMobile = useMediaQuery({ maxWidth: breakpointConstants.MD });
  const { id: idPokemon } = useParams();
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    pokedexAction.get({}, dispatch);
    pokemonAction.get(
      { id: idPokemon },
      (response) => {
        setPokemon(response);
      },
      (error) => {
        console.error("sin pokemon");
      }
    );
  }, []);

  const mypokemon = auth.pokemons.filter(
    (item) => item.id === pokemon?.name
  )[0];

  const onAddPokemon = () => {
    const index = auth.pokemons.findIndex((item) => item.id === pokemon?.name);
    const aux = [...auth.pokemons];
    if (index >= 0) {
      aux[index].caughtUp = aux[index].caughtUp + 1;
    } else {
      aux.push({
        id: pokemon?.name,
        caughtUp: 1,
      });
    }
    const session = { ...auth };
    session.pokemons = aux;
    updateSession(session);
  };

  const onRemovePokemon = () => {
    const index = auth.pokemons.findIndex((item) => item.id === pokemon?.name);
    if (index >= 0) {
      const aux = [...auth.pokemons];

      let auxPokemons = null;
      if(aux[index].caughtUp - 1 <= 0) {
        auxPokemons = aux.filter(item => item.id !== pokemon?.name);
      }
      else {
        aux[index].caughtUp = aux[index].caughtUp - 1;
        auxPokemons = aux;
      }

      const session = { ...auth };
      session.pokemons = auxPokemons;
      updateSession(session);
    }
  };

  const updateSession = (request) => {
    window.localStorage.setItem(
      localstorageConstants.AUTH,
      JSON.stringify(request)
    );
    authAction.loaded(request, dispatch);
  };
  console.log(auth)
  const indexAuthPokemon = auth?.pokemons?.findIndex(
    (item) => item.id === pokemon?.name
  );
  return (
    <div className="container mb-4 bg-white rounded-3 d-flex" style={{flexDirection: "column"}}>
      <div>
        <h1 className="text-uppercase pt-4 text-center mb-4">
          {`${intl.formatMessage({ id: "website.pokemonTitle" })}${
            pokemon.name
              ? ` - ${pokemon.name}`
              : ` - ${intl.formatMessage({ id: "website.undefined" })}`
          }`}
        </h1>
      </div>
      <div style={{display: "flex", flexGrow: 1, alignItems: "center", justifyContent: "center"}}>
        {pokemon?.id && (
          <Stack direction="horizontal" gap={3} className="stack-list-pokemons">
            <CardPokemon pokemon={pokemon} caughtUp={mypokemon?.caughtUp} />
            <div className={`${isMobile ? "w-100": ''}`}>
              <Stack
                direction="horizontal"
                gap={2}
                className={`stack-list-pokemons pt-3 w-100 ${isMobile ? "mb-4": ''}`}
              >
                <Button variant="secondary" onClick={onAddPokemon} className={`${isMobile ? "w-100": ''}`}>
                  {intl.formatMessage({ id: "website.addPokemon" })}
                </Button>
                {indexAuthPokemon >= 0 && (
                  <Button onClick={onRemovePokemon} className={`text-white ${isMobile ? "w-100": ''}`}>
                    {intl.formatMessage({ id: "website.removePokemon" })}
                  </Button>
                )}
              </Stack>
            </div>
          </Stack>
        )}
        {typeof pokemon.id !== "number" && (
          <h2 className="text-center">{intl.formatMessage({ id: "website.pokemonUndefined" })}</h2>
        )}
      </div>
    </div>
  );
};

export default PokemonPage;
