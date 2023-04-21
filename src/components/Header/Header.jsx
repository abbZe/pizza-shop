import React from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.scss";
import pizzaLogo from "../../assets/img/pizza-logo.svg";
import cartIcon from "../../assets/cart_icon.svg";
import Search from "../Search/Index";

const Header = () => (
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

      <Search />

      <div className="header__cart">
        <Link to="/cart" className="button button--cart">
          <span>520 ₽</span>
          <div className="button__delimiter"></div>
          <img className={styles.iconOfCart} src={cartIcon} alt="cart icon" />
          <span>3</span>
        </Link>
      </div>
    </div>
  </div>
);

export default Header;
