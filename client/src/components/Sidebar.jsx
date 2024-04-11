import { AiOutlineLink } from "react-icons/ai";
import Button from "./Button";
import { CiSettings } from "react-icons/ci";
import Divider from "./Divider";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { IoQrCode } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { MdOutlineAddLink } from "react-icons/md";
import { MdOutlineCampaign } from "react-icons/md";
import PropTypes from "prop-types";
import { RiProfileLine } from "react-icons/ri";
import { SiSimpleanalytics } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Sidebar = ({ open, setOpen }) => {
    const labels = [
        {
            label: "Home",
            route: "/home",
            icon: <FaHome />,
        },
        {
            label: "Links",
            route: "/links",
            icon: <AiOutlineLink />,
        },
        {
            label: "QR Codes",
            route: "/qrcode",
            icon: <IoQrCode />,
        },
        {
            label: "Link-in-bio",
            route: "/link-in-bio",
            icon: <RiProfileLine />,
        },
        {
            label: "Analytics",
            route: "/analytics",
            icon: <SiSimpleanalytics />,
        },
        {
            label: "Campaigns",
            route: "/campaigns",
            icon: <MdOutlineCampaign />,
        },
        {
            label: "Custom links",
            route: "/custom-links",
            icon: <MdOutlineAddLink />,
        },
    ];
    const [openPopup, setOpenPopup] = useState(!open);
    return (
        <section className="px-4 w-ful bg-white h-full relative overflow-hidden">
            <div
                className={`fixed mt-4  bg-white border border-gray-400/50 shadow-xl p-2 rounded-full z-10 cursor-pointer ${open ? "ml-[12.5%]" : "ml-10 duration-300"
                    }`}
                onClick={() => setOpen(!open)}
            >
                {open ? (
                    <FaChevronLeft className="hover:text-gray-700 duration-300" />
                ) : (
                    <FaChevronRight className="hover:text-gray-700 duration-300" />
                )}
            </div>
            <p className="text-orange-600 my-4 font-serif font-medium text-2xl">
                {open ? "BlinkLink" : "B."}
            </p>

            {openPopup && (
                <CreateNewPopup
                    open={openPopup}
                    setOpen={setOpenPopup}
                    sideBarOpen={open}
                />
            )}

            {open ? (
                <Button
                    label="Create New"
                    onClick={() => setOpenPopup(!openPopup)}
                    className="w-full bg-blue-600 text-white rounded-sm hover:bg-blue-700"
                />
            ) : (
                <div
                    className="w-full flex justify-center items-center bg-blue-700 p-3 py-2 rounded-sm cursor-pointer shadow-lg"
                    onClick={() => setOpenPopup(!openPopup)}
                >
                    <MdAdd className="text-white text-xl" />
                </div>
            )}

            <Divider className="mt-4 mb-2" />
            <div className="flex flex-col items-start gap-4">
                {labels.map((item, index) => (
                    <Item key={index} item={item} open={open} />
                ))}
            </div>

            <Divider className="my-2" />

            <Item
                item={{
                    label: "Settings",
                    route: "/settings",
                    icon: <CiSettings />,
                }}
                open={open}
                className="my-2"
            />
        </section>
    );
};

const Item = ({ item = {}, className = "", open = false }) => {
    const { label, icon, route } = item;
    const navigation = useNavigate();
    const pathname = window.location.pathname;
    const isSelected = pathname === route;

    const handleClick = () => {
        if (route) {
            navigation(route);
        }
    };

    return (
        <div
            className={`hover:bg-gray-200/70 w-full py-2 flex items-center gap-2
        rounded-sm px-3 cursor-pointer relative ${className} ${isSelected ? "bg-blue-100 text-blue-700" : ""
                }`}
            onClick={handleClick}
        >
            {isSelected && (
                <div className="w-1 h-5 bg-blue-500 rounded-full absolute left-0"></div>
            )}
            <div className="text-lg">{icon}</div>
            {open && <p className="ml-2">{label}</p>}
        </div>
    );
};

const CreateNewPopup = ({ open, setOpen, sideBarOpen }) => {
    return (
        <div
            className={`fixed bg-white border w-40 border-gray-300/50 shadow-xl px-1 z-10  rounded-md cursor-pointer ${sideBarOpen ? "ml-[14%]" : "ml-14"
                } `}
            onClick={() => setOpen(!open)}
        >
            <Item
                item={{
                    label: "Link",
                    route: "/links/create",
                    icon: <AiOutlineLink />,
                }}
                open={open}
                className="my-2"
            />
            <Item
                item={{
                    label: "QR Code",
                    route: "/qrcode/create",
                    icon: <IoQrCode />,
                }}
                open={open}
                className="my-2"
            />
        </div>
    );
};

Item.propTypes = {
    className: PropTypes.string,
    open: PropTypes.bool,
    item: PropTypes.object,
};

Sidebar.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
};

CreateNewPopup.propTypes = {
    open: PropTypes.bool.isRequired,
    sideBarOpen: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
};

export default Sidebar;
