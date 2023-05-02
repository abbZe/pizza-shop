import { SortProp } from "./slice.js.js"

export type SortType = {
    name: string
    sortProp: SortProp
}

export interface FilterSliceState {
    categories: Array<string>
    categoryId: number
    sort: any
    currentPage: number
}
