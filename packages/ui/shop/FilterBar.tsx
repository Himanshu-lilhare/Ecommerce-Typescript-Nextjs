"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent } from "react";
const FilterBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  function handleFilter(e: ChangeEvent<HTMLSelectElement>) {
    let searchParam = new URLSearchParams(window.location.search);

   searchParam.set(e.currentTarget.name,e.target.value)
    router.push(`/shop?${searchParam.toString()}`);
  }
  return (
    <div className="filter-bar">
      <select
        className="purple-button"
        name="category"
        id="category"
        defaultValue={"filter-by-category"}
        onChange={handleFilter}
      >
        <option disabled className="white-button" value="filter-by-category">
          Sort by category
        </option>
        <option className="white-button" value="allCategory">
          All
        </option>
        <option className="white-button" value="t-shirt">
          T-Shirt
        </option>
        <option className="white-button" value="jeans">
          Jeans
        </option>
      </select>
      <select
        onChange={handleFilter}
        className="purple-button"
        name="price"
        id="price"
      >
        <option className="white-button" value="filter-by-price">
          Sort by price
        </option>
        <option className="white-button" value="allPrice">
          All
        </option>

        <option className="white-button" value="under-200">
          0 - 200
        </option>
        <option className="white-button" value="200-400">
          200 - 400
        </option>
        <option className="white-button" value="400-800">
          400 - 800
        </option>
        <option className="white-button" value="over-800">
          over 800
        </option>
      </select>
    </div>
  );
};

export default FilterBar;
