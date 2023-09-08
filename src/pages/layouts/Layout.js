import { useNavigate } from "react-router-dom";
import { Header, Footer } from "../../components/section";
import useAuthVerification from "../../hooks/useAuthVerification";
import languageUtils from "../../utils/languageUtils";
import { useEffect } from "react";

const Layout = (props) => {
  const { component: ChildrenPage } = props;
  const auth = useAuthVerification();
  const navigate = useNavigate();

  useEffect(() => {
    //TODO is -1 not login
    // if (auth.loading === -1) {
    //   const location = {
    //     pathname: `${languageUtils.linksLocale(locale)}`,
    //   };
    //   navigate(location);
    // }
  }, [auth, navigate]);

  return (
    <>
      <div className="pokedex">
        <ChildrenPage />
        <div className="pokedex-footer-background">
          <div className="pokedex-footer-background" />
        </div>
      </div>
    </>
  );
};

export default Layout;
