import { Outlet } from "react-router-dom"
import MyComponent from "./Components/MyComponent"

const App = () => {
    return (
        <>
            <Outlet/>
            <MyComponent />
        </>
    )
}

export default App