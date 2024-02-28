import React, {FC} from "react";
import { Link } from 'react-router-dom';

export const Terms: FC = () => {
    return (
        <div className="container">
            <div className="terms-wrapper">
                <ul className="terms-nav">
                    <li className="terms-link"><Link to="/legal-notice">Legal Notice</Link></li>
                    <li className="">|</li>
                    <li className="terms-link"><Link to="/privacy-policy">Privacy Policy</Link></li>
                </ul>
            </div>
        </div>
    );
}