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
  productid: number;
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

export const Items: Products[] = [
  {
    productid: 1,
    name: "French Trouser",
    amount: 500.0,
    image: "/trouser.jpg",
    quantity: 1,
    description: "Best Outfit for summer holidays",
    category: "Men's outfit",
  },
  {
    productid: 2,
    name: "Men's belt",
    amount: 250.0,
    image: "/belt.jpeg",
    quantity: 1,
    description: "Look stuning with british leather belt",
    category: "Men's outfit",
  },
  {
    productid: 3,
    name: "Grey Back pack",
    amount: 2500.0,
    image: "/lapbag.jpeg",
    quantity: 1,
    description: "American bag pack best for official duties",
    category: "Bags and Back packs"
  },
  {
    productid: 4,
    name: "Pull neck shirt",
    amount: 800.0,
    image: "/pullneck.jpeg",
    quantity: 1,
    description: "Long pull neck shirt best for surviving tough winter",
    category: "Men's outfit"
  },
  {
    productid: 5,
    name: "Mens jeans",
    amount: 1500.0,
    image: "/jeans.jpeg",
    quantity: 1,
    description: "French men's luxurios jeans be sure you will look good wearing these",
    category: "Men's outfit"
  },
  {
    productid: 6,
    name: "Quilted Gym Bag",
    amount: 4600.0,
    image: "/Quilted Gym Bag - black-l.jpeg",
    quantity: 1,
    description: "Shop the most liked carrier bags for gym enthusiasts",
    category: "Bags and Back packs"
  },
  {
    productid: 7,
    name: "Womens body shaper",
    amount: 870.0,
    image: "/body_shaper.jpeg",
    quantity: 1,
    description: "Wanna keep your body nice and seductive, get hold of this body shaper and you'll be surprised",
    category: "Women's outfit",
  },
  {
    productid: 8,
    name: "Austaralian black belt",
    amount: 2500.0,
    image: "/black-belt.jpeg",
    quantity: 1,
    description: "Mens luxurious official belts",
    category: "Men's outfit",
  },
  {
    productid: 9,
    name: "Marine jackets",
    amount: 1800.0,
    image: "/jacket.jpeg",
    quantity: 1,
    description: "Survive winter summer and Africa Extreme weather with Marine jacket",
    category: "All Category Jackets"
  },
  {
    productid: 10,
    name: "Cool sneakers",
    amount: 2500.0,
    image: "/sneakers.jpeg",
    quantity: 1,
    description: "Eager and yawning to climb some mountains to failed to equip yourself with these cool sneakers",
    category: "Shoes and sneakers"
  },
];
