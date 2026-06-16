import { Navigate, Outlet } from "react-router-dom";

const ValidarRoute = () => {
    const isSessionActive = sessionStorage.getItem('app_session_active');

    if(!isSessionActive) {
        return <Navigate to="/" replace/>
    }

    return <Outlet />
}

export default ValidarRoute;