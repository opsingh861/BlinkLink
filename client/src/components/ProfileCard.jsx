import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import Divider from "./Divider";
import { FaChevronDown } from "react-icons/fa";
import PropTypes from "prop-types";
import axiosInstance from "@/lib/axiosInstance";
import { clearUser } from "@/redux/authSlice";
import { getAvatarUrl } from "@/lib/utils";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProfileCard = () => {
    const [popupOpen, setPopupOpen] = useState(false);
    const user = useSelector((state) => state.auth.user);

    const ref = useRef(null);

    const handleOutsideClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setPopupOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        user && (
            <section
                className="flex items-center justify-center gap-3 hover:bg-gray-200/50 px-2 py-1 cursor-pointer rounded-sm z-10 "
                onClick={() => setPopupOpen(!popupOpen)}
                ref={ref}
            >
                {/* user first name */}
                <div className="flex items-center gap-2 h-8 w-8">
                    <img src={getAvatarUrl(user.name)} className="" />
                </div>
                {/* user full name */}
                <p className="text-sm font-light">{user.name}</p>
                {/* dropdown icon */}
                <FaChevronDown
                    className={`text-xs transform transition-transform duration-300 ${
                        popupOpen ? "rotate-180" : ""
                    }`}
                />
                {popupOpen && <Dropdown user={user} />}
            </section>
        )
    );
};

const Dropdown = ({ className, user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        const res = confirm("Are you sure you want to sign out?");
        if (!res) return;

        try {
            const res = await axiosInstance.get("/auth/logout", {
                withCredentials: true,
            });
            console.log(res);
            dispatch(clearUser());
            navigate("/sign-in");
            toast.success("Signed out successfully");
        } catch (error) {
            toast.error("Could not sign out");
            console.log("could not sign out", error);
        }
    };

    const isPayer = user.planType !== "basic";

    return (
        <section
            className={`absolute right-2 top-16 bg-white border shadow-lg rounded-md w-80 py-1 duration-200 z-30 ${className}`}
        >
            <div className="flex flex-col gap-2 px-3 my-3">
                <div className="flex items-center gap-4">
                    <img
                        src={getAvatarUrl(user.name, 2)}
                        className="h-12 w-12"
                    />
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-semibold">{user.name}</p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                    </div>
                </div>
            </div>
            <Divider />
            <div className="flex px-3 py-3 items-start justify-between">
                <div className="flex flex-col flex-1">
                    <p className="text-base font-light">
                        {user?._id?.slice(0, 20)}
                    </p>
                    <p
                        className={
                            "text-sm " +
                            `${isPayer ? "font-semibold" : "font-light"}`
                        }
                    >
                        {isPayer ? "Premium account" : "Free account"}
                    </p>
                </div>

                {!isPayer && (
                    <p
                        className="px-1 bg-emerald-700 text-white rounded-md text-sm"
                        onClick={() => navigate("/plans")}
                    >
                        Upgrade
                    </p>
                )}
            </div>
            <Divider />
            <div className="my-1 px-3 py-2 text-base font-light hover:bg-gray-200">
                <p
                    className="text-base font-light"
                    onClick={() => navigate("/settings")}
                >
                    Settings
                </p>
            </div>
            <Divider />
            <button
                className="my-1 px-3 py-2 text-base font-light hover:bg-gray-200 w-full text-left"
                onClick={handleSignOut}
            >
                Sign Out
            </button>
        </section>
    );
};

Dropdown.propTypes = {
    className: PropTypes.string,
    user: PropTypes.object.isRequired,
};

export default ProfileCard;
