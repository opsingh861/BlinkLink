import { AiOutlineLink } from "react-icons/ai";
import Button from "./Button";
import { CiCircleCheck } from "react-icons/ci";
import InputComponent from "./InputComponent";
import { IoQrCode } from "react-icons/io5";
import PropTypes from "prop-types";
import { useState } from "react";

const Features = () => {
    const tabs = [
        {
            name: "Short Link",
            icon: <AiOutlineLink />,
        },
        {
            name: "QR Code",
            icon: <IoQrCode />,
        },
    ];

    const tabsContent = [
        {
            name: "Short Link",
            title: "Shorten a long link",
            subtitle: "Paste a long URL",
            placeholder:
                "Example: https://www.example.com/very-long-link-to-shorten",
            button: "Sign up and shorten your link",
        },
        {
            name: "QR Code",
            title: "Generate a QR Code",
            subtitle: "Enter your QR Code destination",
            placeholder: "Example: https://very-long-link.com",
            button: "Sign up and get QR Code",
        },
    ];
    const [selected, setSelected] = useState(tabs[0].name);
    return (
        <section className="flex flex-col justify-between items-center bg-gray-100/75 py-10 pb-12">
            <p className="text-xl font-bold text-center text-orange-600 tracking-wide">
                Great connections start with a click
            </p>
            <h2 className="text-2xl font-bold text-center text-gray-800 mt-4 mb-6 md:w-3/4 sm:text-2xl md:text-3xl lg:text-4xl">
                Sign up for a free account and put BlinkLink to work
            </h2>
            <div className="flex items-center">
                {tabs.map(({ name, icon }, index) => (
                    <p
                        key={index}
                        className={`flex gap-2 items-center justify-center text-lg px-6 py-3 rounded-tr-xl rounded-tl-xl transition cursor-pointer border-4
                            ${
                                selected === name
                                    ? "bg-white border-b-white z-10 duration-200"
                                    : "border-gray-100/75 hover:text-blue-500 hover:bg-slate-200 hover:border-slate-200"
                            } `}
                        onClick={() => setSelected(name)}
                    >
                        {icon}
                        {name}
                    </p>
                ))}
            </div>

            {tabsContent.map((tab, index) => {
                if (selected === tab.name) {
                    return (
                        <TabComponent
                            key={index}
                            title={tab.title}
                            subtitle={tab.subtitle}
                            placeholder={tab.placeholder}
                            button={tab.button}
                        />
                    );
                }
            })}
        </section>
    );
};

const TabComponent = ({ title, subtitle, placeholder, button }) => {
    return (
        <section className="flex flex-col items-start gap-3 w-full sm:w-full md:w-11/12 lg:w-4/5 bg-white py-5 rounded-xl px-8 border-4 -mt-1">
            <h2 className="text-3xl font-bold text-center text-gray-800">
                {title}
            </h2>
            <h2 className="text-xl font-medium text-center text-gray-800">
                {subtitle}
            </h2>
            <InputComponent
                type="text"
                placeholder={placeholder}
                className="text-base w-full py-3"
            />

            <Button
                label={button}
                className="bg-blue-600 text-white rounded-md py-3 px-4 hover:bg-blue-700 transition duration-200"
            />

            <p className="w-full text-center font-semibold text-xl text-gray-800">
                No credit card required. Your free plan includes:
            </p>

            <div className="flex gap-4 w-full justify-center">
                {["Short links", "QR Codes"].map((item, index) => (
                    <p
                        key={index}
                        className="flex text-lg items-center justify-center gap-2"
                    >
                        <CiCircleCheck size={20} className="text-blue-500" />
                        {item}
                    </p>
                ))}
            </div>
        </section>
    );
};
TabComponent.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    placeholder: PropTypes.string,
    button: PropTypes.string,
};

export default Features;
