
import { Outlet, useLocation } from "react-router-dom"
import Menubar from "./Components/Menu-bar/Menubar"
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import "./App.css"
import Header from "./Components/Header/Header";

const App = () => {

    const location = useLocation();
    
    return (
        <>
            <Header/>
            <Menubar />
            <TransitionGroup component={null}>
                <CSSTransition
                    key = { location.pathname }
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
    )
}

export default App