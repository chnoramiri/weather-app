export interface ICITY {
  cities: {
    id: string;
    city: string;
    ip: string;
  }[];
}
export interface ICITYDetail {
  id: string;
  city: string;
  ip: string;
  latitude: number;
  longitude: number;
}

export interface IWEATHERDETAIL {
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    wind: { speed: number };
  };
}
