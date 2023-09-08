import { useIntl } from "react-intl";
import SectionLoadingPage from "../components/section/SectionLoadingPage";

const LoadingPage = () => {
    const intl = useIntl();
    return ( 
        <>
            <SectionLoadingPage title={intl.formatMessage({ id: "website.loading-page" })} disableLink />
        </>
     );
}
 
export default LoadingPage;