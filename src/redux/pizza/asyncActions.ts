import { createAsyncThunk } from "@reduxjs/toolkit"
import { TPizzaItem } from "./types"
import axios from "axios"

export const fetchPizzas = createAsyncThunk<
    TPizzaItem[],
    Record<string, string>
>("pizza/fetchPizzasStatus", async params => {
    const { url, currentPage, category, sortType, search } = params
    const { data } = await axios.get<TPizzaItem[]>(
        `${url}?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=desc${search}`
    )

    return data
})
