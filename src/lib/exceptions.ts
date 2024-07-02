export class AuthRequired extends Error {
  constructor(message = "يجب تسجيل الدخول للوصول إلى هذه الصفحة.") {
    super(message);
    this.name = "AuthRequired";
  }
}
export class AdminRequired extends Error {
  constructor(message = "لا يمكنك الوصول لهذه الصفحة.") {
    super(message);
    this.name = "AdminRequired";
  }
}
