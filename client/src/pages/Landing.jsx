import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Landing = () => {
    const isAutheticated = useSelector((state) => state.auth.isAuthenticated);
    if (isAutheticated) {
        return <Navigate to="/home" />;
    }
    return (
        <>
            <Header />
            <div className="px-12 py-6">
                <HeroBanner />
            </div>
        </>
    );
};

export default Landing;
