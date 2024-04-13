import { Navigate, Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
// import { useSelector } from "react-redux";
import { useState } from "react";

export default function PrivateRoute() {
    const [open, setOpen] = useState(true);
    // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isAuthenticated = true;
    return (
        <main className="flex h-screen w-full">
            <section
                className={`overflow-y-auto border-r border-gray-300 relative min-w-16 ${
                    open ? "w-[15%]" : "w-[5%] duration-300"
                }`}
            >
                <Sidebar open={open} setOpen={setOpen} />
            </section>

            <section
                className={`h-full flex bg-[#f4f6fa]  flex-col overflow-hidden duration-300 ${
                    open ? "w-[85%]" : "w-[95%]"
                }`}
            >
                <Navbar />
                {isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" />}
            </section>
        </main>
    );
}
