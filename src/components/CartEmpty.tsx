import React from 'react';
import cartEmptyImg from '../assets/img/empty-cart.png'
import {Link} from "react-router-dom";

export const CartEmpty: React.FC = () => {
    return (
        <>
            <div className="cart cart--empty">
                <h2>The cart is empty<span>😕</span></h2>
                <p>
                    You have nothing to order.<br/>
                    Please, return to the main page.
                </p>
                <img src={cartEmptyImg} alt="Empty cart"/>
                <Link to="/" className="button button--black">
                    <span>Back</span>
                </Link>
            </div>
        </>
    );
}

