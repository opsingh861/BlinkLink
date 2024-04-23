import { useDispatch, useSelector } from "react-redux";

import Divider from "@/components/Divider";
import EmptyComponent from "@/components/EmptyComponent";
import Error404 from "./Error404";
import Loader from "@/components/Loader";
import QrCodeItem from "@/components/QrCodeItem";
import { fetchQrs } from "@/redux/qrSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { qrListEmpty } from "@/lib/imagesExport";

const QrCode = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch();

    const { items, isLoading, error } = useSelector((state) => state.qrs);
    const isEmpty = items.length === 0;
    useEffect(() => {
        // Check if items are empty before fetching
        if (isEmpty) {
            dispatch(fetchQrs());
        }
    }, [dispatch, isEmpty]);

    if (isLoading) {
        // Show loading indicator while data is being fetched
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        );
    }

    if (isEmpty) {
        return (
            <EmptyComponent
                header="Connect your audience with a simple scan"
                description="
            Create a QR Code from any short link. Then edit, customize, and track your QR Codes here."
                image={qrListEmpty}
                button={{
                    label: "Create a QR Code",
                    onClick: () => {
                        navigation("create");
                    },
                }}
                scta={{ label: "Learn more" }}
            />
        );
    }

    if (error) return <Error404 />;

    return (
        <section className="rounded-sm mt-10 overflow-y-auto">
            <div className="mx-auto w-11/12">
                <div className="mb-5">
                    <h1 className="font-bold text-4xl mt-4 mb-2 sticky">
                        QR Codes
                    </h1>
                    <Divider className="mb-4" />
                    <div className="flex flex-col gap-4">
                        {items.map((item, index) => (
                            <QrCodeItem
                                key={index}
                                title={item.title}
                                shortUrl={item.shortUrl}
                                url={item.url}
                                date={Date.parse(item.createdAt)}
                                property={item.properties}
                            />
                        ))}
                    </div>
                    <div className="text-center mt-4 flex items-center justify-center">
                        <div className="inline-block w-1/12 border-b border-black"></div>
                        <p className="inline-block mx-2 font-light text-sm">
                            You&apos;ve reached the end of your QR codes
                        </p>
                        <div className="inline-block w-1/12 border-b border-black"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QrCode;
