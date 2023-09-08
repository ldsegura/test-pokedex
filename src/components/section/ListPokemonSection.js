import { Button } from "react-bootstrap";
import CardPokemon from "../CardPokemon";
import Stack from "react-bootstrap/Stack";
import { useIntl } from "react-intl";
import Loading from "../ui/Loading";
const ListPokemonSection = (props) => {
  const intl = useIntl();
  const { pokemons, loading, hasButton } = props;

  const onClickMorePokemons = () => {
    const { onMorePokemons } = props;

    onMorePokemons && onMorePokemons();
  };
  return (
    <div>
      <Stack direction="horizontal" gap={3} className="stack-list-pokemons">
        {pokemons.map((item, i) => {
          return <CardPokemon key={i} pokemon={item} />;
        })}
      </Stack>
      {loading && <Loading className="m-auto d-block" />}

      <div className="p-4">
        {(hasButton && !loading) && (
          <Button
            variant="info"
            size="lg"
            className="m-auto d-block"
            onClick={onClickMorePokemons}
          >
            {intl.formatMessage({ id: "button.morePokemons" })}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ListPokemonSection;
