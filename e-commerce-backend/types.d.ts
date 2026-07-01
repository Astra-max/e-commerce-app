export interface User {
  userId: string;
  userName: string;
  firstName: string;
  secondName: string;
  emailAddr: string;
  age: string;
  phone: string;
  idNo?: string;
  password: string;
  gender: string;
  confirm: string;
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

export interface ValidationError {
    isError: boolean;
    message: string;
    statusCode: number;
    data?: responseData;
}

export interface responseData {
    token: string;
    userId: string;
    userName: string;
}