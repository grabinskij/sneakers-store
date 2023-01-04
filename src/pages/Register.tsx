import React from 'react';
import {Link} from "react-router-dom";
import {SignUp} from "../components/SignUp";

const Register: React.FC = () => {
    return (
        <div className="login-body">
            <h2 className="login__title">Register</h2>
            <SignUp/>
            <p className="login__register">Already have an account?<Link to="/login">Sign in</Link></p>
            <Link to="/" className="button button--black login-button">
                <span>Back</span>
            </Link>
        </div>
    );
}

export default Register;