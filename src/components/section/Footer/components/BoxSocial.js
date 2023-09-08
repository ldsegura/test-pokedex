import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import FaceIcon from "../../../../assets/icons/facebook-white.svg";
import InstaIcon from "../../../../assets/icons/instagram-white.svg";
import LinkIcon from "../../../../assets/icons/linkein-white.svg";
import YoutubeIcon from "../../../../assets/icons/youtube-white.svg";

const BoxSocial = () => {
  return (
    <div className="content-social">
      <a href="https://www.facebook.com/grupoPokedex" target={"_blank"} rel="noreferrer">
        <LazyLoadImage
          alt={"Facebook Grupo Pokedex"}
          src={FaceIcon}
          height={20}
        />
      </a>
      <a href="https://www.instagram.com/grupoPokedex" target={"_blank"} rel="noreferrer">
        <LazyLoadImage
          alt={"Instagram Grupo Pokedex"}
          src={InstaIcon}
          height={20}
        />
      </a>
      <a href="https://www.linkedin.com/company/grupo-Pokedex" target={"_blank"} rel="noreferrer">
        <LazyLoadImage
          alt={"Linkedin Grupo Pokedex"}
          src={LinkIcon}
          height={20}
        />
      </a>
      <a href="https://www.youtube.com/@grupoPokedex" target={"_blank"} rel="noreferrer">
        <LazyLoadImage
          alt={"YouTube Grupo Pokedex"}
          src={YoutubeIcon}
          height={20}
        />
      </a>
    </div>
  );
};

export default BoxSocial;
