import {createSlice} from "@reduxjs/toolkit";
import {ProductSliceState, Status} from "./types";
import {fetchProducts} from "./asyncActions";


const initialState: ProductSliceState = {
    sneakers: [],
    status: Status.LOADING, //loading|success|error
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.status = Status.LOADING
            state.sneakers = []
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.sneakers = action.payload
            state.status = Status.SUCCESS
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.status = Status.ERROR
            state.sneakers = []
        })
    }
})


export default productSlice.reducer