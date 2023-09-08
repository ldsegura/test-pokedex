//import logo from "../assets/logo.PNG"
import pagesContants from "../constants/pagesContants";

const es = {
  id: 1,
  alt: "Pokedex",
  logo: require("../assets/logo.PNG"),
  socialNetwork: [
    {
      id: 39,
      socialNetwork: "Facebook",
      title: "Facebook",
      description: "Facebook",
      url: "https://www.facebook.com/suan.segura",
      type: "facebook",
      image: {
        data: null,
      },
    },
    {
      id: 56,
      socialNetwork: "Instagram",
      title: "instagram",
      description: "instagram",
      url: "https://www.instagram.com/shirorino/",
      type: "instagram",
      image: {
        data: null,
      },
    },
    {
      id: 57,
      socialNetwork: "LinkedIn",
      title: "linkedin",
      description: "linkedin",
      url: "https://www.linkedin.com/in/leonidas-segura",
      type: "linkedin",
      image: {
        data: null,
      },
    },
    {
      id: 58,
      socialNetwork: "Youtube",
      title: "youtube",
      description: "youtube",
      url: "https://www.youtube.com/channel/UCVCzXp6_dk7VjcdwrRNEpoQ",
      type: "youtube",
      image: {
        data: null,
      },
    },
  ],
  AboutUs: [
    {
      id: 1,
      order: 1,
      title: "Quienes somos",
      link: pagesContants.aboutUSES,
      orderMobile: 1,
    },
    {
      id: 2,
      order: 4,
      title: "Mesa directiva",
      link: pagesContants.mesaDirectivaES,
      orderMobile: 2,
    },
    {
      id: 3,
      order: 7,
      title: "Amarte en México",
      link: pagesContants.amarteMexicoES,
      orderMobile: 3,
    },
    {
      id: 4,
      order: 9,
      title: "Aviso  de Privacidad",
      link: pagesContants.avisoPrivacidadES,
      orderMobile: 4,
    },
    {
      id: 5,
      order: 8,
      title: "Afiliate",
      link: pagesContants.afiliateES,
      orderMobile: 5,
    },
    {
      id: 6,
      order: 6,
      title: "Términos y Condiciones",
      link: pagesContants.terminosCondicionesES,
      orderMobile: 6,
    },
    {
      id: 7,
      order: 2,
      title: "Contacto",
      link: pagesContants.contactoES,
      orderMobile: 7,
    },
    {
      id: 7,
      order: 3,
      title: "Directorio de profesionales",
      link: pagesContants.directoriosES,
      orderMobile: 7,
    },
    {
      id: 7,
      order: 5,
      title: "Educación",
      link: pagesContants.educationES,
      orderMobile: 7,
    },
  ],
};
const en = {
  id: 1,
  alt: "Pokedex",
  logo: require("../assets/logo.PNG"),
  socialNetwork: [
    {
      id: 39,
      socialNetwork: "Facebook",
      title: "Facebook",
      description: "Facebook",
      url: "https://www.facebook.com/suan.segura",
      type: "facebook",
      image: {
        data: null,
      },
    },
    {
      id: 56,
      socialNetwork: "Instagram",
      title: "instagram",
      description: "instagram",
      url: "https://www.instagram.com/shirorino/",
      type: "instagram",
      image: {
        data: null,
      },
    },
    {
      id: 57,
      socialNetwork: "LinkedIn",
      title: "linkedin",
      description: "linkedin",
      url: "https://www.linkedin.com/in/leonidas-segura",
      type: "linkedin",
      image: {
        data: null,
      },
    },
    {
      id: 58,
      socialNetwork: "Youtube",
      title: "youtube",
      description: "youtube",
      url: "https://www.youtube.com/channel/UCVCzXp6_dk7VjcdwrRNEpoQ",
      type: "youtube",
      image: {
        data: null,
      },
    },
  ],
  AboutUs: [
    {
      id: 1,
      order: 1,
      title: "Quienes somos",
      link: "nosotros",
      orderMobile: 1,
    },
    {
      id: 2,
      order: 4,
      title: "Mesa directiva",
      link: "blog",
      orderMobile: 2,
    },
    {
      id: 3,
      order: 7,
      title: "Amarte en México",
      link: "proyectos",
      orderMobile: 3,
    },
    {
      id: 4,
      order: 9,
      title: "Aviso  de Privacidad",
      link: "aviso-de-privadidad",
      orderMobile: 4,
    },
    {
      id: 5,
      order: 8,
      title: "Afiliate",
      link: "prensa",
      orderMobile: 5,
    },
    {
      id: 6,
      order: 6,
      title: "Términos y Condiciones",
      link: "termino-y-condiciones",
      orderMobile: 6,
    },
    {
      id: 7,
      order: 2,
      title: "Contacto",
      link: "contacto",
      orderMobile: 7,
    },
    {
      id: 7,
      order: 3,
      title: "Directorio de profesionales",
      link: "contacto",
      orderMobile: 7,
    },
    {
      id: 7,
      order: 5,
      title: "Educación",
      link: "contacto",
      orderMobile: 7,
    },
  ],
};

const footerSettings = {
  es,
  en,
};

export default footerSettings;
