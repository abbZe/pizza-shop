import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { ISearchInitialState } from "./types"

const initialState: ISearchInitialState = {
    searchValue: "",
}

const slice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchValue(state, action) {
            state.searchValue = action.payload
        },
    },
})

export const { setSearchValue } = slice.actions

export default slice.reducer
