import Divider from "./Divider";
import { FaChevronDown } from "react-icons/fa";
import PropTypes from "prop-types";
import { getAvatarUrl } from "@/lib/utils";
import { useState } from "react";

const ProfileCard = () => {
    const [open, setOpen] = useState(false);

    return (
        <section
            className="flex items-center justify-center gap-3 hover:bg-gray-200/50 px-2 py-1 cursor-pointer rounded-sm"
            onClick={() => setOpen(!open)}
        >
            {/* user first name */}
            <div className="flex items-center gap-2 h-8 w-8">
                <img src={getAvatarUrl("Rohit")} className="" />
            </div>
            {/* user full name */}
            <p className="text-sm font-light">Rohit Kumar</p>
            {/* dropdown icon */}
            <FaChevronDown className="text-xs" />
            {open && <Dropdown />}
        </section>
    );
};

const Dropdown = ({ className }) => {
    return (
        <section
            className={`absolute right-2 top-16 bg-white border shadow-lg rounded-md w-80 py-1 duration-200 ${className}`}
        >
            <div className="flex flex-col gap-2 px-3 my-3">
                <div className="flex items-center gap-4">
                    <img
                        src={getAvatarUrl("Rohit Kumar", 2)}
                        className="h-12 w-12"
                    />
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-semibold">Rohit Kumar</p>
                        <p className="text-sm text-slate-500">
                            rk212300@gmail.com
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
            <p className="my-1 px-3 py-2 text-base font-light hover:bg-gray-200">
                Sign out
            </p>
        </section>
    );
};

Dropdown.propTypes = {
    className: PropTypes.string,
};

export default ProfileCard;
