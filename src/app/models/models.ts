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
  city: string;
  geometry: {
    lat: number;
    lng: number;
  };
}

export interface CityCoordinates {
  fromLatitude: number;
  fromLongitude: number;
  toLatitude: number;
  toLongitude: number;
  date?: string;
}
