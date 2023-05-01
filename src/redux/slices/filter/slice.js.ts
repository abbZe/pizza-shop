import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import { FilterSliceState, SortType } from "./types"

export enum SortProp {
    TITLE = "title",
    RATING = "rating",
    PRICE = "price",
}

const initialState: FilterSliceState = {
    categories: [
        "Все",
        "Мясные",
        "Вегетарианские",
        "Гриль",
        "Острые",
        "Закрытые",
    ],
    categoryId: 0,
    sort: {
        name: "популярности",
        sortProp: SortProp.TITLE,
    },
    currentPage: 1,
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSort(state, action: PayloadAction<SortType>) {
            state.sort = action.payload
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setFilters(state, action) {
            state.sort = action.payload.sort
            state.currentPage = Number(action.payload.currentPage)
            state.categoryId = Number(action.payload.categoryId)
        },
    },
})

export const { setCategoryId, setSort, setCurrentPage, setFilters } =
    filterSlice.actions

export default filterSlice.reducer
