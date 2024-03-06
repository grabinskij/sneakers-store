import './scss/app.scss';
import Home from "./pages/Home";
import {Routes, Route} from "react-router-dom";
import MainLayout from "./latouts/MainLayout";
import React, {lazy, Suspense, useState} from "react";
import { LegalNotice } from './components/LegalNotice';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import {Overlay} from "./components/Overlay";
import {CookiePopup} from "./components/CookiePopup";
import {ChangeConsentBanner} from "./components/CookieChangeConsent";


const Cart = lazy(() => import(/* webpackChunkName: 'Cart' */'./pages/Cart'))
const Favorites = lazy(() => import(/* webpackChunkName: 'Favorites' */'./pages/Favorites'))
const FullProduct = lazy(() => import(/* webpackChunkName: 'FullProduct' */'./pages/FullProduct'))
const LoginPage = lazy(() => import(/* webpackChunkName: 'LoginPage' */'./pages/LoginPage'))
const Register = lazy(() => import(/* webpackChunkName: 'Register' */'./pages/Register'))
const Profile = lazy(() => import(/* webpackChunkName: 'Profile' */'./pages/Profile'))
const NotFound = lazy(() => import(/* webpackChunkName: 'NotFound' */'./pages/NotFound'))


function App() {

    const [showOverlay, setShowOverlay] = useState(false);
    const [showChangeConsent, setShowChangeConsent] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(false);


    return (
        <>
        <Overlay show={showOverlay} />
            <CookiePopup
                setIsButtonVisible={setIsButtonVisible}
                setPopupVisible={setPopupVisible}
                popupVisible={popupVisible}
                setShow={setShowOverlay}
                setShowChangeConsent={setShowChangeConsent}/>
            <ChangeConsentBanner
                setShowPopup={setPopupVisible}
                showChangeConsent={showChangeConsent}/>
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
                        <LoginPage isButtonVisible={isButtonVisible} setPopupVisible={setPopupVisible}/>
                    </Suspense>
                }
                />
                <Route path="register" element={
                    <Suspense fallback={<div>Downloading...</div>}>
                        <Register isButtonVisible={isButtonVisible} setPopupVisible={setPopupVisible}/>
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
        </>
    );
}

export default App;
