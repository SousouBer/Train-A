export interface User {
  name: string;
  email: string;
  role: 'manager' | 'user';
}

export interface SignupData {
  email: string;
  password: string;
  password_confirmation: string;
}

export interface SigninData {
  email: string;
  password: string;
}

export interface CityData {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  connectedTo: { id: number; distance: number }[];
}

export interface CityCoordinates {
  fromLatitude: number;
  fromLongitude: number;
  toLatitude: number;
  toLongitude: number;
  date?: string;
}
