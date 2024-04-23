import { BsQrCode } from "react-icons/bs";
import Button from "@/components/Button";
import Divider from "@/components/Divider";
import InputComponent from "@/components/InputComponent";
import { IoMdLock } from "react-icons/io";
import PropTypes from "prop-types";
import axiosInstance from "@/lib/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchQrs } from "@/redux/qrSlice";

const CreateQR = () => {
    const [destination, setDestination] = useState("");
    const [title, setTitle] = useState("");
    const [back_half, setBackHalf] = useState(undefined);
    const dispatch = useDispatch();
    return (
        <section
            className="flex overflow-y-auto bg-white"
            style={{
                height: "calc(100vh - 4rem)",
            }}
        >
            <div className="flex flex-col">
                <form
                    action=""
                    className="flex flex-col gap-6 w-4/5 mx-auto h-full mb-5"
                >
                    <h1 className="font-bold text-4xl mt-10">
                        Create a QR Code
                    </h1>
                    <p className="font-light text-sm">
                        You can create <strong>2</strong> more QR Codes this
                        month.{" "}
                        <span className="underline cursor-pointer hover:text-violet-600 hover:no-underline">
                            Upgrade for more.
                        </span>
                    </p>
                    <div className="flex flex-col gap-3">
                        <p className="text-xl font-medium">Destination URL</p>
                        <InputComponent
                            label="Destination"
                            placeholder="https://example.com/my-long-url"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="text-base"
                        />
                        <p className="font-light text-sm">
                            You can create <strong>11</strong> more links this
                            month
                        </p>
                    </div>

                    <Divider />

                    <div className="flex flex-col gap-3">
                        <p className="text-2xl font-semibold">Code details</p>
                        <p className="text-base font-semibold">
                            Title <span className="font-light">(optional)</span>
                        </p>
                        <InputComponent
                            label="Title"
                            placeholder=""
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="text-base w-full"
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="text-xl font-semibold">Short link</p>
                        <p className="text-sm font-light">
                            The short link directs users to the website or
                            content linked to your QR Code. If you update the
                            short link after creating the QR Code it will change
                            the code.
                        </p>
                        <div className="flex items-center gap-4 ">
                            <div className="flex flex-col items-start gap-2 w-1/2">
                                <p className="text-base font-medium flex gap-1 items-center">
                                    Domain
                                    <IoMdLock size={16} />
                                </p>
                                <InputComponent
                                    label="Title"
                                    placeholder=""
                                    value={"blinklink.in"}
                                    readOnly
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="text-base w-full"
                                />
                            </div>
                            <p className="mt-auto mb-3">/</p>
                            <div className="flex flex-col items-start gap-2 w-1/2">
                                <p className="text-base font-medium">
                                    Custom back-half{" "}
                                    <span className="font-light">
                                        (optional)
                                    </span>
                                </p>

                                <InputComponent
                                    label="Back-half"
                                    placeholder=""
                                    value={title}
                                    onChange={(e) => setBackHalf(e.target.value)}
                                    className="text-base w-full"
                                />
                            </div>
                        </div>
                    </div>
                </form>
                <Footer url={destination} title={title} back_half={back_half} dispatch={dispatch} />
            </div>

            <div className="w-2/5 h-full bg-cover bg-center flex-col items-center pt-20 bg-[#f4f6fa] sticky top-0 hidden lg:flex">
                <p className="text-lg font-semibold text-zinc-700 my-6">
                    Preview
                </p>

                <div className="flex items-center justify-center p-5 bg-white rounded-lg shadow-lg">
                    <BsQrCode size={152} />
                </div>
            </div>
        </section>
    );
};

const Footer = ({ url, title, backHalf, dispatch }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const properties = {
        width: 300,
        height: 300,
        data: "https://qr-code-styling.com",
        margin: 0,
        qrOptions: {
            typeNumber: "0",
            mode: "Byte",
            errorCorrectionLevel: "Q",
        },
        imageOptions: {
            hideBackgroundDots: true,
            imageSize: 1,
            margin: 0,
        },
        dotsOptions: {
            type: "square",
            color: "#6a1a4c",
            gradient: {
                type: "linear",
                rotation: 1.0471975511965976,
                colorStops: [
                    {
                        offset: 0,
                        color: "#11a213",
                    },
                    {
                        offset: 1,
                        color: "#472006",
                    },
                ],
            },
        },
        backgroundOptions: {
            color: "#422ed6",
        },
        image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD",
        dotsOptionsHelper: {
            colorType: {
                single: true,
                gradient: false,
            },
            gradient: {
                linear: true,
                radial: false,
                color1: "#6a1a4c",
                color2: "#6a1a4c",
                rotation: "0",
            },
        },
        cornersSquareOptions: {
            type: "dot",
            color: "#000000",
            gradient: {
                type: "linear",
                rotation: 0,
                colorStops: [
                    {
                        offset: 0,
                        color: "#000000",
                    },
                    {
                        offset: 1,
                        color: "#000000",
                    },
                ],
            },
        },
        cornersSquareOptionsHelper: {
            colorType: {
                single: true,
                gradient: false,
            },
            gradient: {
                linear: true,
                radial: false,
                color1: "#000000",
                color2: "#000000",
                rotation: "0",
            },
        },
        cornersDotOptions: {
            type: "dot",
            color: "#000000",
        },
        cornersDotOptionsHelper: {
            colorType: {
                single: true,
                gradient: false,
            },
            gradient: {
                linear: true,
                radial: false,
                color1: "#000000",
                color2: "#000000",
                rotation: "0",
            },
        },
        backgroundOptionsHelper: {
            colorType: {
                single: true,
                gradient: false,
            },
            gradient: {
                linear: true,
                radial: false,
                color1: "#ffffff",
                color2: "#ffffff",
                rotation: "0",
            },
        },
    };
    const createQR = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.post("/qr/create", {
                url: url,
                back_half: backHalf,
                title,
                properties,
            });
            setLoading(false);
            console.log(response.data);
            dispatch(fetchQrs());
            navigate("/qrcode");
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };
    return (
        <div
            className="flex flex-col gap-2 py-4 sticky bottom-0 w-full bg-white"
            style={{
                boxShadow: "0px -4px 10px 0px rgba(0, 0, 0, 0.1)",
            }}
        >
            <div className="flex gap-4 px-4 items-center justify-between">
                <Button
                    label="Cancel"
                    onClick={() => { }}
                    className="bg-transparent text-blue-600 mr-2 rounded-sm hover:bg-zinc-100"
                />
                <Button
                    label={loading ? "Creating" : "Create QR Code"}
                    onClick={createQR}
                    className="bg-blue-600 text-white rounded-sm hover:bg-blue-700"
                />
            </div>
        </div>
    );
};

Footer.propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    backHalf: PropTypes.string,
    dispatch: PropTypes.func,
};
export default CreateQR;
