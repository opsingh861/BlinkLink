import Button from "@/components/Button";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const cards = [
        {
            text: "Make it short",
            cta: "Go to links",
            route: "/links",
            image: "https://via.placeholder.com/150x75",
        },
        {
            text: "Make it scannable",
            cta: "Go to QR Codes",
            route: "/qrcode",
            image: "https://via.placeholder.com/150x75",
        },
        {
            text: "Make a page",
            cta: "Go to Link-in-bio",
            route: "/link-in-bio",
            image: "https://via.placeholder.com/150x75",
        },
    ];
    return (
        <section className="bg-[#f4f6fa] w-full min-h-screen px-8 py-6">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-4xl my-5">
                    Your Connections Platform
                </h1>
                <p className="text-green-700 text-sm tracking-wide py-2 px-4 bg-green-200/60 rounded">
                    Get custom links and a complimentary domain.
                    <span className="underline font-medium">Upgrade now.</span>
                </p>
            </div>

            <div className="flex gap-5 bg-white py-6 px-4 rounded-lg">
                {cards.map(({ text, cta, route, image }, index) => (
                    <Card
                        key={index}
                        text={text}
                        cta={cta}
                        image={image}
                        index={index}
                        route={route}
                    />
                ))}
            </div>

            <div className="flex gap-5 mt-5 items-start">
                <LeftBanner />
                <RightBanner />
            </div>
        </section>
    );
};

const Card = ({ text, cta, image, index, route }) => {
    const navigation = useNavigate();

    const onClick = (route) => {
        navigation(route);
    };
    return (
        <div
            key={index}
            className="flex-1 rounded-sm px-2 py-4 flex items-center gap-4 border border-gray-200"
        >
            <div className="bg-slate-200">
                <img src={image} alt="icon" />
            </div>
            <div className="flex flex-col items-center justify-center gap-2 flex-1">
                <h1 className="font-semibold text-xl">{text}</h1>
                <Button
                    label={cta}
                    onClick={() => onClick(route)}
                    className="text-xs rounded-sm cursor-pointer"
                />
            </div>
        </div>
    );
};

const LeftBanner = () => {
    const tasks = [
        "Make a short link or QR Code.",
        "Click it, scan it, or share it.",
        "Check out Bitly Analytics.",
        "Connect your apps with Bitly",
    ];
    return (
        <div className="flex flex-1 flex-col p-5 bg-white rounded-md gap-1 items-start">
            <h2 className="text-xl font-semibold mb-4">
                Getting started with Bitly
            </h2>

            <div className="flex flex-col gap-2 w-full border border-slate-200 rounded-md p-2 overflow-y-auto max-h-60 cursor-pointer">
                {tasks.map((task, index) => (
                    <div
                        key={index}
                        className="flex gap-2 items-center py-2 px-1 hover:bg-slate-300/50 rounded-sm"
                    >
                        <div className="h-5 w-5 border border-slate-400 border-dashed rounded-full"></div>
                        <p className="text-base font-medium">{task}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const RightBanner = () => {
    return (
        <div className="flex flex-1 flex-col p-5 bg-white rounded-md gap-2 items-start">
            <div className="h-20 w-1/2 bg-slate-400"></div>
            <h2 className="text-xl font-semibold">
                Replace &apos;bit.ly&apos; with your brand.
            </h2>
            <p className="font-light">
                Get a custom domain to create links that represent you. Add your
                own short domain or choose a complimentary one when you upgrade.
            </p>

            <Button
                label="View our plans"
                onClick={() => {}}
                className="text-sm mt-2"
            />
        </div>
    );
};

Card.propTypes = {
    text: PropTypes.string.isRequired,
    cta: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    route: PropTypes.string.isRequired,
};

export default Home;
