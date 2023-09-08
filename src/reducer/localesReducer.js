import initialState from "./initialState"
import types from "../constants/reducers/localesConstants";

const localesReducer = (state = initialState.locales, action) => {
    switch(action.type) {
        case types.LOCALES_FETCHING:
            return action.locales
        case types.LOCALES:
            return action.locales;
        case types.LOCALES_ERROR:
            return initialState.locales
        default:
            return state;
    }
}
export default localesReducer;