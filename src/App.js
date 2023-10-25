import { useRef, useState } from "react";
import { WeatherTypes, Api_Key } from "./components/Weather";

function App() {
  const inputRef = useRef(null);

  const [api, setApi] = useState(null);
  const [showweather, setShowweather] = useState(null);
  const [loading, setloading] = useState(false);

  const fetchWeather = async () => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${Api_Key}`;
    console.log(inputRef.current.value);
    setloading(true);
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setApi(data);
        console.log(data);
        console.log(data, "--data");
        setloading(false);

        if (data.cod === 404 || data.cod === 400) {
          setShowweather([
            {
              type: "Not Found",
              img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png",
            },
          ]);
        } else {
          setShowweather(
            WeatherTypes.filter(
              (weather) => weather.type === data.weather[0].main
            )
          );
        }
      })
      .catch((err) => {
        console.log(err.message);
        setloading(false);
        setShowweather([
          {
            type: "Error",
            img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png",
            country: "Error",
          },
        ]);
      });
  };

  return (
    <div className="bg-gray-800 h-screen grid place-items-center">
      <div className="bg-white w-96 p-4 rounded-md">
        <div className="flex items-center justify-between">
          <input
            className="text-xl border-b p-1 border-gray-200 font-semibold uppercase flex-1 outline-none"
            type="text"
            ref={inputRef}
            placeholder="Enter the Location"
          />
          <button onClick={fetchWeather}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/758/758651.png"
              alt="weather"
              className="w-8"
            />
          </button>
        </div>
        <div
          className={`duration-300 delay-75 overflow-hidden ${
            showweather ? "h-[27rem]" : "h-0"
          }`}
        >
          {loading ? (
            <div className="grid place-items-center h-full">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1477/1477009.png"
                alt="..."
                className="w-14 mx-auto mb-2 animate-spin"
              />
            </div>
          ) : (
            showweather && (
              <div className="text-center flex flex-col gap-6 mt-10">
                {api && (
                  <p className="text-xl font-semibold">{`${api?.name},${api?.sys?.country}`}</p>
                )}
                <img
                  src={showweather[0]?.img}
                  alt="....."
                  className="w-52 mx-auto"
                />
                <h3 className="text-2xl font-bold text-zinc-800">
                  {showweather[0]?.type}
                </h3>
                {api && (
                  <div>
                    <div className="flex justify-center">
                      <img
                        className="h-9 mt-1"
                        src="https://cdn-icons-png.flaticon.com/512/7794/7794499.png"
                        alt="....."
                      />
                      {api.main && api.main.temp && (
                        <h2 className="text-4xl font-extrabold">
                          {api.main.temp}&#176;C
                        </h2>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
