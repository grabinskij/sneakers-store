import React, {Fragment} from "react";
import {useSelector} from "react-redux";
import {ProductBlock} from '../components'
import {selectFavorites} from "../redux/favorites/selectors";
import {FavoritesEmpty} from "../components/FavoritesEmpty";
import Media from 'react-media';



const Favorites: React.FC = () => {
    const favList = []
    let getArray
        getArray = JSON.parse(localStorage.getItem('favorites') || '0')
        for (let i = 0; i < getArray.length; i++){
            let x = getArray[i]
            favList[i] = JSON.parse(localStorage.getItem('favItem' + [x]) || '')
        }

    const {favorites, status} = useSelector(selectFavorites)

    if(favorites.length === 0){
        return <FavoritesEmpty />
    }

    const favProduct = favList.map((obj: any) => <ProductBlock key={obj.id} {...obj}/> )

    const prodRowFour = favProduct.map((obj: any, index) => {
        if (index % 4 === 0)
            return (
                <div key={index} className="prodRow">
                    {favProduct[index]}
                    {favProduct[index + 1]}
                    {favProduct[index + 2]}
                    {favProduct[index + 3]}
                </div>
            )
    })
    const prodRowThree = favProduct.map((obj: any, index) => {
        if (index % 3 === 0)
            return (
                <div key={index} className="prodRow">
                    {favProduct[index]}
                    {favProduct[index + 1]}
                    {favProduct[index + 2]}
                </div>
            )
    })
    const prodRowTwo = favProduct.map((obj: any, index) => {
        if (index % 2 === 0)
            return (
                <div key={index} className="prodRow">
                    {favProduct[index]}
                    {favProduct[index + 1]}
                </div>
            )
    })


    return (
        <div className="container">
            <div className="content__wrapper">
                <h2 className="content__title">Favorites</h2>
                {
                    status === 'error' ? (
                        <div className="content__error-info">
                            <h2>Error</h2>
                            <p>Unfortunately it can't get products</p>
                        </div>
                    ) : (
                        <div>
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
                    )
                }
            </div>
        </div>
    )
}
export default Favorites