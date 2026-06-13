import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";

function Home() {
    return (
        <div className="flex min-h-screen items-stretch bg-white">
            <SideBar />
            <main className="flex-1 border-2 p-8">
                <Outlet />
            </main>
        </div>
    )
}

export default Home;