import { useState } from "react";
export default function Sidebar() {
  const locations = ["Nairobi", "New York", "Indiana", "Kericho"];
  const [location, setLocation] = useState(locations[0]);
  return (
    <aside className="fixed w-[27.5%] bg-blue-50 top-[10%] left-0 h-full px-12 shadow-lg">
      <div className="flex justify-between my-8 header">
        <p className="font-bold text-[#1e1e1e] text-lg">Filter</p>
        {/* onClick will be on div, not the button */}
        <div>
          <span className="mr-2 text-gray-500">Clear All</span>
          <button className="rounded-full border-2 border-gray-400 px-2 py-0.5 text-gray-400">
            x
          </button>
        </div>
      </div>
      <div className="location mb-4">
        <p className="font-bold text-[#1e1e1e] text-lg mb-2">Location</p>
        <select className="w-full h-fit outline-none ring-2 ring-blue-200 ring-offset-0 bg-transparent p-2 rounded-md text-[#1e1e1e]/60 font-medium">
          {locations.map((val, i) => (
            <option
              value={location}
              key={i}
              onChange={() => setLocation(val)}
              className="text-[#1e1e1e]/50"
            >
              {val}
            </option>
          ))}
        </select>
      </div>
      <div className="availability mb-4">
        <p className="font-bold text-[#1e1e1e] text-lg mb-2">Availability</p>
      </div>
    </aside>
  );
}
