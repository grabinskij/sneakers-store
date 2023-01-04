import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {CartItem} from "../../redux/cart/types";
import {addItem} from "../../redux/cart/slice";
import {addFav} from "../../redux/favorites/slice";
import axios from "axios";
import {IoIosHeart, IoIosHeartEmpty} from "react-icons/io";
import {ProductBlockProps} from "../../redux/product/types";
import {selectFavorites} from "../../redux/favorites/selectors";
import {FavoritesItem} from "../../redux/favorites/types";
import {useAppDispatch} from "../../redux/store";


export const ProductBlock: React.FC<ProductBlockProps> =
    ({id, title, description, price, imageUrl, sizes, saleImg}) => {
        const dispatch = useAppDispatch()
        const cartItem = useSelector((state: any) =>
            state.cart.items.filter((obj: { id: number }) => obj.id === id)
        )

        const [activeSize, setActiveSize] = useState<number>(0)
        const {favorites} = useSelector(selectFavorites)
        const addedCount = cartItem.reduce((sum: any, item: any) => sum + item.count, 0);

        const item: CartItem = {
            id,
            title,
            description,
            price,
            imageUrl,
            saleImg,
            size: sizes[activeSize],
            count: 0,
        }
        const onClickAdd = () => {
            dispatch(addItem(item))
            axios.post('https://632732125731f3db995538bb.mockapi.io/cart', item)
        }

        const favItem: FavoritesItem = {
            id,
            title,
            description,
            price,
            imageUrl,
            saleImg,
            sizes,
            count: 0,
        }
        const onClickFav = ({favItem, id}: { favItem: FavoritesItem; id: number }) => {
            dispatch(addFav({favItem, id}))
            axios.post('https://632732125731f3db995538bb.mockapi.io/favorites', favItem)
        }

        return (
            <div className="product-block-wrapper">
                <div className="product-block">
                    {favorites.includes(id) ? (
                        <IoIosHeart
                            color="red"
                            onClick={() => onClickFav({favItem, id})}
                            className="product-block__image_favorite"
                        />
                    ) : (
                        <IoIosHeartEmpty
                            color="#777777"
                            onClick={() => onClickFav({favItem, id})}
                            className="product-block__image_favorite"
                        />
                    )}

                    <Link key={id} to={`/sneakers/${id}`}>
                        {saleImg && (
                            <img
                                className="product-block__image_sale"
                                src={saleImg}
                                alt="sale"
                            />
                        )
                        }
                        <img
                            className="product-block__image"
                            src={imageUrl}
                            alt="Sneakers"
                        />
                        <h4 className="product-block__title">{title}</h4>
                        <p className="product-block__description">{description}</p>
                    </Link>
                    <p className="product-block__selector-title">Available in:</p>
                    <div className="product-block__selector">
                        <ul>
                            {
                                sizes.map((size, i) =>
                                    <li
                                        key={i}
                                        onClick={() => setActiveSize(i)}
                                        className={activeSize === i ? 'active' : ''}>
                                        {size}
                                    </li>)
                            }
                        </ul>
                    </div>
                    <div className="product-block__bottom">
                        <div className="product-block__price">{price} $</div>
                        <button onClick={onClickAdd} className="button button--outline button--add">
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                    fill="white"
                                />
                            </svg>
                            <span>Add to cart</span>
                            {addedCount > 0 && <i>{addedCount}</i>}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
