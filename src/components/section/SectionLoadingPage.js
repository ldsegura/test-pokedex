import React from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../store/StoreProvider";
import languageUtils from "../../utils/languageUtils";
import { useIntl } from "react-intl";

const SectionLoadingPage = (props) => {
    const { title, disableLink } = props;
    const { locale } = useGlobalState();
    const intl = useIntl();

    return (<div className="not-found-container">
            <div className="row justify-content-center" >
                <div className="col-lg-6 col-md-8 text-center default-page vh-100 align-items-center d-flex bg-white" >
                    <div className="card border-0 text-center d-block p-0 bg-transparent m-auto">
                        <h1>POKEDEX LEO</h1>
                        <p className="text-grey-500 font-xsss">{title}</p>
                        {!disableLink && (
                            <Link
                                to={`${languageUtils.linksLocale(locale)}`}
                                className="p-3 w175 bg-current d-inline-block text-center fw-600 font-xssss rounded-3 text-uppercase ls-3">
                                {intl.formatMessage({ id: "website.go-home" })}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
    </div>);
}
SectionLoadingPage.defaultProps = {
    title: "Ups! we have a problem"
}
export default SectionLoadingPage;