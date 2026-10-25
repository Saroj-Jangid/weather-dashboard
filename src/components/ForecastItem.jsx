
import React from "react";

const ForecastItem = ({ date, temperature_max, temperature_min }) => {
  const day = new Date(date); 

  return (
    <div className="w-44 shrink-0 overflow-hidden rounded-2xl
                    border border-white/20
                    bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-800
                    p-5 text-white shadow-lg shadow-blue-200/60
                    transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Day */}
      <p className="text-center text-sm font-medium text-blue-100">
        {day.toLocaleDateString("en-IN", { weekday: "short" })}
      </p>
      {/* Date */}
      <p className="text-center text-sm font-medium text-blue-100">
        {date}
      </p>

      {/* Weather Icon */}
      <div className="my-5 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center
                        rounded-full border border-white/20
                        bg-white/10 text-4xl shadow-inner">
          🌤️
        </div>
      </div>

      {/* Temperatures */}
      <div className="flex items-center justify-between
                      rounded-xl border border-white/20
                      bg-white/10 p-3 backdrop-blur-md">

        <div>
          <p className="text-xs text-blue-100">Min</p>
          <p className="mt-1 text-lg font-semibold">
            {temperature_min}°
          </p>
        </div>

        <div className="h-9 border-l border-white/20"></div>

        <div className="text-right">
          <p className="text-xs text-blue-100">Max</p>
          <p className="mt-1 text-lg font-semibold">
            {temperature_max}°
          </p>
        </div>

      </div>
    </div>
  );
};

export default ForecastItem;
