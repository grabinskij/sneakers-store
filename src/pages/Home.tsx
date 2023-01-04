import React, {useCallback, useEffect, Fragment} from "react";
import {useSelector} from "react-redux";
import {Categories, Sort, Skeleton, ProductBlock, Pagination, CarouselBox} from '../components'
import {useAppDispatch} from "../redux/store";
import {selectFilter} from "../redux/filter/selectors";
import {setCategoryId, setCurrentPage} from "../redux/filter/slice";
import {selectProductData} from "../redux/product/selectors";
import {fetchProducts} from "../redux/product/asyncActions";
import Media from 'react-media';



const Home: React.FC = () => {
    const dispatch = useAppDispatch()
    const {sneakers, status} = useSelector(selectProductData)
    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter)
    // const [itemsPerRow, setItemsPerRow] = React.useState([]);

    const onChangeCategory = useCallback((idx: number) => {
        dispatch(setCategoryId(idx))
    }, [])

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
    }
    const getProducts = async () => {

        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(
            fetchProducts({
                sortBy,
                order,
                category,
                search,
                currentPage: String(currentPage),
            })
        )
        window.scrollTo(0, 0)
    }

    useEffect(() => {
        getProducts()
    }, [categoryId, sort.sortProperty, searchValue, currentPage])


    const products = sneakers.map((obj: any) => (<ProductBlock key={obj.id} {...obj} />))

   const prodRowFour = products.map((obj: any, index) => {
        if (index % 4 === 0)
            return (
                <div key={index} className="prodRow">
                    {products[index]}
                    {products[index + 1]}
                    {products[index + 2]}
                    {products[index + 3]}
                </div>
            )
    })
    const prodRowThree = products.map((obj: any, index) => {
        if (index % 3 === 0)
            return (
                <div key={index} className="prodRow">
                    {products[index]}
                    {products[index + 1]}
                    {products[index + 2]}
                </div>
            )
    })
    const prodRowTwo = products.map((obj: any, index) => {
        if (index % 2 === 0)
            return (
                <div key={index} className="prodRow">
                    {products[index]}
                    {products[index + 1]}
                </div>
            )
    })

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    return (
        <div className="container">
            <div className="content__wrapper">
                <div className="content__top">
                    <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                    <Sort value={sort}/>
                </div>
                <h2 className="content__title">Sneakerx</h2>
                <CarouselBox/>
                {
                    status === 'error' ? (
                        <div className="content__error-info">
                            <h2>Error</h2>
                            <p>Unfortunately it can't get products</p>
                        </div>
                    ) : (
                        <div className="content__items">
                            {status === 'loading'
                                ? skeletons
                                :
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
                            }
                        </div>
                    )
                }
            </div>
            <div className="pagWrapper">
                <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
            </div>
        </div>
    )
}
export default Home

