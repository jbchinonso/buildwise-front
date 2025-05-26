"use client";

import { useState } from "react";

export const ActiveTabs = () => {

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex gap-2 p-2 text-sm rounded-3xl bg-grey-50">
      <button
        data-ui={activeTab == 0 ? "active" : ""}
        onClick={() => setActiveTab(0)}
        className="p-4 py-2 rounded-3xl data-active:bg-white active:text-primary-400 hover:bg-white"
      >
        All transactions
      </button>
      <button
        data-ui={activeTab == 1 ? "active" : ""}
        onClick={() => setActiveTab(1)}
        className="p-4 py-2 rounded-3xl data-active:bg-white active:text-primary-400 hover:bg-white"
      >
        Property 1
      </button>
      <button
        data-ui={activeTab == 2 ? "active" : ""}
        onClick={() => setActiveTab(2)}
        className="p-4 py-2 rounded-3xl data-active:bg-white active:text-primary-400 hover:bg-white"
      >
        Property 2
      </button>
    </div>
  );
};
