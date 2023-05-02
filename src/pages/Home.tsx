import React, { useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import qs from "qs"

import Pagination from "../Pagination/Index"
import {
    setCategoryId,
    setCurrentPage,
    setFilters,
} from "../redux/filter/slice.js"
import { fetchPizzas } from "../redux/pizza/asyncActions"
import { useAppDispatch } from "../redux/store"
import { selectFilter } from "../redux/filter/selectors"
import { selectSearch } from "../redux/search/selectors"
import { selectPizza } from "../redux/pizza/selectors"
import { Categories, PizzaBlock, Sort, sortList } from "../components"
import { Skeleton } from "../components/PizzaBlock/Skeleton"

const Home: React.FC = () => {
    const navigate = useNavigate()
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)

    // GLOBAL STATE
    const dispatch = useAppDispatch()
    const { categoryId, sort, currentPage } = useSelector(selectFilter)
    const { searchValue } = useSelector(selectSearch)
    const { items, status } = useSelector(selectPizza)
    const sortType = sort.sortProp

    // HANDLERS
    const onClickCategory = useCallback((id: number) => {
        dispatch(setCategoryId(id))
    }, [])

    const onPageChange = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    // CONSTANTS
    const category = categoryId > 0 ? `category=${categoryId}` : ""
    const search = searchValue ? `&search=${searchValue}` : ""
    const pizzas = items.map((obj: any, index: number) => (
        <PizzaBlock key={index} {...obj} />
    ))
    const skeletons = [...new Array(6)].map((_, index) => (
        <Skeleton key={index} />
    ))
    const url = "https://643d74c7f0ec48ce905cd998.mockapi.io/items"

    // IS URL CONTAINS PROPS?
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = sortList.find(obj => obj.sortProp === params.sortProp)

            if (sort) {
                dispatch(setFilters({ ...params, sort }))
            }
        }

        isSearch.current = true
    }, [])

    const getPizzas = () => {
        dispatch(
            fetchPizzas({
                url,
                currentPage: String(currentPage),
                category,
                sortType,
                search,
            })
        )
    }

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProp: sort.sortProp,
                categoryId,
                currentPage,
            })

            navigate(`?${queryString}`)
        }

        isMounted.current = true
    }, [categoryId, sort.sortProp])

    // UPDATE DATA AND RERENDER OBSERVER
    React.useEffect(() => {
        window.scrollTo(0, 0)
        getPizzas()
        isSearch.current = true
    }, [categoryId, sortType, searchValue, currentPage])

    // RENDER
    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    categoryId={categoryId}
                    onClickCategory={onClickCategory}
                />
                <Sort />
            </div>

            <h2 className="content__title">Все пиццы</h2>
            {status === "error" ? (
                <>
                    <div>
                        Произошла ошибка, к сожалению, не удалось получить пиццы
                    </div>
                    <div>
                        Попробуйте перезагрузить страницу, или повторить попытку
                        позже
                    </div>
                </>
            ) : (
                <div className="content__items">
                    {status === "loading" ? skeletons : pizzas}
                </div>
            )}

            <Pagination
                currentPage={currentPage}
                setCurrentPage={onPageChange}
            />
        </div>
    )
}

export default Home
