import FaceIcon from "../assets/icons/facebook-white.svg";
import TwitterIcon from "../assets/icons/twitter.svg";
import InstaIcon from "../assets/icons/instagram-white.svg";
import LinkIcon from "../assets/icons/linkein-white.svg";
import YoutubeIcon from "../assets/icons/youtube-white.svg";
import TiktokIcon from "../assets/icons/tiktok.svg";

const getImageURLStrapi = (image) => {
    const url = image?.data?.attributes?.url ? `${process.env.REACT_APP_API}${image?.data?.attributes?.url}` : null;
    return url;
}

const getIconSocialNetwork = (type) => {
    let component = null;
    switch (type) {
      case "youtube":
        component = YoutubeIcon;
        break;
      case "instagram":
        component = InstaIcon;
        break;
      case "linkedin":
        component = LinkIcon;
        break;
      case "facebook":
        component = FaceIcon;
        break;
      case "twitter":
        component = TwitterIcon;
        break;
      case "tyktok":
      case "tiktok":
        component = TiktokIcon;
        break;
      default:
    }
    return component;
  }

const imageUtils = {
    getImageURLStrapi,
    getIconSocialNetwork
}

export default imageUtils;