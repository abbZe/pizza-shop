import React, { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios"

type PizzaItemState = {
    imageUrl: string
    title: string
    price: number
}

const FullPizza: React.FC = () => {
    const URL: string = "https://643d74c7f0ec48ce905cd998.mockapi.io/items/"

    const [pizza, setPizza] = useState<PizzaItemState>()
    const { id } = useParams()
    const navigate = useNavigate()

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(`${URL}${id}`)
                setPizza(data)
            } catch (e) {
                alert("Ошибка при получении пиццы")
                navigate("/")
            }
        }

        fetchPizza()
    }, [])

    return !pizza ? (
        <p>"Загрузка..."</p>
    ) : (
        <div className="container">
            <img src={pizza.imageUrl} alt="pizza" />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} rub</h4>
            <Link to="/">
                <button className="button button--outline button--add">
                    <span>Назад</span>
                </button>
            </Link>
        </div>
    )
}

export default FullPizza
