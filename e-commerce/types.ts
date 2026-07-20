export type User = {
  userName: string;
  firstName: string;
  secondName: string;
  phone: string;
  idNo: string;
  emailAddr: string;
  password: string;
  confirm: string;
  age: number;
  gender: string;
};

export type Logins = {
  emailAddr: string;
  password: string;
};

export interface Products {
  productid: string;
  name: string;
  amount: number;
  image: string;
  quantity: number;
  description: string;
  category: string;
}

export interface Item extends Products {
  status: string;
  userId: string;
}

export interface State {
  cart: Item[];
  total: number;
  loading: boolean;
  error: string | null;
}

export interface ProductState {
  items: Products[];
  loading: boolean;
  error: string | null;
}

export interface Error {
  data: {
    message: string;
  };
};

export const BASE_URL = "http://localhost:5500/api/v1";
