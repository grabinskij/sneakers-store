import React from 'react';
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {Form} from "../Form";
import {useAppDispatch} from "../../redux/store";
import {setUser} from "../../redux/user/slice";
import {useNavigate} from "react-router-dom";

interface SignUpPageProps {
    isButtonVisible: boolean;
    setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignUp: React.FC<SignUpPageProps> = ({isButtonVisible, setPopupVisible}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleRegister = (email: string, password: string) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken,
                }))
                navigate('/')
            })
            .catch(console.error)
    }
    return (
        <Form
            title="Register"
            handleClick={handleRegister}
            isButtonVisible={isButtonVisible}
            setPopupVisible={setPopupVisible}
        />
    )
}
