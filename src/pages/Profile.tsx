import React, {Fragment, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {selectCart} from "../redux/cart/selectors";
import {selectFavorites} from "../redux/favorites/selectors";
import {CartItem, ProductBlock} from "../components";
import Media from 'react-media';


const Profile: React.FC = () => {
    const {items} = useSelector(selectCart)
    const {favorites} = useSelector(selectFavorites)
    const [isFav, setFav] = useState(false)
    const [isCartItems, setCartItems] = useState(false)

    const favProfList = []
    let getArray
    getArray = JSON.parse(localStorage.getItem('favorites') || '0')
    for (let i = 0; i < getArray.length; i++){
        let x = getArray[i]
        favProfList[i] = JSON.parse(localStorage.getItem('favItem' + [x]) || '')
    }

    useEffect(() => {
        if(favorites.length == 0){
            setFav(false)
        }else{
            setFav(true)
        }
    },[favorites])

    useEffect(() => {
        if(items.length == 0){
            setCartItems(false)
        }else{
            setCartItems(true)
        }
    },[items])
    const favProfProduct = favProfList.map((obj: any) => <ProductBlock key={obj.id} {...obj}/> )
    const cartProfItems = items.map((item: any) => <CartItem key={item.id + item.size} {...item} />)


    const prodRowFour = favProfProduct.map((obj: any, index) => {
        if (index % 4 === 0)
            return (
                <div key={index} className="prodRow">
                    {favProfProduct[index]}
                    {favProfProduct[index + 1]}
                    {favProfProduct[index + 2]}
                    {favProfProduct[index + 3]}
                </div>
            )
    })
    const prodRowThree = favProfProduct.map((obj: any, index) => {
        if (index % 3 === 0)
            return (
                <div key={index} className="prodRow">
                    {favProfProduct[index]}
                    {favProfProduct[index + 1]}
                    {favProfProduct[index + 2]}
                </div>
            )
    })
    const prodRowTwo = favProfProduct.map((obj: any, index) => {
        if (index % 2 === 0)
            return (
                <div key={index} className="prodRow">
                    {favProfProduct[index]}
                    {favProfProduct[index + 1]}
                </div>
            )
    })

    return (
        <div className="container">
            <div className="content-wrapper">
                <div className="profile__content">
                    <div className="profile__title">
                        <h1>Profile</h1>
                        <p>Congrats! Free shipping for members. As a Sneakerx Member enjoy fast and free shipping.</p>
                    </div>
                    <div className="profile__cart-block">

                        {!isCartItems ? (
                            <p style={{textAlign: "left"}}>There are no products in your shopping cart.</p>
                        ) : (
                            <>
                                <h2 className="content__items-title">Items in your cart:</h2>
                                <div className="container container--cart>">
                                    <div className="content__items">
                                        {cartProfItems}
                                    </div>
                                </div>
                            </>
                        )
                        }
                    </div>

                    {!isFav ? (
                        <p style={{marginTop: -120, textAlign: "left"}}>There are no favorite products in your shopping
                            cart.</p>
                    ) : (
                        <>
                            <h2>Items in your favorites page:</h2>
                            <div className="container">
                                <Media queries={{
                                    small: "(max-width: 899px)",
                                    medium: "(min-width: 900px) and (max-width: 1169px)",
                                    large: "(min-width: 1170px)"
                                }}>
                                    {matches => (
                                        <Fragment>
                                            {matches.small && prodRowTwo}
                                            {matches.medium && prodRowThree}
                                            {matches.large && prodRowFour}
                                        </Fragment>
                                    )}
                                </Media>
                            </div>
                        </>
                    )
                    }
                </div>
            </div>
        </div>
    );
}

export default Profile;