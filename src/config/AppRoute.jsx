import { Routes, Route } from "react-router-dom";

import ValidarRoute from "./ValidarRoute";

// páginas
import PinSeguridad from "../components/PinSeguridad";
import Home from "../Home";
import HomeTwo from "../Pages/HomeTwo";
import Agregar from "../Pages/Agregar";

function AppRoute() {
    return (
        <Routes>
            <Route path="/" element={<PinSeguridad />}/>

            <Route element={<ValidarRoute />}>
                <Route path="/dashboard" element={<Home/>}>
                    <Route path="HomeTwo" element={<HomeTwo />}/>
                    <Route path="Agregar" element={<Agregar />}/>
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRoute;