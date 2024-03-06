import React from 'react';

interface OverlayProps {
    show: boolean;
}

export const Overlay:React.FC<OverlayProps> = ({ show }) => {

    return <div className={`overlay ${show ? 'visible' : ''}`}/>;
}

