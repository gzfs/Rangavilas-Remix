export interface User {
  id: string;
  email: string;
  is_admin: boolean;
  image: string;
  first_name: string;
  last_name: string;
  phone?: string;
  default_address_id?: string;
}

export interface Address {
  id: string;
  user_id: string;
  house_number: string;
  city: string;
  county: string;
  pincode: string;
  landmark?: string;
  street_name: string;
}

export type Product = {
  id: string;
  rating: number;
  name: string;
  price: number;
  category_id: string;
  description: string;
  is_featured: boolean;
};

export type Image = {
  id: string;
  url: string;
  product_id?: string;
  category_id?: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
};

export type Keyword = {
  id: string;
  keyword: string;
  product_id?: string;
};

export type KeywordProduct = {
  id: string;
  keyword_id: string;
  product_id: string;
};

export type Cart = {
  cart_id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  gram_quantity: number;
};

export type OrderCart = {
  id: string;
  cart_id: string;
  order_id?: string;
};

export interface Database {
  User: User;
  Address: Address;
  Category: Category;
  Image: Image;
  Product: Product;
  Keyword: Keyword;
  KeywordProduct: KeywordProduct;
  Cart: Cart;
  OrderCart: OrderCart;
}
