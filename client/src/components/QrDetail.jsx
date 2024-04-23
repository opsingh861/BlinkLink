/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import Analytics from "@/pages/Analytics";
import QrCodeItem from "./QrCodeItem";
import { RiArrowGoBackFill } from "react-icons/ri";
import axiosInstance from "@/lib/axiosInstance";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

const QrDetail = () => {
    const { shortUrl } = useParams();
    const [item, setItem] = useState(null);

    const fetchLinkDetail = async () => {
        try {
            const response = await axiosInstance.get(`/qr/getQr/${shortUrl}`);
            setItem(response.data.qrCode);
            console.log(response.data.qrCode);
        } catch (error) {
            console.error(error);
            setItem(null);
        }
    };

    useEffect(() => {
        fetchLinkDetail();
    }, []);

    if (!item) {
        return <Loader />;
    }
    return (
        <section className="rounded-sm mt-10 overflow-y-auto">
            <div className="mx-auto w-11/12">
                {/* back to list */}
                <div className="flex items-center gap-2 mb-5">
                    <button
                        onClick={() => {
                            window.history.back();
                        }}
                        className="flex items-center gap-1 text-blue-700 hover:underline"
                    >
                        <RiArrowGoBackFill />
                        Back to list
                    </button>
                </div>
                <div className="mb-5">
                    <div className="flex flex-col gap-4">
                        <QrCodeItem
                            title={item.title}
                            shortUrl={item.shortUrl}
                            url={item.url}
                            date={Date.parse(item.createdAt)}
                            property={item.properties}
                        />
                    </div>
                </div>
                <Analytics />
            </div>
        </section>
    );
};

export default QrDetail;
