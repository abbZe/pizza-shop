import React, { useRef, useState } from "react"

import { useSelector, useDispatch } from "react-redux"
import { selectFilter } from "../redux/filter/selectors"
import { setSort } from "../redux/filter/slice.js"

export type SortListItem = {
    name: string
    sortProp: string
}

export const sortList: SortListItem[] = [
    { name: "популярности", sortProp: "rating" },
    { name: "цене", sortProp: "price" },
    { name: "алфавиту", sortProp: "title" },
]

export const Sort: React.FC = () => {
    // REFS
    const sortRef = useRef<HTMLDivElement>(null)

    // GLOBAL STATE
    const dispatch = useDispatch()
    const { sort } = useSelector(selectFilter)

    // LOCAL STATE
    const [isOpen, setIsOpen] = useState<boolean>(false)

    // HANDLERS
    const clickHandler = (obj: any) => {
        dispatch(setSort(obj))
        setIsOpen(false)
    }

    //EFFECT
    // close popup when clicking outside the sort
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sortRef.current &&
                !event.composedPath().includes(sortRef.current)
            ) {
                setIsOpen(false)
            }
        }

        document.body.addEventListener("click", handleClickOutside)

        // remove listener when unmount
        return () =>
            document.body.removeEventListener("click", handleClickOutside)
    }, [])

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
                                className={
                                    sort.sortProp === obj.sortProp
                                        ? "active"
                                        : ""
                                }
                            >
                                {obj.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
