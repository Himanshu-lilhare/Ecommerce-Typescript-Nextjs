"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent } from "react";
const FilterBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  function handleFilter(e: ChangeEvent<HTMLSelectElement>) {
    let searchParam = new URLSearchParams(window.location.search);
    if (searchParam.has("page")) {
      searchParam.delete("page");
    }
    searchParam.set(e.currentTarget.name, e.target.value);
    router.push(`/shop?${searchParam.toString()}`);
  }
  return (
    <div className="filter-bar light-border">
      <select
        className="purple-button"
        name="category"
        id="category"
        defaultValue={"filter-by-category"}
        onChange={handleFilter}
      >
        <option disabled className="white-button" value="filter-by-category">
          Filter by category
        </option>
        <option className="white-button" value="">
          All
        </option>
        <option className="white-button" value="t-shirts">
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
          Filter by price
        </option>
        <option className="white-button" value="">
          All
        </option>

        <option className="white-button" value="1-200">
          1 - 200
        </option>
        <option className="white-button" value="200-400">
          200 - 400
        </option>
        <option className="white-button" value="400-800">
          400 - 800
        </option>
        <option className="white-button" value="<800">
          over 800
        </option>
      </select>
    </div>
  );
};

export default FilterBar;
