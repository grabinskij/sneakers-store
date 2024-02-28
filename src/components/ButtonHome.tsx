import React, {FC} from "react";
import { useNavigate } from 'react-router-dom';

export const ButtonHome:FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    return (
        <button className="button-home" onClick={handleClick}>Go to Home</button>
    );
}
