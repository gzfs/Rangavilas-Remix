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

export interface Database {
  User: User;
  Address: Address;
}
