import React from 'react';
import {Link} from "react-router-dom";
import {Login} from "../components/Login"

const LoginPage: React.FC = () => {
    return (
            <div className="login-body">
                <h2 className="login__title">Login</h2>
                <Login/>
                <p className="login__register">Don't have an account?<Link to="/register"> Register now</Link></p>
                <Link to="/" className="button button--black login-button">
                    <span>Back</span>
                </Link>
            </div>
    );
}


export default LoginPage;