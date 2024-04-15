import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigation = useNavigate();
    return (
        <section className="px-4 sm:px-4 md:px-12 lg:px-32 flex items-center justify-between sticky top-0 py-5 mx-auto w-full bg-white">
            <h1 className="text-4xl font-sans font-semibold cursor-pointer bg-gradient-to-r from-pink-700 via-orange-500 to-red-600 bg-clip-text text-transparent">
                BlinkLink
            </h1>
            <div className="flex items-center justify-center gap-4">
                <Button
                    label="Log in"
                    className="text-black rounded-md py-2 px-4 hover:text-blue-600 transition duration-200"
                    onClick={() => navigation("/sign-in")}
                />
                <Button
                    label="Sign up"
                    className="text-blue-600 rounded-md py-2 px-4"
                    onClick={() => navigation("/sign-up")}
                />
                <Button
                    label="Get a quote"
                    className="hidden sm:block bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition duration-200"
                />
            </div>
        </section>
    );
};

export default Header;
