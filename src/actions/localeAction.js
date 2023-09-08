import types from "../constants/reducers/localeConstants";
const get = (locale) =>{
    return {type: types.LOCALE, locale};
 };

const updateLocale = async (locale, dispatch) => {
    dispatch(get(locale));
}

const localeAction = {
    updateLocale
}

export default localeAction;