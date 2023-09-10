import { LazyLoadImage } from "react-lazy-load-image-component";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import { useIntl } from "react-intl";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import languageUtils from "../utils/languageUtils";
import { useGlobalState } from "../store/StoreProvider";

const CardPokemonLink = (props) => {
  const { pokemon, caughtUp } = props;
  const {locale} = useGlobalState();
  const intl = useIntl();

  return (
    <Button className="card-pokemon mb-3 bg-transparent" as={Link} to={`${languageUtils.linksLocale(locale)}pokemon/${pokemon.name}`}>
      <div className="content-img">
        <LazyLoadImage
          alt={pokemon.name}
          src={pokemon.sprites.front_default}
          height={205}
          width={205}
        />
      </div>
      <p className="mb-0 pokemon-number">{`N. ${String(pokemon.id).padStart(4,"0")}${caughtUp ? `, Capturados: ${caughtUp}`: ''}`}</p>
      <h5 className="pokemon-name text-uppercase">{pokemon.name}</h5>
      {pokemon.types && (
      <Stack direction="horizontal" gap={2} className="stack-list-pokemons">
        {pokemon.types.map((item,i) => {
          return (
              <Badge bg="primary text-uppercase" key={i}>{`${intl.formatMessage({ id: `pokemon.${item.type.name}` })}`}</Badge>    
          )
        })}
      </Stack>
      )}
    </Button>
  );
};

export default CardPokemonLink;
