import Button from "./Button";
import { CiCircleCheck } from "react-icons/ci";
import Divider from "./Divider";
import PropTypes from "prop-types";

const cardContent = [
    {
        title: "URL Shortener",
        description:
            " A comprehensive solution to help make every point of connection between your content and your audience more powerful.",
        featureTitle: "Popular Link Management Features",
        features: [
            "URL shortening at scale",
            "Custom links with your brand",
            "URL redirects",
            "Advanced analytics & tracking",
        ],
        button: "Get Started for Free",
        icon: "src/assets/link.svg",
    },
    {
        title: "QR Codes",
        description:
            "QR Code solutions for every customer, business and brand experience.",
        featureTitle: "Popular QR Code Features",
        features: [
            "Fully customizable QR Codes",
            "Dynamic QR Codes",
            "QR Code types & destination options",
            "Advanced analytics & tracking",
        ],
        button: "Get Started for Free",
        icon: "src/assets/qr-code.svg",
    },
];
const Connections = () => {
    return (
        <section className="flex flex-col items-center py-10">
            <h2 className="text-4xl font-bold text-center text-gray-800">
                The Bitly Connections Platform
            </h2>
            <p className="text-xl font-light text-center w-2/3 my-5">
                All the products you need to build brand connections, manage
                links and QR Codes, and connect with audiences everywhere, in a
                single unified platform.
            </p>
            <div className="flex items-stretch justify-center gap-10 flex-col lg:flex-row">
                {cardContent.map((tab, index) => {
                    return <CardComponent key={index} {...tab} />;
                })}
            </div>
        </section>
    );
};

const CardComponent = ({
    title,
    description,
    featureTitle,
    features,
    button,
    icon,
} = cardContent) => {
    return (
        <section className="flex flex-col items-start gap-3 bg-white py-5 rounded-xl px-4 border border-black sm:w-full md:max-w-96">
            <h2 className="text-2xl font-bold text-center text-gray-800 flex items-center justify-center gap-4 my-4">
                <img
                    src={icon}
                    alt="icon"
                    className="object-contain p-2 h-12"
                />
                {title}
            </h2>
            <h2 className="text-slate-600 min-h-32">{description}</h2>
            <Divider />
            <h2 className="font-semibold text-gray-800 mt-5">{featureTitle}</h2>

            <div className="flex flex-col gap-1 justify-center items-start">
                {features.map((item, index) => (
                    <p
                        key={index}
                        className="flex items-center font-light justify-center gap-2"
                    >
                        <CiCircleCheck size={20} className="text-blue-500" />
                        {item}
                    </p>
                ))}
            </div>

            <Button
                label={button}
                className="bg-blue-600 text-white rounded-md mt-4 px-4 hover:bg-blue-700 transition duration-200 w-full"
            />

            <p className="w-full font-light text-blue-600 mt-2 text-center">
                Learn More
            </p>
        </section>
    );
};
CardComponent.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    featureTitle: PropTypes.string,
    features: PropTypes.array,
    button: PropTypes.string,
    icon: PropTypes.string,
};

export default Connections;
