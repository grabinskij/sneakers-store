import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {FavoritesItem} from "./types";


export const postFavorites = createAsyncThunk<FavoritesItem, FavoritesItem, {rejectValue: string}>('favorites/postProductStatus',async (obj,{rejectWithValue}) => {
            const {data} = await axios.post('https://632732125731f3db995538bb.mockapi.io/favorites', obj,);
            if(!data.ok){
                return rejectWithValue("Can't add favorites. Server error!")
            }
            return data
    }
)






