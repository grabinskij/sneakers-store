import React from 'react';
import {Link} from "react-router-dom";
import {Login} from "../components/Login"

interface LoginPageProps {
    isButtonVisible: boolean;
    setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginPage: React.FC<LoginPageProps> = ({ isButtonVisible, setPopupVisible}) => {
    return (
            <div className="login-body">
                <h2 className="login__title">Sign in</h2>
                <Login isButtonVisible={isButtonVisible} setPopupVisible={setPopupVisible}/>
                <p className="login__register">Don't have an account?<Link to="/register"> Register now</Link></p>
                <Link to="/" className="button button--black login-button">
                    <span>Back</span>
                </Link>
            </div>
    );
}


export default LoginPage;