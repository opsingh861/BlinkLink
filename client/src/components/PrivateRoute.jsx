import { Navigate, Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function PrivateRoute() {
    const [open, setOpen] = useState(true);
    const currentUser = true;
    return (
        <div className="flex max-h-screen overflow-hidden">
            <div
                className={`overflow-y-auto border-r border-gray-300 relative  ${
                    open ? "w-[15%] " : "w-[5%] duration-300"
                }`}
            >
                <Sidebar open={open} setOpen={setOpen} />
            </div>
            <div
                className={` min-h-screen h-screen overflow-y-auto bg-[#f4f6fa] duration-300 ${
                    open ? "w-[85%]" : "w-[95%]"
                }`}
            >
                <Navbar />
                {currentUser ? <Outlet /> : <Navigate to="/sign-in" />}
            </div>
        </div>
    );
}
