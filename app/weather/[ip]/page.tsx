import React from "react";
import { GETWeather, fetchWeatherIcon } from "../../api/city/route";
import { IWEATHERDETAIL } from "../../../types";
import Image from "next/image";
import type { NextRequest } from "next/server.js";

const Page = async (req: NextRequest) => {
  const weatherData = await GETWeather(req);

  const { weather, main } = weatherData;
  const weatherIconData =
    weatherData && weather && weather.length > 0 ? weather[0].icon : "";
  const icon = await fetchWeatherIcon(weatherIconData);

  return (
    <div className="flex justify-center pt-48	items-center">
      {weatherData && main ? (
        <div className="box-border h-full sm:w-[30rem] md:w-[50rem] lg:w-[60rem] 	p-2 border-4 bg-neutral-200	rounded-xl text-base font-serif">
          <div className="flex flex-row pt-6 ">
            <div className="flex content-center flex-auto w-64">
              <div>
                <Image
                  src={`data:image/png;base64,${icon}`}
                  width={120}
                  height={120}
                  alt="Icon"
                />
              </div>
              <div className="flex flex-col ">
                <div className="flex items-center text-6xl">
                  <p>{`${main.temp}`}</p>°
                </div>
                <div className="text-sm	">RealFeel {`${main.feels_like}°`}</div>
              </div>
            </div>
            <div className="flex  flex-col place-content-center flex-auto w-32 ">
              <div className="flex flex-row justify-between ">
                <p>Pressure</p>
                <span>{`${main.pressure}`}</span>
              </div>

              <div className="divider 	"></div>
              <div className="flex flex-row justify-between ">
                <p>Wind</p>
                <p>{`${main.wind?.speed} km/h`}</p>
              </div>
              <div className="divider"></div>
              <div className="flex flex-row justify-between ">
                <p>Humidity</p>
                <p>{`${main.humidity}`}</p>
              </div>
            </div>
          </div>
          <p className="text-2xl">{`${weather[0].main}`}</p>
        </div>
      ) : (
        <p>data is not valid</p>
      )}
    </div>
  );
};

export default Page;
