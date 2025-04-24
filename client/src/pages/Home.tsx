import { useEffect, useState } from "react";

type Weather = {
  temperatureC: number;
  temperatureF: number;
  summary: string;
};

export function Home() {
  const [count, setCount] = useState(0);
  const [weather, setWeather] = useState<Weather[]>([]);

  useEffect(() => {
    fetch("http://localhost:5277/WeatherForecast")
      .then((res) => res.json())
      .then((json: Weather[]) => setWeather(json));
  }, []);

  return (
    <>
      <h1>Home Page 🐛</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      {weather.map((w) => (
        <div>
          <p>Celsius: {w.temperatureC}</p>
          <p>Farenfight: {w.temperatureF}</p>
          <p>Summary: {w.summary}</p>
          <br />
        </div>
      ))}
    </>
  );
}
