import React from "react"
import { useSelector } from "react-redux"
import { selectFilter } from "../redux/filter/selectors"

type CategoriesProps = {
    categoryId: number
    onClickCategory: (index: number) => void
}

export const Categories: React.FC<CategoriesProps> = React.memo(
    ({ categoryId, onClickCategory }) => {
        // EXPORT ARRAY OF CATEGORIES FROM STATE
        const { categories } = useSelector(selectFilter)

        return (
            <div className="categories">
                <ul>
                    {categories.map((categoryName: string, i: number) => (
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
        )
    }
)
