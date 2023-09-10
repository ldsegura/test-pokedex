import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useGlobalState } from "../../store/StoreProvider";
import { Link, useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { Button } from "react-bootstrap";
import PokedexCardHeader from "./components/PokedexCardHeader";
import PokedexTerminalFooter from "./components/PokedexTerminalFooter";
import PokedexTerminalHeader from "./components/PokedexTerminalHeader";
import localstorageConstants from "../../constants/localstorageConstants";
import authAction from "../../actions/authAction";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import pagesContants from "../../constants/pagesContants";
import languageUtils from "../../utils/languageUtils";
import _ from "lodash";

const HomePage = () => {
  const { auth, locale } = useGlobalState();
  const dispatch = useDispatch();
  const intl = useIntl();
  const navigate = useNavigate();
  const [positionScript, setPositionScript] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [pokemonId, setPokemonId] = useState("");
  const [formData, setFormData] = useReducer(
    (formData, newItem) => {
      return { ...formData, ...newItem };
    },
    { name: "", pokemons: [] }
  );

  useEffect(() => {
    //al iniciar si tiene nombre lo pasa al siguiente paso
    if (!_.isEmpty(auth.name) && auth.pokemons && auth.pokemons.length > 0 && positionScript === 0) {
      const location = {
        pathname: `${languageUtils.linksLocale(locale)}${pagesContants.dashboard}`,
      };
      navigate(location);
    } else if (!_.isEmpty(auth.name) && positionScript === 0) {
      setPositionScript(4);
    }
  }, [auth]);

  const onClickNext = () => {
    const finish = 6;
    if (positionScript + 1 <= finish) {
      setPositionScript(positionScript + 1);
    }
  };
  const onClickSkip = () => {
    const positionName = 3; //goto
    const positionPokemon = 6;
    if (positionScript < positionName) {
      setPositionScript(positionName);
    }
  };
  const onSelectPokemon = (pokemonID) => {
    setPokemonId(pokemonID);
    setErrorMessage("");
  };

  const renderScript = () => {
    let script = null;
    switch (positionScript) {
      case 1:
        script = (
          <p
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage({ id: "website.script2" }),
            }}
          />
        );
        break;
      case 2:
        script = (
          <p
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage({ id: "website.script3" }),
            }}
          />
        );
        break;
      case 3:
        //TODO render name script
        script = (
          <div>
            <p
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage({ id: "website.script4" }),
              }}
            />
            <input
              value={formData.name}
              onChange={(e) => {
                setErrorMessage("");
                setFormData({ name: e.target.value });
              }}
              onKeyUp={onKeyUpInputName}
              autoFocus
              type="text"
              className="style2-input form-control text-grey-900 font-xss ls-3"
              placeholder="_"
            />
            {errorMessage && <p className="text-danger mb-2">{errorMessage}</p>}
          </div>
        );
        break;
      case 4:
        script = (
          <div>
            <p
              dangerouslySetInnerHTML={{
                __html: intl
                  .formatMessage({ id: "website.script5" })
                  .replace("{XXX}", auth.name),
              }}
            />
            <div>
              <ButtonGroup aria-label="Basic example" style={{ width: "100%" }}>
                <Button
                  variant="secondary"
                  active={pokemonId === "squirtle"}
                  onClick={() => onSelectPokemon("squirtle")}
                >
                  Squirtle
                </Button>
                <Button
                  variant="secondary"
                  active={pokemonId === "charmander"}
                  onClick={() => onSelectPokemon("charmander")}
                >
                  charmander
                </Button>
                <Button
                  variant="secondary"
                  active={pokemonId === "bulbasaur"}
                  onClick={() => onSelectPokemon("bulbasaur")}
                >
                  bulbasaur
                </Button>
              </ButtonGroup>
            </div>
            {errorMessage && <p className="text-danger mb-2">{errorMessage}</p>}
          </div>
        );
        break;
      case 5:
        script = (
          <p
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage({ id: "website.script6" }),
            }}
          />
        );
        break;
      case 6:
        script = (
          <p
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage({ id: "website.script7" }),
            }}
          />
        );
        break;
      default:
        script = <p>{intl.formatMessage({ id: "website.script1" })}</p>;
    }

    return script;
  };
  const renderButtonAction = () => {
    return (
      <Button variant="link" onClick={onClickNext}>
        {intl.formatMessage({ id: "website.next" })}
      </Button>
    );
  };

  const renderButtonSkipAction = () => {
    return (
      <Button variant="link" onClick={onClickSkip}>
        {intl.formatMessage({ id: "website.skip" })}
      </Button>
    );
  };
  const renderButtonScript = () => {
    let script = null;
    switch (positionScript) {
      case 1:
      case 2:
        script = (
          <>
            {renderButtonAction()}
            {renderButtonSkipAction()}
          </>
        );
        break;
      case 3:
        //TODO render name script
        script = (
          <>
            <Button variant="link" type="submit" onClick={onSubmitbyName}>
              {intl.formatMessage({ id: "website.next" })}
            </Button>
          </>
        );
        break;
      case 4:
        script = (
          <>
            <Button variant="link" onClick={onSubmitbySelectPokemon}>
              {intl.formatMessage({ id: "website.next" })}
            </Button>
          </>
        );
        break;
      case 5:
        script = renderButtonAction();
        break;
      case 6:
        script = (
          <>
            <Button
              variant="link"
              onClick={onClickNext}
              as={Link}
              to={`${languageUtils.linksLocale(locale)}${
                pagesContants.dashboard
              }`}
            >
              {intl.formatMessage({ id: "website.finish" })}
            </Button>
          </>
        );
        break;
      default:
        script = (
          <>
            {renderButtonAction()}
            {renderButtonSkipAction()}
          </>
        );
    }

    return script;
  };
  const onKeyUpInputName = (event) => {
    if (event.key === "Enter") {
      if (_.isEmpty(formData.name) || formData.name.length <= 2) {
        setErrorMessage(intl.formatMessage({ id: "website.errorName" }));
      } else onSubmitbyName();
    }
  };
  const onSubmitbyName = () => {
    //TODO obtiene el nombre y lo agrega en memoria
    const session = { ...auth };
    session.name = formData.name;
    updateSession(session);
    onClickNext();
  };
  const onSubmitbySelectPokemon = () => {
    if (pokemonId === "") {
      setErrorMessage(intl.formatMessage({ id: "website.errorPokemon" }));
    } else {
      const session = { ...auth };
      const pokemon = {
        id: pokemonId,
        caughtUp: 1,
      };
      session.pokemons = [pokemon];
      updateSession(session);
      onClickNext();
    }
  };
  const updateSession = (request) => {
    window.localStorage.setItem(
      localstorageConstants.AUTH,
      JSON.stringify(request)
    );
    authAction.loaded(request, dispatch);
  };

  return (
    <>
      <div className="poked-card">
        <PokedexCardHeader />
        <div className="poked-card-body">
          <PokedexTerminalHeader />
          <div className="poked-card-console">
            {renderScript()}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {renderButtonScript()}
            </div>
          </div>
          <PokedexTerminalFooter />
        </div>
      </div>
    </>
  );
};

export default HomePage;
