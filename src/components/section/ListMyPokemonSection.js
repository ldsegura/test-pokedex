import { Button } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import { useIntl } from "react-intl";
import Loading from "../ui/Loading";
import { useGlobalState } from "../../store/StoreProvider";
import CardPokemonLink from "../CardPokemonLink";
const ListMyPokemonSection = (props) => {
  const intl = useIntl();
  const {pokemons, loading, hasButton } = props;
  const {auth} = useGlobalState();
  const onClickMorePokemons = () => {
    const { onMorePokemons } = props;

    onMorePokemons && onMorePokemons();
  };

  return (
    <div>
      <Stack direction="horizontal" gap={3} className="stack-list-pokemons">
        {pokemons.map((item, i) => {
          const mypokemon = auth.pokemons.filter(itemAuth => itemAuth.id === item?.name)[0];
          return <CardPokemonLink key={i} pokemon={item} caughtUp={mypokemon?.caughtUp} />;
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

export default ListMyPokemonSection;
