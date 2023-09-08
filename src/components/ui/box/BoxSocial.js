import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import imageUtils from "../../../utils/imageUtils";

const BoxSocial = (props) => {
  const {items} = props;

  return ( items &&
    <div className="content-social">
      {items.map((item, i) => {
        return <a key={i} href={item.url} target={"_blank"} rel="noreferrer">
          <LazyLoadImage
            alt={item.socialNetwork}
            src={imageUtils.getIconSocialNetwork(item?.type?.toLowerCase())}
            height={20}
          />
        </a>
      })}
    </div>
  );
};

export default BoxSocial;
