import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { setSort } from "../redux/slices/filterSlice";

export const sortList = [
  { name: "популярности", sortProp: "rating" },
  { name: "цене", sortProp: "price" },
  { name: "алфавиту", sortProp: "title" },
];

const Sort = () => {
  // REFS
  const sortRef = React.useRef();

  // GLOBAL STATE
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filterSlice.sort);

  // LOCAL STATE
  const [isOpen, setIsOpen] = React.useState(false);

  // HANDLERS
  const clickHandler = (obj) => {
    console.log(obj);
    dispatch(setSort(obj));
    setIsOpen(false);
  };

  //EFFECT
  // close popup when clicking outside the sort
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    // remove listener when unmount
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  // RENDER
  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{sort.name}</span>
      </div>

      {/* WHEN SORT IS OPEN -- RENDER SORT LIST */}
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, i) => (
              <li
                onClick={() => clickHandler(obj)}
                key={obj.name + i}
                className={sort.sortProp === obj.sortProp ? "active" : ""}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
