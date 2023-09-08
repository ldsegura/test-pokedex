import React, { useEffect } from "react";
import "./theme/boostrap-theme.scss";
import "./theme/main.scss";
import { Route, Routes, useLocation, Navigate  } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { IntlProvider } from "react-intl";
import { useGlobalState, useDispatch } from "./store/StoreProvider";
import languages from "./languages";
import languageUtils from "./utils/languageUtils";
import localeAction from "./actions/localeAction";
import pagesContants from "./constants/pagesContants";
import LoginPage from "./pages/LoginPage";
import useAuthVerification from "./hooks/useAuthVerification";
import { Layout, LayoutComponent } from "./pages/layouts";
import AccountPage from "./pages/AccountPage";
//import SettingsPage from "./pages/SettingsPage/SettingsPage";
import AuthLayout from "./pages/layouts/AuthLayout";

function App() {
  useAuthVerification();
  const { locale } = useGlobalState();
  const dispatch = useDispatch();
  const location = useLocation();

  //TODO set locale from pathname url
  useEffect(() => {
    let auxLocale = languageUtils.getLocale(location.pathname.toLowerCase());
    localeAction.updateLocale(auxLocale, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  //TODO paginas con login, storefront
  return (
    <>
      <IntlProvider locale={locale} messages={languages[locale]}>
        <Routes>
          {/* //TODO paginas en esp */}
          <Route path={"/"} element={<Layout component={HomePage} />} />
          <Route path={`/${pagesContants.dashboard}`} element={<AuthLayout component={LoginPage} />} />
          <Route path={`/pokemon/:id`} element={<LayoutComponent component={LoginPage} />} />
          <Route path={`/${pagesContants.search}`} element={<LayoutComponent component={LoginPage} />} />
          <Route path={`/${pagesContants.myPokemons}`} element={<LayoutComponent component={LoginPage} />} />
          <Route path={`/${pagesContants.settings}`} element={<LayoutComponent component={LoginPage} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </IntlProvider>
    </>
  );
}

export default App;