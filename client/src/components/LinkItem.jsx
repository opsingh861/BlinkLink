import Button from "./Button";
import { CiCalendar } from "react-icons/ci";
import { Cross1Icon } from "@radix-ui/react-icons";
import { FaTrash } from "react-icons/fa";
import InputComponent from "./InputComponent";
import { IoIosCopy } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import ModalLayout from "@/layouts/ModalLayout";
import PropTypes from "prop-types";
import { RiCursorFill } from "react-icons/ri";
import axiosInstance from "@/lib/axiosInstance";
import { fetchLinks } from "@/redux/linksSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LinkItem = ({
    title,
    shortUrl,
    url,
    date,
    iconUrl,
    clicks,
    navigate = true,
}) => {
    const fullUrl = `http://localhost:3000/${shortUrl}`;
    const [copySuccess, setCopySuccess] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const navigation = useNavigate();
    const dispatch = useDispatch();

    const copyToClipboard = () => {
        navigator.clipboard
            .writeText(fullUrl)

            .then(() => {
                setCopySuccess(true);
                setTimeout(() => {
                    setCopySuccess(false);
                }, 2000);
            })
            .catch((error) => {
                console.error("Failed to copy URL to clipboard:", error);
            });
    };

    const deleteLink = () => {
        axiosInstance
            .delete(`/links/${shortUrl}`)
            .then(() => {
                dispatch(fetchLinks());
                toast.success("Link deleted successfully");
            })
            .catch((error) => {
                console.error("Failed to delete link:", error);
                toast.error("Failed to delete link");
            });
    };

    const handleEdit = () => {
        setShowEditModal(true);
    };

    const handleSave = () => {
        const url = `/links/${shortUrl}`;

        axiosInstance
            .put(url, {
                title: newTitle,
            })
            .then(() => {
                setShowEditModal(false);
                toast.success("Link updated successfully");
                dispatch(fetchLinks());
            })
            .catch((error) => {
                console.error("Failed to update link:", error);
                toast.error("Failed to update link");
            });
    };
    return (
        <section className="px-6 py-4 flex items-start justify-between gap-4 bg-white rounded-xl">
            <div className="h-12 w-12 rounded-full border border-gray-300 flex items-center justify-center">
                <img
                    src={iconUrl}
                    alt="icon"
                    className="h-8 w-8 object-cover"
                />
            </div>

            <div className="flex flex-col overflow-hidden whitespace-nowrap overflow-ellipsis gap-1 flex-1">
                <h1
                    className={`font-bold text-xl mb-1 capitalize ${
                        navigate ? "hover:underline cursor-pointer" : ""
                    }`}
                    onClick={() => navigate && navigation(`/links/${shortUrl}`)}
                >
                    {title}
                </h1>
                <p className="font-medium text-blue-700 hover:underline">
                    <a href={fullUrl} target="_blank" rel="noopener noreferrer">
                        {fullUrl}
                    </a>
                </p>
                <p className="text-sm font-light cursor-pointer">{url}</p>
                <div className="flex font-normal mt-2 text-sm space-x-4">
                    <p className="flex items-center gap-1">
                        <RiCursorFill />
                        Clicks: {clicks}
                    </p>
                    <p className="flex items-center gap-1">
                        <CiCalendar />
                        {new Date(date).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </p>
                </div>
            </div>

            <div className="flex gap-2 items-center">
                <p
                    className="border flex gap-1 items-center text-sm bg-gray-100 rounded-sm py-1 px-3 hover:border-gray-400 cursor-pointer"
                    onClick={handleEdit}
                >
                    <MdEdit />
                    Edit
                </p>
                <p
                    className="border flex gap-1 items-center text-sm bg-gray-100 rounded-sm py-1 px-3 hover:border-gray-400 cursor-pointer"
                    onClick={copyToClipboard}
                >
                    <IoIosCopy />

                    {copySuccess ? "Copied" : "Copy"}
                </p>
                <p
                    className="border flex gap-1 items-center text-sm bg-gray-100 rounded-sm py-1 px-3 hover:border-gray-400 cursor-pointer"
                    onClick={deleteLink}
                >
                    <FaTrash size={12} />
                    Delete
                </p>
            </div>
            {showEditModal && (
                <ModalLayout>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-bold">Edit Link</h1>
                            <button onClick={() => setShowEditModal(false)}>
                                <Cross1Icon />
                            </button>
                        </div>
                        <label className="flex flex-col gap-2">
                            <span className="font-semibold">Title</span>
                            <InputComponent
                                type="text"
                                placeholder="Title"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                            />
                        </label>
                        <div className="flex items-center gap-4 ">
                            <div className="flex flex-col items-start gap-2 w-1/2">
                                <p className="font-medium">Domain</p>
                                <InputComponent
                                    label="Title"
                                    placeholder=""
                                    value={"blinklink.in"}
                                    readOnly
                                    className="text-base w-full"
                                />
                            </div>
                            <p className="mt-auto mb-3">/</p>
                            <div className="flex flex-col items-start gap-2 w-1/2">
                                <p className="font-medium">
                                    Custom back-half{" "}
                                    <span className="font-light">
                                        (optional)
                                    </span>
                                </p>

                                <InputComponent
                                    label="Back-half"
                                    placeholder=""
                                    className="text-base w-full"
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                onClick={() => setShowEditModal(false)}
                                label="Cancel"
                                className="rounded-sm hover:bg-gray-100 border"
                            />
                            <Button
                                label={"Save"}
                                className="bg-blue-600 text-white rounded-sm hover:bg-blue-700"
                                onClick={handleSave}
                            />
                        </div>
                    </div>
                </ModalLayout>
            )}
        </section>
    );
};

LinkItem.propTypes = {
    title: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    iconUrl: PropTypes.string,
    clicks: PropTypes.number.isRequired,
    navigate: PropTypes.bool,
};

export default LinkItem;
