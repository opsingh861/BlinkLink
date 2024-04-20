/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "@/components/Button";
import Divider from "@/components/Divider";
import { FaSpinner } from "react-icons/fa";
import InputComponent from "@/components/InputComponent";
import PropTypes from "prop-types";
import ToggleButton from "@/components/ToggleButton";
import axiosInstance from "@/lib/axiosInstance";
import toast from "react-hot-toast";

const CreateLink = () => {
    const { shortUrl } = useParams();
    const [destination, setDestination] = useState("");
    const [title, setTitle] = useState("");
    const [backHalf, setBackHalf] = useState(undefined);
    const [isToggled, setIsToggled] = useState(false);

    const fetchLinkDetails = async () => {
        try {
            const response = await axiosInstance.get(
                `/links/getDetails/${shortUrl}`
            );

            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    useEffect(() => {
        if (shortUrl) {
            fetchLinkDetails().then((data) => {
                if (data) {
                    setDestination(data.link.url);
                    setTitle(data.link.title);
                    setBackHalf(data.link.backHalf);
                }
            });
        }
    }, [shortUrl]);

    return (
        <section
            className="flex flex-col gap-2 items-start bg-white"
            style={{
                height: "calc(100vh - 4rem)",
            }}
        >
            <div className="overflow-y-auto w-full px-4 py-2 gap-4 h-full">
                <form
                    action=""
                    className="flex flex-col gap-6 lg:w-1/2 md:w-3/4 sm:w-full mx-auto"
                >
                    <h1 className="font-bold text-4xl mt-10">Create New</h1>
                    <div className="flex flex-col gap-3">
                        <p className="text-lg font-medium">Destination</p>
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

                    <div className="flex flex-col gap-3">
                        <p className="text-lg font-medium">
                            Title <span className="font-light">(optional)</span>
                        </p>
                        <InputComponent
                            label="Title"
                            placeholder=""
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="text-base w-full"
                        />
                        <p className="flex items-center gap-4 font-light">
                            <ToggleButton
                                state={isToggled}
                                setState={setIsToggled}
                            />
                            Add UTMs to track web traffic in analytics tools
                        </p>
                    </div>

                    <Divider />
                    <div className="flex flex-col gap-2">
                        <p className="text-xl font-semibold">Ways to share</p>
                        <p className="text-base font-medium">Short link</p>
                        <div className="flex items-center gap-4 ">
                            <div className="flex flex-col items-start gap-2 w-1/2">
                                <p className="text-sm font-medium">Domain</p>
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
                                <p className="text-sm font-medium">
                                    Custom back-half{" "}
                                    <span className="font-light">
                                        (optional)
                                    </span>
                                </p>

                                <InputComponent
                                    label="Back-half"
                                    placeholder=""
                                    value={backHalf}
                                    onChange={(e) =>
                                        setBackHalf(e.target.value)
                                    }
                                    className="text-base w-full"
                                />
                            </div>
                        </div>
                        <p className="font-light text-sm">
                            You can create <span className="font-bold">5</span>{" "}
                            more custom back-halves this month
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="text-lg font-medium">
                            QR Code{" "}
                            <span className="font-light">(optional)</span>
                        </p>

                        <p className="flex items-center gap-4 font-light">
                            <ToggleButton
                                state={isToggled}
                                setState={setIsToggled}
                            />
                            Generate a QR Code to share anywhere people can scan
                            it
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="text-lg font-medium">
                            Link-in-bio
                            <span className="font-light">(optional)</span>
                        </p>

                        <p className="flex items-center gap-4 font-light">
                            <ToggleButton
                                state={isToggled}
                                setState={setIsToggled}
                            />
                            Add this link to your Link-in-bio page for people to
                            easily find
                        </p>
                    </div>
                </form>
            </div>
            <Footer url={destination} title={title} />
        </section>
    );
};

const Footer = ({ url, title, backHalf }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const createShortLink = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.post("/links/shorten", {
                url: url,
                back_half: backHalf,
                title,
            });
            setLoading(false);
            console.log(response.data);
            toast.success("Link created successfully");
            navigate("/links");
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };
    return (
        <div className="w-full flex flex-col gap-2 pb-3">
            <Divider />

            <div className="flex gap-4 px-4 items-center justify-between">
                <div className="px-4 py-2 bg-green-200/50  rounded-md">
                    <p className="text-green-700 tracking-wide font-light">
                        Upgrade for bulk upload.{" "}
                        <span className="cursor-pointer underline">
                            View plans
                        </span>
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        label="Cancel"
                        onClick={() => {}}
                        className="bg-transparent text-blue-600 mr-2 rounded-sm hover:bg-zinc-100"
                    />
                    <Button
                        label={loading ? "Creating" : "Create"}
                        onClick={createShortLink}
                        className="bg-blue-600 text-white rounded-sm hover:bg-blue-700"
                    >
                        <FaSpinner
                            className={`animate-spin ${
                                loading ? "block" : "hidden"
                            }`}
                        />
                    </Button>
                </div>
            </div>
        </div>
    );
};

Footer.defaultProps = {
    url: "",
    title: "",
    backHalf: "",
};
Footer.propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    backHalf: PropTypes.string,
};
export default CreateLink;
