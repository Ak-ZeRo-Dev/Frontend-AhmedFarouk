import { Document } from "mongoose";

interface IReply {
  userId?: string;
  email?: string;
  comment: string;
}

interface IReview {
  userId?: string;
  email?: string;
  rating: number;
  comment: string;
  commentReplies: IReply[];
}

interface IImage {
  _id: string;
  public_id: string;
  url: string;
}
interface IVideo {
  url: string;
}

interface IProduct {
  _id: string;
  createdBy: { _id: string };
  title: string;
  description: string;
  price: number;
  estimatedPrice?: number;
  categories: string[];
  keywords: string[];
  colors: string[];
  rating: {
    rate: number;
    count: number;
  };
  loveCount: number;
  review: IReview[];
  images: IImage[];
  video: IVideo[];
}
