import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getCartFromLS} from "../../utils/getCartFromLS";
import {CartItem, CartSliceState} from "./types";
import {calcTotalPrice} from "../../utils/calcTotalPrice";


let {items, totalPrice} = getCartFromLS()

const initialState:CartSliceState = {
    totalPrice,
    items
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>){
            const findItem = state.items.find((obj) => obj.id === action.payload.id && obj.size === action.payload.size)
            if(findItem){
                findItem.count++
            }else{
                state.items.push({
                    ...action.payload,
                    count : 1
                })
            }
            state.totalPrice = calcTotalPrice(state.items)
        },
        minusItem(state: CartSliceState,action: PayloadAction<CartItem>){
            const findItem = state.items.find((obj) => obj.id === action.payload.id && obj.size === action.payload.size)
            if(findItem){
                findItem.count--
                state.totalPrice -= findItem.price
            }
        },
        removeItem(state: CartSliceState, action: PayloadAction<CartItem>){
            const findItem = state.items.find((obj) => obj.id === action.payload.id && obj.size === action.payload.size)
            // @ts-ignore
            state.totalPrice -= findItem.price * findItem.count
            state.items = state.items.filter(obj => {
                return ((obj.id !== action.payload.id) ||
                    (obj.size !== action.payload.size))
            })
        },
        clearItems(state: CartSliceState){
            state.items = []
            state.totalPrice = 0
        },
    }
})


export const {addItem, removeItem, minusItem, clearItems} = cartSlice.actions
export default cartSlice.reducer