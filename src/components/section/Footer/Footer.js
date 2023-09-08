import React, { useEffect, useState } from "react";
import { ContainerCustom } from "../../ui/Containers";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BoxSocial from "../../ui/box/BoxSocial";
import BoxDeveloper from "./components/BoxDeveloper";
import UlContact from "./components/UlContact";
import UlOther from "./components/UlOther";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../../store/StoreProvider";
import languageUtils from "../../../utils/languageUtils";
import footerSettings from "../../../settings/footerSettings";

const Footer = (props) => {
  const { locale } = useGlobalState();
  const [setting, setSettings] = useState({});

  useEffect(() => {
    setSettings(locale === languageUtils.defaultLocale ? footerSettings.es : footerSettings.en);
  },[locale])

  return (
    <footer className="footer">
      <ContainerCustom>
        <div className="boxs">
          <BoxDeveloper />
          <BoxSocial items={setting.socialNetwork} />
        </div>
      </ContainerCustom>
    </footer>
  );
};

export default Footer;
