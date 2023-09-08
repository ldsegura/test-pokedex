import React from "react";
import { useMediaQuery } from "react-responsive";
import breakpointConstants from "../../../../constants/breakpointConstants";
import {useGlobalState} from "../../../../store/StoreProvider";
import languageUtils from "../../../../utils/languageUtils";
import { Link } from "react-router-dom";

const UlOther = (props) => {
  const { title, items } = props;
  const isMobile = useMediaQuery({ maxWidth: breakpointConstants.MD });
  const {locale} = useGlobalState();
  return (
    <div className="content-others">
      {title && (<h5>{title}</h5>)}
      <ul>
        {items &&
          items.map((item, i) => {
            return (
              <li key={i} style={{
                order: isMobile
                  ? item.orderMobile
                    ? item.orderMobile
                    : item.order
                  : item.order,
                display: "flex"
              }}>
                <Link to={`${languageUtils.linksLocale(locale)}${item.link}`}>
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default UlOther;