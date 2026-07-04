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

export interface Item {
  productid: number;
  name: string;
  category: string;
  description: string;
  quantity: string;
  status: string;
  amount: number;
  userId: string;
  image: string;
}

export interface ServiceResponse<T> {
    isError: boolean;
    message: string;
    statusCode: number;
    data?: T;
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