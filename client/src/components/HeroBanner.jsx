import Button from "./Button";
import { useNavigate } from "react-router-dom";

const HeroBanner = () => {
    const navigation = useNavigate();
    return (
        <section className="max-w-7xl mx-auto flex justify-between gap-4 items-center">
            <div className="gap-6 flex flex-col px-6 items-start md:py-4 lg:py-16">
                <h1 className="font-extrabold text-xl md:text-4xl lg:text-6xl">
                    Build stronger digital
                    <span className="text-orange-500"> connections</span>
                </h1>
                <p className="text-xl max-w-2xl md:max-w-6xl">
                    Use our URL shortener, QR Codes, and Link-in-bio pages to
                    engage your audience and connect them to the right
                    information. Build, edit, and track everything inside the
                    BlinkLink Connections Platform.
                </p>

                <Button
                    label="Get started for free"
                    className="bg-blue-600 text-white rounded-md py-4 hover:bg-blue-700 transition duration-200 mt-4 w-full sm:w-full md:w-full lg:w-fit"
                    onClick={() => navigation("/plans")}
                />
            </div>

            <div className="hidden lg:flex items-center justify-center">
                <img src="src/assets/hero.png" />
            </div>
        </section>
    );
};

export default HeroBanner;
