import { Document } from "mongoose";

interface IFAQ {
  question: string;
  answer: string;
}

interface ICategory {
  title: string;
}
interface ISocial {
  type: string;
  url?: string;
}
interface IImage {
  _id: string;
  public_id: string;
  url: string;
}
interface IContact {
  name: string;
  phoneNumber: string;
  email: string;
  message: string;
}
interface IInfo {
  address: string;
  phoneNumbers: string[];
  workHours: {
    from: string;
    to: string;
  };
}
interface IAbout {
  address: {
    lat: number;
    lng: number;
  };
  images: IImage[];
  messages: {
    definition: string;
    mission: string;
    address: string;
  };
}
interface ILogo {
  text: string;
  image: IImage;
}

interface ILayout {
  _id: string;
  type: string;
  faq: IFAQ[];
  categories: ICategory[];
  social: ISocial[];
  info: IInfo;
  about: IAbout;
  logo: ILogo;
  login: IImage;
  register: IImage;
  verification: IImage;
  contactUs: IImage;
  userBackground: IImage;
}
