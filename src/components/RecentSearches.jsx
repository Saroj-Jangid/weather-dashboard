import React from "react";

const RecentSearches = ({ recent, onSelect }) => {
  return (
    <>
    <div className="mt-10">
<h2 className="mt-1 mb-1 text-3xl font-bold text-start">Recent Searches</h2>
    </div>
      <div className="flex gap-5 mt-5">
        {recent.map((item) => {
          return (
            <button
              className="cursor-pointer p-3 items-center justify-center rounded-2xl border border-white/20  bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-800 text-white unit-btn`"
              type="button"
              key={item}
              onClick={() => onSelect(item)}
            >
              {item}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default RecentSearches;
