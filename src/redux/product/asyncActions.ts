import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {Product, SearchProductParams} from "./types";


export const fetchProducts = createAsyncThunk<Product[], SearchProductParams>('product/fetchProductStatus', async (params) => {
    const {sortBy, order, category, search, currentPage} = params

    const {data} = await axios.get<Product[]>(`https://632732125731f3db995538bb.mockapi.io/sneakers?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`)
    return data

    }
)
