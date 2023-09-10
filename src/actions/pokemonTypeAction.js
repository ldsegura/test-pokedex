const get = async (onSuccess, onError) => {
  try {
    //TODO for id or name
    await fetch(`${process.env.REACT_APP_API}/type`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((response) => {
        onSuccess && onSuccess(response);
      });
  } catch (e) {
    onError && onError({ message: e });
  }
};

const pokemonTypeAction = {
    get
};

export default pokemonTypeAction;
