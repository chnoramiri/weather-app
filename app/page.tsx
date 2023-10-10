import CityComponent from "./weather/city";
import fs from "fs/promises";
import path from "path";
import { ICITY } from "../types";
import Page from "./weather/[ip]/page";

export async function fetchCityData(): Promise<ICITY> {
  try {
    const filePath = path.join(process.cwd(), "app/api", "city.json");
    const jsonData = await fs.readFile(filePath);
    const data: ICITY = JSON.parse(jsonData.toString());
    return data;
  } catch (error) {
    console.error("Error fetching city data:", error);
    throw error;
  }
}

export default async function Home(): Promise<JSX.Element> {
  const data: ICITY = await fetchCityData();
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <CityComponent cityData={data.cities} />
      <Page />
    </main>
  );
}
