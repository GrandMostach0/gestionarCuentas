import { Routes, Route } from "react-router-dom";

// páginas
import Home from "../Home";
import HomeTwo from "../Pages/HomeTwo";
import Agregar from "../Pages/Agregar";

function AppRoute() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}>
                <Route path="/HomeTwo" element={<HomeTwo />}/>
                <Route path="/Agregar" element={<Agregar />}/>
            </Route>
        </Routes>
    )
}

export default AppRoute;