import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {addItem} from "../redux/cart/slice";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {selectFavorites} from "../redux/favorites/selectors";
import {IoIosHeart, IoIosHeartEmpty} from "react-icons/io";
import {FavoritesItem} from "../redux/favorites/types";
import {addFav} from "../redux/favorites/slice";


const FullProduct: React.FC = () => {
    const [product, setProduct] = useState<{
        id: number;
        imageUrl: string;
        title: string;
        price: number;
        description: string;
        saleImg: string
        size: number;
        sizes: number[];
    }>()
    const dispatch = useDispatch()

    let {id} = useParams()
    const cartItem = useSelector((state: any) =>
        state.cart.items.filter((obj: { id: string }) => obj.id === id)
    )

    const navigate = useNavigate()
    const [activeSize, setActiveSize] = useState(0)
    const {favorites} = useSelector(selectFavorites)


    useEffect(() => {
        async function fetchProduct() {
            try {
                const {data} = await axios.get('https://632732125731f3db995538bb.mockapi.io/sneakers/' + id)
                setProduct(data)
            } catch (error) {
                alert("Error by getting sneakers!")
                navigate('/')
            }
        }

        fetchProduct()
    }, [])

    if (!product) {
        return <>"...Downloading"</>
    }

    const addedCount = cartItem.reduce((sum: number, item: any) => sum + item.count, 0);

    const favItem: FavoritesItem = {
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        saleImg: product.saleImg,
        imageUrl: product.imageUrl,
        sizes: product.sizes,
        count: 0,
    }
    const onClickFav = ({favItem, id}: { favItem: FavoritesItem; id: number }) => {
        dispatch(addFav({favItem, id}))
        axios.post('https://632732125731f3db995538bb.mockapi.io/favorites', favItem)
    }
    const item = {
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        saleImg: product.saleImg,
        imageUrl: product.imageUrl,
        size: product.sizes[activeSize],
        count: 0,

    }
    const onClickAdd = () => {
        dispatch(addItem(item))
        axios.post('https://632732125731f3db995538bb.mockapi.io/cart', item)
    }

    return (
        <div className='container'>
            <div className="full-wrapper">
                <div className="full__block">
                    <div className="full__block-product">
                        {product.saleImg && (
                            <img
                                className="full__block-sale"
                                src={product.saleImg}
                                alt="sale"
                            />
                        )
                        }
                        {favorites.includes(favItem.id) ? (
                            <IoIosHeart
                                color="red"
                                onClick={() => onClickFav({favItem, id: favItem.id})}
                                className="product-block__image_favorite"
                            />
                        ) : (
                            <IoIosHeartEmpty
                                color="#777777"
                                onClick={() => onClickFav({favItem, id: favItem.id})}
                                className="product-block__image_favorite"
                            />
                        )}
                        <img className="product-block__image" src={product.imageUrl} alt="Sneakers"/>
                    </div>
                    <div className="product-block__selector full-selector" style={{height: "auto", opacity: "1"}}>
                        <ul>
                            {
                                product.sizes.map((size, i) =>
                                    <li
                                        key={i}
                                        onClick={() => setActiveSize(i)}
                                        className={activeSize === i ? 'active' : ''}>
                                        {size}
                                    </li>)
                            }
                        </ul>
                    </div>
                    <div className="full__block-price">
                        <h4>{product.price} $</h4>
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
                <div className="full__description">
                    <h2><span>{product.title}</span></h2>
                    <p>{product.description} lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Consectetur adipiscing elit duis tristique.
                        Nec feugiat nisl pretium fusce id velit ut tortor pretium. Pellentesque eu tincidunt tortor
                        aliquam nulla facilisi. Auctor elit sed vulputate mi sit amet mauris commodo quis. Arcu non
                        sodales neque sodales ut. Bibendum est ultricies integer quis auctor elit. Adipiscing at in
                        tellus integer feugiat scelerisque. Auctor augue mauris augue neque gravida in fermentum. Cras
                        fermentum odio eu feugiat pretium nibh ipsum consequat. Massa sapien faucibus et molestie ac
                        feugiat sed lectus. Pharetra sit amet aliquam id diam maecenas ultricies mi eget.
                        Suspendisse faucibus interdum posuere lorem. Tincidunt lobortis feugiat vivamus at. Ante metus
                        dictum at tempor commodo ullamcorper. Tristique sollicitudin nibh sit amet commodo nulla
                        facilisi nullam vehicula. Aliquam vestibulum morbi blandit cursus. Pellentesque adipiscing
                        commodo elit at imperdiet dui accumsan sit amet. Sed viverra tellus in hac habitasse. Bibendum
                        arcu vitae elementum curabitur vitae nunc sed velit dignissim. Enim facilisis gravida neque
                        convallis a cras semper auctor. Nec nam aliquam sem et tortor consequat id. Nulla aliquet
                        porttitor lacus luctus. Congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque
                        pulvinar. Pulvinar mattis nunc sed blandit libero volutpat sed cras ornare.</p>
                    <div className="full-back">
                        <Link to='/'>
                            <button className="button button--outline button--add go-back-btn full-button">
                                <span>Back</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FullProduct;