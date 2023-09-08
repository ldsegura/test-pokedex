import initialState from "./initialState"
import types from "../constants/reducers/localeConstants";

const localeReducer = (state = initialState.locale, action) => {
    switch(action.type) {
        case types.LOCALE_FETCHING:
            return action.locale
        case types.LOCALE:
            return action.locale;
        case types.LOCALE_ERROR:
            return initialState.locale
        default:
            return state;
    }
}
export default localeReducer;