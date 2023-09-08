import {combineReducers} from "redux";
import locale from "./localeReducer";
import locales from "./localesReducer";
import auth from "./authReducer";

const rootReducer = combineReducers({
    locale,
    locales,
    auth
})

export default rootReducer;