"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ICITYDetail } from "../../types";

interface CityDetail {
  cityData: ICITYDetail[];
}

const CityComponent: React.FC<CityDetail> = (props) => {
  const router = useRouter();

  const selectCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIP = e.target.value;
    const selectedCity = props.cityData.find((city) => city.ip === selectedIP);

    if (selectedCity) {
      router.push(`/weather/${selectedCity.ip}`);
    }
  };

  if (!props.cityData || props.cityData.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div >
      <select
        defaultValue={props.cityData[0].ip}
        className="select select-bordered select-lg w-full max-w-xs"
        onChange={(event) => selectCity(event)}
      >
        {props.cityData.map((item) => (
          <option key={item.id} value={item.ip}>
            {item.city}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CityComponent;
