import React from "react";

const Flooter = () => {
  return (
    <div className="flex bg-black justify-center  gap-32 pt-7 pb-4">
      {/* * */}
      <div className="flex flex-col gap-2 group text-white">
        <span className="text-base">About iQIYI</span>
        <ul className="flex flex-col gap-1 text-gray-400">
          <li>About us </li>
          <li>Products And services </li>
          <li>Ways to Watch</li>
          <li>investor Relations</li>
        </ul>
      </div>
      {/* * */}
      <div className="flex flex-col gap-2 group text-white">
        <span className="text-base">Cooperation</span>

        <ul className="flex flex-col gap-1 text-gray-400">
          <li>Advertise </li>
          <li>Corporate </li>
          <li>Preinstall</li>
        </ul>
      </div>
      {/* * */}
      <div className="flex flex-col gap-2 group text-white">
        <span className="text-base">Help and support</span>
        <ul className="flex flex-col gap-1 text-gray-400">
          <li>Feedback </li>
          <li>Security Response Center </li>
          <li>FAQ</li>
        </ul>
      </div>
      {/* * */}
      <div className="flex flex-col gap-2 group text-white">
        <span className="text-base">Terms of Service</span>
        <ul className="flex flex-col gap-1 text-gray-400">
          <li> Privacy Policy</li>
          <li> Terms of Service </li>
          <li>Cookie Settings</li>
        </ul>
      </div>
    </div>
  );
};

export default Flooter;
