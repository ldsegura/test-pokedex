import { LazyLoadImage } from "react-lazy-load-image-component";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import { useIntl } from "react-intl";

const CardPokemon = (props) => {
  const { pokemon } = props;
  const intl = useIntl();

  return (
    <div className="card-pokemon mb-3">
      <div className="content-img">
        <LazyLoadImage
          alt={pokemon.name}
          src={pokemon.sprites.front_default}
          height={205}
          width={205}
        />
      </div>
      <p className="mb-0 pokemon-number">{`N. ${String(pokemon.id).padStart(
        4,
        "0"
      )}`}</p>
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
    </div>
  );
};

export default CardPokemon;
