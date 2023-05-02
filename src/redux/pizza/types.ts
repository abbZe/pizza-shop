import { Status } from "./slice"

export type TPizzaItem = {
    id: string
    title: string
    price: number
    imageUrl: string
    sizes: number[]
    types: number[]
    rating: number
}

export interface IPizzaSliceState {
    items: TPizzaItem[]
    status: Status
}
