import { CiCalendar } from "react-icons/ci";
import PropTypes from "prop-types";
import { RiCursorFill } from "react-icons/ri";
import { useState } from "react";

const QrCodeItem = ({ title, shortUrl, url, date, iconUrl, clicks }) => {
    const fullUrl = `http://localhost:3000/${shortUrl}`;
    const [copySuccess, setCopySuccess] = useState(false);

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
    return (
        <section className="px-6 py-4 flex items-start justify-between gap-4 bg-white rounded-xl">
            <div className="h-20 w-20 border border-gray-300 flex items-center justify-center">
                <img
                    src={iconUrl}
                    alt="icon"
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="flex flex-col overflow-hidden whitespace-nowrap overflow-ellipsis gap-1 flex-1">
                <h1 className="font-bold text-xl mb-1 capitalize cursor-pointer hover:underline">
                    {title}
                </h1>
                <p className="font-medium text-blue-700 hover:underline">
                    <a href={fullUrl} target="_blank" rel="noopener noreferrer">
                        {fullUrl}
                    </a>
                </p>
                <p className="text-sm font-light cursor-pointer hover:underline">
                    {url}
                </p>
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

            <div>
                <p
                    className="border text-sm bg-gray-200 rounded-sm p-[2px] px-3 hover:bg-gray-300 hover:border-black/50 cursor-pointer"
                    onClick={copyToClipboard}
                >
                    {copySuccess ? "Copied" : "Copy"}
                </p>
            </div>
        </section>
    );
};

QrCodeItem.propTypes = {
    title: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    iconUrl: PropTypes.string,
    clicks: PropTypes.number.isRequired,
};

export default QrCodeItem;
