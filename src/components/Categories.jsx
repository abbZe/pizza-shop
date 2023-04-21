import React from "react";
import { useSelector } from "react-redux";

export default function Categories({ categoryId, onClickCategory }) {
  // EXPORT ARRAY OF CATEGORIES FROM STATE
  const categories = useSelector((state) => state.filterSlice.categories);

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={categoryName + i}
            className={categoryId === i ? "active" : ""}
            onClick={() => onClickCategory(i)}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
