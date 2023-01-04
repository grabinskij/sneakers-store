import { configureStore } from '@reduxjs/toolkit'
import filter from './filter/slice'
import cart from './cart/slice'
import product from './product/slice'
import favorites from './favorites/slice'
import user from './user/slice'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


const store = configureStore({
    reducer: {
        filter,
        cart,
        product,
        favorites,
        user,
        }
    })

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
