import Divider from "./Divider";
import { FaChevronDown } from "react-icons/fa";
import PropTypes from "prop-types";
import { getAvatarUrl } from "@/lib/utils";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/redux/authSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/lib/axiosInstance";

const ProfileCard = () => {
    const [open, setOpen] = useState(false);
    const user = useSelector((state) => state.auth.user);
    return (user &&
        <section
            className="flex items-center justify-center gap-3 hover:bg-gray-200/50 px-2 py-1 cursor-pointer rounded-sm"
            onClick={() => setOpen(!open)}
        >
            {/* user first name */}
            <div className="flex items-center gap-2 h-8 w-8">
                <img src={getAvatarUrl(user.name)} className="" />
            </div>
            {/* user full name */}
            <p className="text-sm font-light">{user.name}</p>
            {/* dropdown icon */}
            <FaChevronDown className="text-xs" />
            {open && <Dropdown user={user} />}
        </section>
    );
};

const Dropdown = ({ className, user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSignOut = async () => {
        try {
            const res = await axiosInstance.get("/auth/logout", {
                withCredentials: true,
            });
            console.log(res);
            dispatch(clearUser());
            navigate("/sign-in");
        }
        catch (error) {
            console.log("could not sign out", error);
        }
    };
    return (
        <section
            className={`absolute right-2 top-16 bg-white border shadow-lg rounded-md w-80 py-1 duration-200 ${className}`}
        >
            <div className="flex flex-col gap-2 px-3 my-3">
                <div className="flex items-center gap-4">
                    <img
                        src={getAvatarUrl(user.name, 2)}
                        className="h-12 w-12"
                    />
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-semibold">{user.name}</p>
                        <p className="text-sm text-slate-500">
                            {user.email}
                        </p>
                    </div>
                </div>
            </div>
            <Divider />
            <div className="flex px-3 py-3 items-start">
                <div className="flex flex-col flex-1">
                    <p className="text-base font-light">o_7vckgpcnnm</p>
                    <p className="text-sm font-light">Free account</p>
                </div>

                <p className="px-1 bg-emerald-700 text-white rounded-md text-sm">
                    Upgrade
                </p>
            </div>
            <Divider />
            <div className="my-1 px-3 py-2 text-base font-light hover:bg-gray-200">
                <p className="text-base font-light">Settings</p>
            </div>
            <Divider />
            {/* <p className="my-1 px-3 py-2 text-base font-light hover:bg-gray-200">
                <button onClick={handleSignOut}>
                    Sign Out
                </button>
            </p> */}
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
};

export default ProfileCard;
