type RegisterResponse = {
  verificationToken: string;
  message: string;
};
type RegisterData = {
  name: string;
  email: string;
  password: string;
};

type verificationResponse = {
  user: any;
};
type verificationData = {
  clientCode: string | number;
  verificationToken: string;
};

type loginResponse = {
  accessToken: string;
  user: any;
};
type loginData = {
  email: string;
  password: string;
};
type forgotPasswordResponse = {
  forgotToken: string;
  message: string;
};
type forgotPasswordData = {
  email: string;
  newPassword: string;
};

type confirmChangedPasswordResponse = {
  status: boolean;
};
type confirmChangedPasswordData = {
  clientCode: string | number;
  forgotToken: string;
};

type refreshResponse = {
  accessToken: string;
};
type refreshData = {};
