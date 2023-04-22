import React from "react";
import { Link } from "react-router-dom";
import cartEmpty from "../assets/empty-cart.png";

const CartEmpty = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>
          Корзина пустая <icon>😀</icon>
        </h2>
        <p>
          Вероятнее всего, Вы забыли добавить пиццу в корзину. <br /> Вы можете
          сделать это на главной странице
        </p>
        <img src={cartEmpty} alt="EmptyCart" />
        <Link to="/" className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
