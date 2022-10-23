import './scss/app.scss';
import Home from "./pages/Home";
import {Routes, Route} from "react-router-dom";
import MainLayout from "./latouts/MainLayout";
import {lazy, Suspense} from "react";

const Cart = lazy(() => import(/* webpackChunkName: 'Cart' */'./pages/Cart'))
const FullProduct = lazy(() => import(/* webpackChunkName: 'FullProduct' */'./pages/FullProduct'))
const NotFound = lazy(() => import(/* webpackChunkName: 'NotFound' */'./pages/NotFound'))


function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="" element={<Home />} />
                <Route path="cart" element={
                    <Suspense fallback={<div>Йде завантаження кошика...</div>}>
                        <Cart />
                    </Suspense>
                    }
                />
                <Route path="sneakers/:id" element={
                    <Suspense fallback={<div>Йде завантаження...</div>}>
                        <FullProduct />
                    </Suspense>
                    }
                />
                <Route path="*" element={
                    <Suspense fallback={<div>Йде завантаження...</div>}>
                        <NotFound />
                    </Suspense>
                    }
                />
            </Route>
        </Routes>

  );
}

export default App;
