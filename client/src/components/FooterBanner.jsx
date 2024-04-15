import Button from "./Button";
import { useNavigate } from "react-router-dom";

const FooterBanner = () => {
    const navigation = useNavigate();
    return (
        <section className="flex flex-col gap-4 items-center pt-14 pb-20 bg-blue-950">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-center text-white tracking-wide">
                More than a free link shortener
            </h2>
            <Button
                label="Get Started"
                className="bg-blue-600 text-white text-lg px-4 py-4 md:py-2 md:text-base lg:py-4 lg:text-lg rounded-md mt-4 hover:bg-blue-700"
                onClick={() => navigation("/plans")}
            />
        </section>
    );
};

export default FooterBanner;
