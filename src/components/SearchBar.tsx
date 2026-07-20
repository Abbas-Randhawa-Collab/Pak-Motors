"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const brands = ["Any Brand", "Toyota", "Honda", "Suzuki", "KIA", "Mercedes-Benz"];
const cities = ["Any City", "Bahawalpur", "Multan", "Lahore", "Karachi"];

export default function SearchBar() {
  const router = useRouter();
  const [brand, setBrand] = useState("Any Brand");
  const [city, setCity] = useState("Any City");
  const [maxPrice, setMaxPrice] = useState("");
  const [keyword, setKeyword] = useState("");

  function runSearch() {
    const params = new URLSearchParams();
    if (brand !== "Any Brand") params.set("brand", brand);
    if (city !== "Any City") params.set("city", city);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (keyword) params.set("q", keyword);
    router.push(`/cars?${params.toString()}`);
  }

  return (
    <div className="bg-white rounded-xl shadow-2xl p-5 grid md:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-3.5 items-end border-t-4 border-red">
      <div>
        <label className="block text-[10.5px] uppercase tracking-wider text-gray font-bold mb-1.5">Brand</label>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full px-3 py-2.5 border border-line rounded-md bg-off text-sm"
        >
          {brands.map((b) => <option key={b}>{b}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-[10.5px] uppercase tracking-wider text-gray font-bold mb-1.5">City</label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-3 py-2.5 border border-line rounded-md bg-off text-sm"
        >
          {cities.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-[10.5px] uppercase tracking-wider text-gray font-bold mb-1.5">Max Price (PKR)</label>
        <input
          type="number"
          placeholder="e.g. 5000000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full px-3 py-2.5 border border-line rounded-md bg-off text-sm"
        />
      </div>
      <div>
        <label className="block text-[10.5px] uppercase tracking-wider text-gray font-bold mb-1.5">Keyword</label>
        <input
          type="text"
          placeholder="Model name..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full px-3 py-2.5 border border-line rounded-md bg-off text-sm"
        />
      </div>
      <button onClick={runSearch} className="btn btn-red h-[44px] justify-center whitespace-nowrap">
        Search
      </button>
    </div>
  );
}
