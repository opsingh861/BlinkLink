import Button from "./Button";
import InputComponent from "./InputComponent";
import ProfileCard from "./ProfileCard";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigation = useNavigate();
    return (
        <section className="flex items-center justify-end bg-white px-4 py-4 gap-4 border-b sticky top-0 z-5 h-16">
            <InputComponent
                placeholder="Search"
                className="rounded-sm bg-gray-100 text-sm w-60 px-2 py-1 focus:ring-1 focus:ring-blue-700 focus:border-transparent hover:blue-500 transition duration-200"
            />
            <Button
                label="Upgrade"
                className="bg-emerald-700 text-white rounded-sm hover:bg-emerald-600"
                onClick={() => {
                    navigation("plans");
                }}
            />
            <ProfileCard />
        </section>
    );
};

export default Navbar;
