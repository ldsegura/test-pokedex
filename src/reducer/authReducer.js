import initialState from "./initialState";
import types from "../constants/reducers/authConstant";

const authReducer = (state = initialState.auth, action) => {
    switch(action.type) {
        case types.AUTH:
            return {...initialState.auth, ...action.auth};
        case types.AUTH_FETCHING:
            return {...initialState.auth, ...action.auth};
        case types.AUTH_ERROR:
            return {...initialState.auth, ...action.auth};
        default:
            return state;
    }
}
export default authReducer;