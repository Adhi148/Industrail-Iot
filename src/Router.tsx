import { createBrowserRouter } from "react-router-dom";
import App from "./App";

const Router = createBrowserRouter
(
    [
        {
            path : '/' ,
            element : <App/>,
            children : 
            [
                {
                    path : "/",
                    element : <App/>
                }
            ]
        }
    ]
)

export default Router