import types from "../constants/reducers/authConstant";

const loading = () => {
  const auth = {
    loading: true,
  };
  return {
    type: types.AUTH_FETCHING,
    auth,
  };
};

const getDispatch = (auth) => {
  auth.complete = true;

  return { type: types.AUTH, auth };
};

const errorDispath = (auth) => {
  auth.error = true;
  return {
    type: types.AUTH_ERROR,
    auth,
  };
};
const initialDispatch = () => {
  const auth = {};

  return { type: types.AUTH, auth };
};
const logout = async (dispatch) => {
  try {
    dispatch(initialDispatch());
  } catch (e) {
    dispatch(errorDispath());
  }
};
const update = async (auth, dispatch) => {
  dispatch(getDispatch(auth));
};
const loaded = (auth, dispatch) => {
  try {
    dispatch(getDispatch(auth));
  } catch (e) {
    dispatch(errorDispath());
  }
};
const get = async (request, dispatch, onSuccess, onError) => {
  dispatch(loading());
  try {
    await fetch(`${process.env.REACT_APP_API}/api/auth/local`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    })
      .then((res) => res.json())
      .then((response) => {
        const auxAuth = {
          jwt: response.jwt,
          ...response.user,
        };

        if (response.error || response.user?.blocked) {
          dispatch(errorDispath({ message: "Invalid identifier or password" }));
          onError && onError({ message: "Invalid identifier or password" });
        } else {
          dispatch(getDispatch(auxAuth));
          onSuccess && onSuccess(auxAuth);
        }
      });
  } catch (e) {
    dispatch(errorDispath({ message: e }));
    onError && onError({ message: e });
  }
};

const authAction = {
  update,
  get,
  loaded,
  logout,
};

export default authAction;
