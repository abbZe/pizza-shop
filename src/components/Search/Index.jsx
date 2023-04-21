import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Search.module.scss";
import searchIcon from "../../assets/search_icon.svg";
import eraseIcon from "../../assets/erase_icon.svg";
import { setSearchValue } from "../../redux/slices/searchSlice";
import debounce from "lodash.debounce";

const Search = () => {
  // LOCAL STATE
  const [value, setValue] = React.useState("");

  // GLOBAL STATE
  const { searchValue } = useSelector((state) => state.searchSlice);

  // REFS
  const inputRef = React.useRef();

  // DISPATCH
  const dispatch = useDispatch();

  // INPUT DEBOUNCE
  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 250),
    []
  );

  // HANDLERS
  const changeHandler = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current.focus();
  };

  // RENDER
  return (
    <div className={styles.root}>
      <img className={styles.searchIcon} src={searchIcon} alt="search icon" />
      <input
        className={styles.input}
        ref={inputRef}
        value={value}
        onChange={changeHandler}
        placeholder="найти пиццу..."
      />

      {/* IF SEARCH NOT EMPTY -- SHOW CLEAR ICON */}
      {searchValue && (
        <img
          className={styles.clearIcon}
          onClick={onClickClear}
          src={eraseIcon}
          alt="erase icon"
        />
      )}
    </div>
  );
};

export default Search;
