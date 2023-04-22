import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import qs from "qs";

import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/Index";
import Pagination from "../Pagination/Index";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  // GLOBAL STATE
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filterSlice
  );
  const { searchValue } = useSelector((state) => state.searchSlice);
  const sortType = sort.sortProp;

  // LOCAL STATES
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // HANDLERS
  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onPageChange = (number) => {
    dispatch(setCurrentPage(number));
  };

  // CONSTANTS
  const category = categoryId > 0 ? `category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const url = "https://643d74c7f0ec48ce905cd998.mockapi.io/items";

  // IS URL CONTAINS PROPS?
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sortProp === params.sortProp);

      dispatch(setFilters({ ...params, sort }));
    }

    isSearch.current = true;
  }, []);

  const fetchPizzas = () => {
    setIsLoading(true);

    axios
      .get(
        `${url}?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=desc${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProp: sort.sortProp,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort.sortProp]);

  // UPDATE DATA AND RERENDER OBSERVER
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  // RENDER
  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>

      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>

      <Pagination currentPage={currentPage} setCurrentPage={onPageChange} />
    </div>
  );
};

export default Home;
