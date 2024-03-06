import React from 'react';
import {Link} from "react-router-dom";
import {SignUp} from "../components/SignUp";

interface RegisterPageProps {
    isButtonVisible: boolean;
    setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register: React.FC<RegisterPageProps> = ({isButtonVisible, setPopupVisible}) => {
    return (
        <div className="login-body">
            <h2 className="login__title">Sign up</h2>
            <SignUp isButtonVisible={isButtonVisible} setPopupVisible={setPopupVisible}/>
            <p className="login__register">Already have an account?<Link to="/login">Sign in</Link></p>
            <Link to="/" className="button button--black login-button">
                <span>Back</span>
            </Link>
        </div>
    );
}

export default Register;