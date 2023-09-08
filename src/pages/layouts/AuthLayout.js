import { useEffect } from "react";
import { Header, Footer } from "../../components/section";
import { useGlobalState } from "../../store/StoreProvider";
import { useNavigate } from "react-router-dom";
import languageUtils from "../../utils/languageUtils";
import useAuthVerification from "../../hooks/useAuthVerification";
import LoadingPage from "../LoadingPage";

const AuthLayout = (props) => {
  const { component: ChildrenPage } = props;
  const auth = useAuthVerification();
  const { locale } = useGlobalState();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.loading === -1) {
      const location = {
        pathname: `${languageUtils.linksLocale(locale)}`,
      };
      navigate(location);
    }
  }, [auth, locale, navigate]);

  return (
    <>
      {auth.loading === 1 && <LoadingPage />}
      {auth.loading === 0 && auth.login && (
        <>
          <Header />
          <div>
            <ChildrenPage />
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default AuthLayout;
