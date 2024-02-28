import './scss/app.scss';
import Home from "./pages/Home";
import {Routes, Route} from "react-router-dom";
import MainLayout from "./latouts/MainLayout";
import React, {lazy, Suspense} from "react";
import { LegalNotice } from './components/LegalNotice';
import { PrivacyPolicy } from './components/PrivacyPolicy';


const Cart = lazy(() => import(/* webpackChunkName: 'Cart' */'./pages/Cart'))
const Favorites = lazy(() => import(/* webpackChunkName: 'Favorites' */'./pages/Favorites'))
const FullProduct = lazy(() => import(/* webpackChunkName: 'FullProduct' */'./pages/FullProduct'))
const LoginPage = lazy(() => import(/* webpackChunkName: 'LoginPage' */'./pages/LoginPage'))
const Register = lazy(() => import(/* webpackChunkName: 'Register' */'./pages/Register'))
const Profile = lazy(() => import(/* webpackChunkName: 'Profile' */'./pages/Profile'))
const NotFound = lazy(() => import(/* webpackChunkName: 'NotFound' */'./pages/NotFound'))


function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route path="" element={<Home/>}/>
                <Route path="cart" element={
                    <Suspense fallback={<div>Downloading...</div>}>
                        <Cart/>
                    </Suspense>
                }
                />
                <Route path="favorites" element={
                    <Suspense fallback={<div>Downloading...</div>}>
                        <Favorites/>
                    </Suspense>
                }
                />
                <Route path="sneakers/:id" element={
                    <Suspense fallback={<div>Downloading...</div>}>
                        <FullProduct/>
                    </Suspense>
                }
                />
                <Route path="login" element={
                    <Suspense fallback={<div>Downloading...</div>}>
                        <LoginPage/>
                    </Suspense>
                }
                />
                <Route path="register" element={
                    <Suspense fallback={<div>Downloading...</div>}>
                        <Register/>
                    </Suspense>
                }
                />
                <Route path="profile" element={
                    <Suspense fallback={<div>Downloading...</div>}>
                        <Profile/>
                    </Suspense>
                }
                />
                  <Route path="legal-notice" element={
                    <Suspense fallback={<div>Downloading...</div>}>
                        <LegalNotice/>
                    </Suspense>
                }
                />
                  <Route path="privacy-policy" element={
                    <Suspense fallback={<div>Downloading...</div>}>
                        <PrivacyPolicy/>
                    </Suspense>
                }
                />
                <Route path="*" element={
                    <Suspense fallback={<div>Downloading...</div>}>
                        <NotFound/>
                    </Suspense>
                }
                />
            </Route>
        </Routes>
    );
}

export default App;
