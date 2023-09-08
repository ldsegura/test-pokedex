import languageConstants from "../constants/languageConstats";
const defaultLocale = languageConstants.ES;
const getLanguagueToPath = (path) => {
    let locale = defaultLocale;

    const pathSplit = path.split('/');
    const language = languageConstants;
    if (pathSplit.length > 0) {
        switch (pathSplit[1]) {
            case language.ES:
                locale = language.ES;
                break;
            case language.EN:
                locale = language.EN;
                break;
            default:
                locale = defaultLocale;
        }
    }

    return locale;
}

const getLocale = (pathLocale) => {
    pathLocale = pathLocale.toLowerCase();

    const auxLocale = getLanguagueToPath(pathLocale);

    return auxLocale;
}

const getPathForRouteLinkLocale = (locale, slug) => {
    const newLink = `${locale === defaultLocale
        ? ''
        : `/${locale}`}${slug === "/"
            || slug.toLowerCase() === "home"
            || slug.toLowerCase() === "inicio"
            ? locale === defaultLocale ? '/' : ''
            : `/${slug}`}`;

    return newLink;
}

const linksLocale = (locale) => {
    return `/${locale === defaultLocale
        ? ''
        : `${locale}/`}`;
}

const languageUtils = {
    getLanguagueToPath,
    getLocale,
    defaultLocale,
    linksLocale,
    getPathForRouteLinkLocale
}

export default languageUtils;