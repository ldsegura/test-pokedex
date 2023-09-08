import React from "react";
import { useIntl } from "react-intl";
import SectionLoadingPage from "../components/section/SectionLoadingPage";

const NotFoundPage = () => {
    const intl = useIntl();

    return (
        <SectionLoadingPage 
            title={intl.formatMessage({ id: "website.notfound-page" })}
        />
     );
}

export default NotFoundPage;