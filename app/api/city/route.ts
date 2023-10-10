import { NextResponse } from "next/server";
import { ICITYDetail, IWEATHERDETAIL } from "../../../types";

const DATA_SOURCE_URL = {
  cityDetail: "http://api.ipstack.com",
  weatherDetail: "https://api.openweathermap.org/data/2.5/weather",
  weatherIcon: "https://openweathermap.org/img/wn",
};
const API_KEY_CITY: string = process.env.DATA_CITYAPI_KEY as string;
const API_KEY_WEATHER: string = process.env.DATA_WEATHERAPI_KEY as string;

async function fetchCityData(ip: string) {
  const Api = `${DATA_SOURCE_URL.cityDetail}/${ip}?access_key=${API_KEY_CITY}`;

  const res = await fetch(Api, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch city data");
  }

  const cityData: ICITYDetail = await res.json();
  return cityData;
}

async function fetchWeatherData(lat: number, lon: number) {

  const Api = `${DATA_SOURCE_URL.weatherDetail}?lat=${lat}&lon=${lon}&appid=${API_KEY_WEATHER}`;
  const res = await fetch(Api, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch weather data");
  }
  const weatherData: IWEATHERDETAIL = await res.json();
  return weatherData;
}
export async function fetchWeatherIcon(request: Request) {
  const Api = `${DATA_SOURCE_URL.weatherIcon}/${request}@2x.png`;
  const res = await fetch(Api, { cache: "no-store" });
  if (!res.ok) {
    console.log("Failed to fetch weather icon");
  }
  const weatherIcon = await res.arrayBuffer();
  var base64 = btoa(
    new Uint8Array(weatherIcon).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );
  return base64;
}

export async function GETCity(request: Request) {
  const ip = request.params.ip;
  if (!ip) {
    return NextResponse.json({ message: "ip is required" });
  }

  try {
    const cityData = await fetchCityData(ip);
    return cityData;
  } catch (error:any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function GETWeather(request: Request) {
  const ip = request.params?.ip || "185.156.172.142";
  if (!ip) {
    return NextResponse.json({ message: "ip is required" });
  }
  
  try {
    const cityData = await fetchCityData(ip);
    const lat = cityData.latitude;
    const lon = cityData.longitude;
    if (!lat || !lon) {
      return NextResponse.json({
        message: "Latitude and longitude are required",
      });
    }
    
    const weatherData :IWEATHERDETAIL= await fetchWeatherData(lat, lon);
   
    return weatherData;
  } catch (error:any) {
    return NextResponse.json({ message: error.message });
  }
}
