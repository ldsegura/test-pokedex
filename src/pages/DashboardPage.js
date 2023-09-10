import { useIntl } from "react-intl";
import { useDispatch, useGlobalState } from "../store/StoreProvider";
import { Card } from "react-bootstrap";
import ProgressCircle from "../components/ProgressCircle";
import listPokemonAction from "../actions/listPokemonAction";
import pokemonAction from "../actions/pokemonAction";
import { useEffect, useState } from "react";
import pokemonTypeAction from "../actions/pokemonTypeAction";
import ProgressTotalPokemonCircle from "../components/ProgressTotalPokemonCircle";
import pokedexAction from "../actions/pokedexAction";

const DashboardPage = () => {
  const { auth, pokemons, pokedex } = useGlobalState();
  const [pokemonType, setPokemonType] = useState([]);
  const dispatch = useDispatch();
  const intl = useIntl();

  useEffect(() => {
    pokemonTypeAction.get((response) => {
      const aux = response.results.map((item) => {
        switch (item.name) {
          case "normal":
            item.color = "#a4acaf";
            break;
          case "fighting":
            item.color = "#d56723";
            break;
          case "flying":
            item.color = "#3dc7ef";
            break;
          case "poison":
            item.color = "#b97fc9";
            break;
          case "ground":
            item.color = "#f7de3f";
            break;
          case "rock":
            item.color = "#a38c21";
            break;
          case "bug":
            item.color = "#729f3f";
            break;
          case "ghost":
            item.color = "#7b62a3";
            break;
          case "steel":
            item.color = "#9eb7b8";
            break;
          case "fire":
            item.color = "#fd7d24";
            break;
          case "water":
            item.color = "#4592c4";
            break;
          case "grass":
            item.color = "#9bcc50";
            break;
          case "electric":
            item.color = "#eed535";
            break;
          case "psychic":
            item.color = "#f366b9";
            break;
          case "ice":
            item.color = "#51c4e7";
            break;
          case "dragon":
            item.color = "#53a4cf";
            break;
          case "dark":
            item.color = "#707070";
            break;
          case "fairy":
            item.color = "#fdb9e9";
            break;
          case "shadow":
            item.color = "#707070";
            break;
          case "unknown":
          default:
            item.color = "#a4acaf";
        }
        return {
          ...item,
        };
      });
      setPokemonType(aux);
    });
    pokedexAction.get({}, dispatch);
  }, []);
  useEffect(() => {
    if (auth.complete) {
      morePokemons();
    }
  }, [auth]);

  const morePokemons = () => {
    const auxPokemons = [...auth.pokemons];
    const itemsPokemon = auxPokemons.map((item) => {
      return {
        ...item,
        name: item.id,
      };
    });
    const promises = [];
    listPokemonAction.initial(dispatch);

    itemsPokemon.map((item, i) => {
      const nPromise = new Promise((resolve, reject) => {
        pokemonAction.get({ id: item.name }, (response) => {
          resolve({
            ...response,
            caughtUp: item.caughtUp,
          });
        });
      });
      promises.push(nPromise);
    });
    Promise.all([...promises]).then((values) => {
      const items = { data: [...values] };
      listPokemonAction.update(items, dispatch);
    });
  };

  return (
    <div className="container mb-4 bg-white rounded-3 dashboard-page">
      <div>
        <h1 className="text-uppercase pt-4 text-center">
          {intl.formatMessage({ id: "website.dashboardtitle" })}
        </h1>
        <p className="fw-bold text-center">{`${intl.formatMessage({
          id: "website.dashboardsubTitle",
        })}, ${auth.name}`}</p>
        {pokemons.complete && (
          <div className="body-dashboard">
            <ProgressCircle pokemons={pokemons} pokemonsType={pokemonType} />
            <ProgressTotalPokemonCircle pokemons={pokemons} pokemonsType={pokemonType} pokedex={pokedex} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
