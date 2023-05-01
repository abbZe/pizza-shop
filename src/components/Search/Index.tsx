import React, { useRef, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import debounce from "lodash.debounce"

import styles from "./Search.module.scss"
import searchIcon from "../../assets/search_icon.svg"
import eraseIcon from "../../assets/erase_icon.svg"
import { setSearchValue } from "../../redux/slices/search/slice"
import { selectSearch } from "../../redux/slices/search/selectors"

const Search: React.FC = () => {
    // LOCAL STATE
    const [value, setValue] = useState<string>("")

    // GLOBAL STATE
    const { searchValue } = useSelector(selectSearch)

    // REFS
    const inputRef = useRef<HTMLInputElement>(null)

    // DISPATCH
    const dispatch = useDispatch()

    // INPUT DEBOUNCE
    const updateSearchValue = useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str))
        }, 250),
        []
    )

    // HANDLERS
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        updateSearchValue(e.target.value)
    }

    const onClickClear = () => {
        dispatch(setSearchValue(""))
        setValue("")
        inputRef.current?.focus()
    }

    // RENDER
    return (
        <div className={styles.root}>
            <img
                className={styles.searchIcon}
                src={searchIcon}
                alt="search icon"
            />
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
    )
}

export default Search
