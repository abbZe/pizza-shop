import { configureStore } from "@reduxjs/toolkit"

import filterSlice from "./slices/filter/slice.js"
import searchSlice from "./slices/search/slice"
import cartSlice from "./slices/cart/slice"
import pizzasSlice from "./slices/pizza/slice"
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
