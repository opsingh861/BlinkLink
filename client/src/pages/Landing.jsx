import BannerAd from "@/components/BannerAd";
import Connections from "@/components/Connections";
import Features from "@/components/Features";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Landing = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    if (isAuthenticated) {
        return <Navigate to="/home" />;
    }
    return (
        <section className="mx-auto flex flex-col">
            <Header />
            <HeroBanner />
            <Features />
            <Connections />
            <BannerAd />
        </section>
    );
};

export default Landing;
