import { Button, Form } from "react-bootstrap";
import { useDispatch, useGlobalState } from "../../store/StoreProvider";
import { useEffect, useState } from "react";
import localstorageConstants from "../../constants/localstorageConstants";
import authAction from "../../actions/authAction";
import _ from "lodash";

const AddPokemon = (props) => {
  const { pokemon } = props;
  const { auth } = useGlobalState();
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.complete) {
      const index = auth.pokemons.findIndex((item) => item.id === pokemon.name);
      if (index >= 0) {
        setCount(auth.pokemons[index].caughtUp);
      } else setCount(0);
    }
  }, [auth, pokemon]);

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
      if (aux[index].caughtUp - 1 <= 0) {
        auxPokemons = aux.filter((item) => item.id !== pokemon?.name);
      } else {
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
  const obSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!_.isEmpty(count)) {
      const index = auth.pokemons.findIndex(
        (item) => item.id === pokemon?.name
      );
      const aux = [...auth.pokemons];
      let auxPokemons = null;
      if (index >= 0) {
        if (count <= 0) {
          auxPokemons = aux.filter((item) => item.id !== pokemon?.name);
        } else {
          aux[index].caughtUp = count;
          auxPokemons = aux;
        }
      } else {
        auxPokemons = aux;
        auxPokemons.push({
          id: pokemon?.name,
          caughtUp: count,
        });
      }
      const session = { ...auth };
      session.pokemons = auxPokemons;
      updateSession(session);
    }
  };
  return (
    <Form onSubmit={obSubmit} className="pokemon-set">
      <Form.Label>Agregar pokemon</Form.Label>
      <div className="form-body">
        <Button onClick={onRemovePokemon} className="text-white">
          -
        </Button>
        <input
          value={count}
          onChange={(e) => {
            setCount(e.target.value);
          }}
          onKeyDown={(event) => {
            if (
              !/[0-9]/.test(event.key) &&
              event.key !== "Backspace" &&
              event.key !== "ArrowLeft" &&
              event.key !== "ArrowRight" &&
              event.key !== "Delete" &&
              event.key !== "Enter"
            ) {
              event.preventDefault();
              event.stopPropagation();
            }
          }}
        />
        <Button onClick={onAddPokemon} variant="secondary">
          +
        </Button>
      </div>
    </Form>
  );
};

export default AddPokemon;
