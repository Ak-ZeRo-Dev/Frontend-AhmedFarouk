type image = {
  public_id: string;
  url: string;
};

interface IUser {
  _id: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  role: string;
  gender: string;
  isVerified: boolean;
  isBlocked: boolean;
  blockCount: number;
  accessToken: string;
  avatar: image;
  love: string[];
  createdProducts: Array<{
    _id: string;
  }>;
}
