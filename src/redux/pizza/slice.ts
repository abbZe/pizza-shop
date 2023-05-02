import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"
import { IPizzaSliceState, TPizzaItem } from "./types"
import { fetchPizzas } from "./asyncActions"

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
