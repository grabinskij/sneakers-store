import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Status} from "../product/types";
import {FavoritesSliceState} from "./types";
import {getFavoritesFromLS} from "../../utils/getFavoritesFromLS";


let favorites = getFavoritesFromLS()


const initialState: FavoritesSliceState = {
    favorites,
    favItem: [],
    status: Status.LOADING, //loading|success|error
}


const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFav(state, action: PayloadAction<any>) {
            let array = state.favorites
            let addArray = true
            array.map((item: any, key: number) => {
                if (item === action.payload.id) {
                    array.splice(key, 1)
                    addArray = false
                }
            })
            if (addArray) {
                array.push(action.payload.id)
            }
            state.favorites = ([...array])

            localStorage.setItem('favorites', JSON.stringify(state.favorites))
            let storage = localStorage.getItem('favItem' + (action.payload.uid) || '0')
            if (storage == null) {
                localStorage.setItem('favItem' + (action.payload.id), JSON.stringify(action.payload.favItem))
            } else {
                localStorage.removeItem('favItem' + (action.payload.id))
            }
        },
    },
})

export const {addFav} = favoritesSlice.actions
export default favoritesSlice.reducer
