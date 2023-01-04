import {createSlice} from "@reduxjs/toolkit";

type userAuthType = {
    email: string | null
    token: string | null,
    id: number | null,
}

const getUserFromLS = () => {
    const data = localStorage.getItem('loginInfo')
    const userData = data ? JSON.parse(data) : []
    return {
        userData
    }
}
const {userData} = getUserFromLS()
const initialState: userAuthType = {
    email: userData.email,
    token: userData.token,
    id: userData.id,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action){
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id
        },
        removeUser(state){
            state.email = null;
            state.token = null;
            state.id = null
        }
    }
})


export const {setUser, removeUser} = userSlice.actions
export default userSlice.reducer