import React from "react"

import { NotFoundBlock } from "../components"
import { Link } from "react-router-dom"

const NotFound: React.FC = () => (
    <>
        <NotFoundBlock />
        <Link to="/">
            <button>Назад</button>
        </Link>
    </>
)

export default NotFound
