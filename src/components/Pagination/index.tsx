import React, {useEffect, useState} from 'react';
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss"
import axios from "axios";
import {useNavigate} from "react-router-dom";


type PaginationProps = {
    currentPage: number
    onChangePage: (page: number) => void
}
export const Pagination:React.FC<PaginationProps> = ({currentPage, onChangePage}) => {
    const navigate = useNavigate()
    const numItems = 8
    const [product, setProduct] = useState(0)


    useEffect(() => {
        async function fetchProduct(){
            try{
                const {data} = await axios.get('https://632732125731f3db995538bb.mockapi.io/sneakers/')
                const pageCount = Math.ceil(data.length / numItems);
                setProduct(pageCount)
            }catch (error){
                alert("Error by getting sneakers!")
                navigate('/')
            }
        }
        fetchProduct()
    }, [])

    return (
            <ReactPaginate
                className={styles.root}
                breakLabel="..."
                nextLabel=">"
                onPageChange={event => onChangePage(event.selected + 1)}
                pageRangeDisplayed={4}
                pageCount={product}
                // forcePage={currentPage - 1}
                previousLabel="<"
                // renderOnZeroPageCount={null}
            />
        );
    }

