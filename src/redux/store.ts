import { configureStore } from "@reduxjs/toolkit"

import filterSlice from "./filter/slice.js"
import searchSlice from "./search/slice"
import cartSlice from "./cart/slice"
import pizzasSlice from "./pizza/slice"
import { useDispatch } from "react-redux"

export const store = configureStore({
    reducer: {
        filterSlice,
        searchSlice,
        cartSlice,
        pizzasSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
