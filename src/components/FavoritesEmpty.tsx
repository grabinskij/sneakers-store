import React from 'react';
import favEmptyImg from '../assets/img/empty-heart.png'
import {Link} from "react-router-dom";

export const FavoritesEmpty: React.FC = () => {
    return (
        <>
            <div className="favorites favorites__empty">
                <h2>The favorites page is empty<span>😕</span></h2>
                <p>
                    You haven't added anything here.<br/>
                    Please, go back to the main page and add your wished product by clicking the heart icon.
                </p>
                <img src={favEmptyImg} alt="Empty favorites page"/>
                <Link to="/" className="button button--black">
                    <span>Back</span>
                </Link>
            </div>
        </>
    );
}

