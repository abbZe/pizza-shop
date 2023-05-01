import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../../store"
import { IPizzaSliceState, TPizzaItem } from "./types"

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

export enum Status {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error",
}

const initialState = {
    items: [],
    status: Status.LOADING,
} as IPizzaSliceState

const slice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<TPizzaItem[]>) {
            state.items = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchPizzas.pending, state => {
                state.status = Status.LOADING
                state.items = []
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.status = Status.SUCCESS
                state.items = action.payload
            })
            .addCase(fetchPizzas.rejected, state => {
                state.status = Status.ERROR
                state.items = []
            })
    },
})

export default slice.reducer
