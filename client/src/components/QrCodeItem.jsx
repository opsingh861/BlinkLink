/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";

import { CiCalendar } from "react-icons/ci";
import PropTypes from "prop-types";
import QRCodeStyling from "qr-code-styling";
import { useNavigate } from "react-router-dom";
import { MdOutlineFileDownload } from "react-icons/md";


const QrCodeItem = ({ title, shortUrl, url, date, property }) => {
    const fullUrl = `https://blinklink.fun/${shortUrl}`;
    const [fileExt, setFileExt] = useState("svg");
    const ref = useRef(null);
    const navigation = useNavigate();

    const qrCode = new QRCodeStyling({ property });

    useEffect(() => {
        qrCode.append(ref.current);
    }, []);

    useEffect(() => {
        qrCode.update({
            data: fullUrl,
            width: 92,
            height: 92
        });
    }, [fullUrl, fileExt]);

    const onExtensionChange = (event) => {
        setFileExt(event.target.value);
        console.log(fileExt)
    };

    const onDownloadClick = async () => {
        if (!qrCode) return;

        // Get the current size of the QR code
        const qrCodeSize = 90;

        // Calculate the desired size for the downloaded image (e.g., 4 times the current size)
        const downloadSize = qrCodeSize * 4;

        // Update the QR code with the new size
        qrCode.update({
            width: downloadSize,
            height: downloadSize,
        });

        // Download the QR code image
        await qrCode.download({
            name: fullUrl,
            extension: fileExt,
        });

        // Reset the QR code size back to its original size (optional)
        qrCode.update({
            width: qrCodeSize,
            height: qrCodeSize,
        });
    };

    return (
        <section className="px-6 py-4 flex items-start justify-between gap-4 bg-white rounded-xl">
            <div className="h-24 w-24 border border-gray-300 flex items-center justify-center">
                <span ref={ref} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col overflow-hidden whitespace-nowrap overflow-ellipsis gap-1 flex-1">
                <h1
                    className="font-bold text-xl mb-1 capitalize cursor-pointer hover:underline"
                    onClick={() => {
                        navigation(`/qrcode/${shortUrl}`);
                    }}
                >
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
                        <CiCalendar />
                        {new Date(date).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </p>
                </div>
            </div>

            <div className="flex">
                <select onChange={onExtensionChange} value={fileExt}>
                    <option value="svg">SVG</option>
                    <option value="png">PNG</option>
                    <option value="jpeg">JPEG</option>
                    <option value="webp">WEBP</option>
                </select>
                <button className=" text-sm rounded-sm p-[2px] px-3 hover:bg-gray-300 hover:border-black/50 cursor-pointer" onClick={onDownloadClick}><MdOutlineFileDownload size={23} /></button>
            </div>
        </section>
    );
};

QrCodeItem.propTypes = {
    title: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    property: PropTypes.object.isRequired,
};

export default QrCodeItem;
