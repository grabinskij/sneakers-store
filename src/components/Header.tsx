import React, {FC, useEffect, useRef, useState} from "react";
import LogoSvg from '../assets/img/logo.svg';
import {Link, useLocation} from "react-router-dom";
import {Search} from "./";
import {useSelector} from "react-redux";
import {selectCart} from "../redux/cart/selectors";
import heartImg from "../assets/img/heart.svg"
import userImg from "../assets/img/user.svg"
import {IoIosHeart, IoIosLogIn} from "react-icons/io";
import {useAuth} from "../hooks/use-auth";
import {removeUser} from "../redux/user/slice";
import {useAppDispatch} from "../redux/store";
import {selectFavorites} from "../redux/favorites/selectors";


type PopupClick = MouseEvent & {
    path: Node[]
}

export const Header: FC = () => {
    const dispatch = useAppDispatch()
    const {items, totalPrice} = useSelector(selectCart)
    const location = useLocation()
    const isMounted = useRef(false)
    const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0)
    const {isAuth} = useAuth()
    const [open, setOpen] = useState(false)
    const [isFav, setFav] = useState(false)
    const userRef = useRef<HTMLDivElement>(null)
    const {favorites} = useSelector(selectFavorites)

    useEffect(() => {
        if (isMounted.current) {
            const json = JSON.stringify(items)
            localStorage.setItem('cart', json)
        }
        isMounted.current = true
    }, [items])

    useEffect(() => {
        if (favorites.length > 0) {
            setFav(true)
        } else {
            setFav(false)
        }
    }, [favorites])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const _event = event as PopupClick

            if (userRef.current && !_event.path.includes(userRef.current)) {
                setOpen(false)
            }
        }
        document.body.addEventListener('click', handleClickOutside)
        return () => document.body.removeEventListener('click', handleClickOutside)
    }, [])

    const doLogOut = () => {
        dispatch(removeUser())
        setOpen(false)
        localStorage.removeItem('loginInfo')
    }
    const getProfilePage = () => {
        setOpen(false)
    }

    return (
        <div className="header">
            <div className="container">
                <Link to="/">
                    <div className="header__logo">
                        <img width="58" src={LogoSvg} alt="Sneakers logo"/>
                        <div>
                            <h1>Sneakerx</h1>
                            <p>You deserve it</p>
                        </div>
                    </div>
                </Link>
                {
                    location.pathname !== '/cart' &&
                    location.pathname !== '/favorites' &&
                    location.pathname !== '/login' &&
                    location.pathname !== '/register' &&
                    (
                        <>
                            <Search/>

                            <div className="header__items">
                                <div className="header__cart">
                                    <Link to="/cart" className="button button--cart">
                                        <span>{totalPrice} $</span>
                                        <div className="button__delimiter"></div>
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                                                stroke="white"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                                                stroke="white"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                                                stroke="white"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <span>{totalCount}</span>
                                    </Link>

                                    <Link to="/favorites">
                                        {!isFav ? (
                                            <img className="header__favorites" src={heartImg}/>
                                        ) : (
                                            <IoIosHeart
                                                color="red"
                                                className="header__favorites-full"
                                            />
                                        )
                                        }
                                    </Link>

                                    <div ref={userRef} className="header__user">
                                        {isAuth ? (
                                            <div className="user__wrapper">
                                                <span onClick={() => setOpen(!open)}>
                                                    <img className="user__icon" src={userImg} alt="user-profile"/>
                                                </span>
                                                {open && (
                                                    <div className="user__popup">
                                                        <ul>
                                                            <Link to="/profile">
                                                                <li onClick={getProfilePage}>profile</li>
                                                            </Link>
                                                            <li onClick={doLogOut}>
                                                                log out
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <Link to="/login">
                                                <div>
                                                    <IoIosLogIn size={35} color="#fe5f1e"/>
                                                </div>
                                            </Link>
                                        )
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
            </div>
        </div>
    )
}

