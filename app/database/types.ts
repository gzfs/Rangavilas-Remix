export interface User {
  id: string;
  email: string;
  is_admin: boolean;
  image: string;
  first_name: string;
  last_name: string;
  phone?: string;
}

export interface Address {}

export interface Database {
  User: User;
  Address: Address;
}
