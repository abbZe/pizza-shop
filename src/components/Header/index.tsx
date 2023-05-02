import { useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

import styles from "./Header.module.scss"
import pizzaLogo from "../../assets/img/pizza-logo.svg"
import cartIcon from "../../assets/cart_icon.svg"
import Search from "../Search/Index"
import { selectCart } from "../../redux/cart/selectors"

const Index: React.FC = () => {
    const { totalPrice, items } = useSelector(selectCart)
    const { pathname } = useLocation()
    const totalCount = items.reduce(
        (sum: number, item: any) => sum + item.count,
        0
    )
    const isMounted = useRef(false)

    useEffect(() => {
        if (isMounted.current) {
            const json = JSON.stringify(items)
            localStorage.setItem("cart", json)
        }
        isMounted.current = true
    }, [items])

    return (
        <div className="header">
            <div className="container">
                <Link to="/">
                    <div className="header__logo">
                        <img width="38" src={pizzaLogo} alt="Pizza logo" />
                        <div>
                            <h1>PizzaShimtza</h1>
                            <p>вкуснее не бывает</p>
                        </div>
                    </div>
                </Link>

                {pathname !== "/cart" && <Search />}

                <div className="header__cart">
                    {pathname !== "/cart" && (
                        <Link to="/cart" className="button button--cart">
                            <span>{totalPrice} ₽</span>
                            <div className="button__delimiter"></div>
                            <img
                                className={styles.iconOfCart}
                                src={cartIcon}
                                alt="cart icon"
                            />
                            <span>{totalCount}</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Index
