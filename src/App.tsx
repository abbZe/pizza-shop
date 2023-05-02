import { Route, Routes } from "react-router-dom"
import React, { lazy, Suspense } from "react"

import "./scss/app.scss"
import MainLayout from "./layouts/MainLayout"

const Home = lazy(() => import("./pages/Home"))
const Cart = lazy(() => import("./pages/Cart"))
const FullPizza = lazy(() => import("./pages/FullPizza"))
const NotFound = lazy(() => import("./pages/NotFound"))
const App: React.FC = () => (
    <Suspense fallback={<div>Идет загрузка</div>}>
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="" element={<Home />} />
                <Route path="cart" element={<Cart />} />
                <Route path="pizza/:id" element={<FullPizza />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </Suspense>
)

export default App
