import { BsStars } from "react-icons/bs";
import Button from "@/components/Button";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const cards = [
        {
            text: "Make it short",
            cta: "Go to links",
            route: "/links",
            image: "src/assets/links.png",
        },
        {
            text: "Make it scannable",
            cta: "Go to QR Codes",
            route: "/qrcode",
            image: "src/assets/qrcode.png",
        },
        {
            text: "Make a page",
            cta: "Go to Link-in-bio",
            route: "/link-in-bio",
            image: "src/assets/link-in-bio.png",
        },
    ];
    return (
        <section className="bg-[#f4f6fa] w-full h-full px-8 py-6 overflow-y-auto">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-4xl my-5">
                    Your Connections Platform
                </h1>
                <p className="text-emerald-600 text-sm tracking-wide py-2 px-4 bg-green-200/50 rounded-sm flex items-center justify-center gap-1.5">
                    <BsStars />
                    Get custom links and a complimentary domain.
                    <span className="underline">Upgrade now.</span>
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
            className="flex-1 rounded-sm flex items-center gap-4 border border-gray-200"
        >
            <div className="bg-blue-200/30 w-40 flex items-center justify-center">
                <img src={image} alt="icon" className="object-contain p-2" />
            </div>
            <div className="flex flex-col items-center justify-center gap-2 flex-1">
                <h1 className="font-semibold text-lg">{text}</h1>
                <Button
                    label={cta}
                    onClick={() => onClick(route)}
                    className="text-xs font-medium rounded-sm cursor-pointer text-blue-500 border border-blue-500 hover:bg-blue-500/20"
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
            <img
                src="src/assets/links-promotion.png"
                className="object-contain w-full h-40"
            />
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
                className="text-sm mt-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700"
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
