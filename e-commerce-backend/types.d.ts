export interface User {
  userName: string;
  firstName: string;
  secondName: string;
  emailAddr: string;
  age: string;
  phone: string;
  idNo: string;
  password: string;
  gender: string;
}
export interface UserRequest {
  userName: string;
  firstName: string;
  secondName: string;
  emailAddr: string;
  age: string;
  phone: string;
  idNo: string;
  password: string;
  gender: string;
  confirmPassword: string;
}

export interface ResponseData {
    accessToken: string;
    userId: string;
    userName: string;
}

export interface JwtSignCredentials {
    userId: string;
    userName: string;
}

