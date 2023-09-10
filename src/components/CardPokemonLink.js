import { LazyLoadImage } from "react-lazy-load-image-component";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import { useIntl } from "react-intl";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import languageUtils from "../utils/languageUtils";
import { useGlobalState } from "../store/StoreProvider";
import AddPokemon from "./ui/AddPokemon";

const CardPokemonLink = (props) => {
  const { pokemon, caughtUp } = props;
  const {locale} = useGlobalState();
  const intl = useIntl();

  return (
    <div className="card-pokemon mb-3 bg-transparent border border-primary p-2 rounded-3">
      <Button className="content-img p-0 border-0 w-100" as={Link} to={`${languageUtils.linksLocale(locale)}pokemon/${pokemon.name}`}>
        <LazyLoadImage
          alt={pokemon.name}
          src={pokemon.sprites.front_default}
          height={205}
          width={205}
        />
      </Button>
      <p className="mb-0 pokemon-number">{`N. ${String(pokemon.id).padStart(4,"0")}${caughtUp ? `, Capturados: ${caughtUp}`: ''}`}</p>
      <Button variant="link" className="pokemon-name text-black text-uppercase bg-transparent border-0 fw-bold fs-5 pb-2 pt-0" as={Link} to={`${languageUtils.linksLocale(locale)}pokemon/${pokemon.name}`}>{pokemon.name}</Button>
      {pokemon.types && (
      <Stack direction="horizontal" gap={2} className="stack-list-pokemons">
        {pokemon.types.map((item,i) => {
          return (
              <Badge bg="primary text-uppercase" key={i}>{`${intl.formatMessage({ id: `pokemon.${item.type.name}` })}`}</Badge>    
          )
        })}
      </Stack>
      )}
      <AddPokemon pokemon={pokemon} />
    </div>
  );
};

export default CardPokemonLink;
