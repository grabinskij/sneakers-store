import React from 'react';
import {Header} from "../components";
import {Terms} from "../components";
import {Outlet} from 'react-router-dom'

const MainLayout: React.FC = () => {
    return (
            <div className="wrapper">
                <Terms />
                <Header />
                <div className="content">
                    <Outlet />
                </div>
            </div>
        );
    }

export default MainLayout;