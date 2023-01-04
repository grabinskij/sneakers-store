import React from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {Form} from "../Form";
import {useAppDispatch} from "../../redux/store";
import {setUser} from "../../redux/user/slice";
import {useNavigate} from "react-router-dom";


export const Login: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleLogin = (email: string, password: string) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(setUser({
                email: user.email,
                id: user.uid,
                token: user.refreshToken,
            }))
                localStorage.setItem('loginInfo', JSON.stringify(user))
                navigate("/")
            })
            .catch(() => alert("Invalid user!"))
    }
    return (
        <div>
            <Form
                title="Sign in"
                handleClick={handleLogin}
            />
        </div>
    )
}

