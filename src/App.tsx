import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Menubar from "./Components/Menu-bar/Menubar";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import "./App.css";
import Header from "./Components/Header/Header";
import { useEffect } from "react";

const App = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            navigate('/dashboard');
        }
    }, [navigate]);

    useEffect(() => {
        let lastActivity = Date.now();

        const checkActivity = () => {
            const now = Date.now();
            if (now - lastActivity > 600000) {
                localStorage.clear();
            }
        };

        const handleActivity = () => {
            lastActivity = Date.now();
        };

        window.addEventListener('click', handleActivity);
        window.addEventListener('keydown', handleActivity);
        window.addEventListener('mousemove', handleActivity);

        const intervalId = setInterval(checkActivity, 60000); 

        return () => {
            window.removeEventListener('click', handleActivity);
            window.removeEventListener('keydown', handleActivity);
            window.removeEventListener('mousemove', handleActivity);
            clearInterval(intervalId);
        };
    }, []);

    return (
        <>
            <Header />
            <Menubar />
            <TransitionGroup component={null}>
                <CSSTransition
                    key={location.pathname}
                    classNames={{
                        enter: 'page-enter',
                        exit: 'page-exit',
                    }}
                    timeout={500}
                >
                    <Outlet />
                </CSSTransition>
            </TransitionGroup>
        </>
    );
};

export default App;
