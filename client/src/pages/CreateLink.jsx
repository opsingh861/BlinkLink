import Button from "@/components/Button";
import Divider from "@/components/Divider";
import InputComponent from "@/components/CustomInput";
import ToggleButton from "@/components/ToggleButton";
import { useState } from "react";

const CreateLink = () => {
    const [destination, setDestination] = useState("");
    const [title, setTitle] = useState("");
    const [isToggled, setIsToggled] = useState(false);

    return (
        <section className="flex flex-col  gap-2 items-start py-2 ">
            <div className="overflow-y-auto w-full">
                <form
                    action=""
                    className="flex flex-col gap-6 w-1/2 mx-auto h-[90vh] "
                >
                    <h1 className="font-bold text-4xl">Create New</h1>
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
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="text-base w-full"
                                />
                            </div>
                            <p className="mt-auto mb-3">/</p>
                            <div className="flex flex-col items-start gap-2 w-1/2">
                                <p className="text-sm font-medium">
                                    Custom back-half (optional)
                                </p>

                                <InputComponent
                                    label="Title"
                                    placeholder=""
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="text-base w-full"
                                />
                            </div>
                        </div>
                        <p className="font-light text-sm">
                            You can create <strong>5</strong> more custom
                            back-halves this month
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
            <Footer />
        </section>
    );
};

const Footer = () => {
    return (
        <div className="w-full flex flex-col gap-2">
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
                <div className="">
                    <Button
                        label="Cancel"
                        onClick={() => {}}
                        className="bg-transparent text-blue-600 mr-2 rounded-sm hover:bg-zinc-300"
                    />
                    <Button
                        label="Create"
                        onClick={() => {}}
                        className="bg-blue-600 text-white rounded-sm hover:bg-blue-700"
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateLink;
