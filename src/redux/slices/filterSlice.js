import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    sortProp: "rating",
  },
  currentPage: 1,
};

const filterSlice = createSlice({
  name: "filter",

  initialState,

  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage, setFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
