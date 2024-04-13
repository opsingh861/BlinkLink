import { Link, useNavigate } from "react-router-dom";

import Button from "@/components/Button";
import Divider from "@/components/Divider";
import InputComponent from "@/components/InputComponent";
import OAuth from "../components/OAuth";
import axiosInstance from "@/lib/axiosInstance";
import { setUser } from "@/redux/authSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function Signin() {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) => {
        console.log(e.target.id, e.target.value);
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const res = await axiosInstance.post("/auth/login", formData, {
                withCredentials: true,
            });
            dispatch(setUser(res.data));
            setLoading(false);
            toast.success("Logged in successfully");
            navigate("/home");
        } catch (error) {
            let errorMessage = error.response.data.message;
            console.log(errorMessage);
            setLoading(false);
            setError("Error: " + errorMessage);
            errorMessage =
                errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
            toast.error(errorMessage);
        }
    };
    return (
        <section className="flex w-full h-screen bg-white">
            {/* left side */}
            <div className="flex flex-col mx-auto justify-center w-1/3">
                <h1 className="text-3xl font-semibold my-7">
                    Log in and start sharing
                </h1>
                <OAuth />

                {/* or button */}
                <div className="flex items-center justify-center gap-4 my-5">
                    <Divider />
                    <p className="text-gray-500">OR</p>
                    <Divider />
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <label htmlFor="email" className="text-base font-medium">
                        Email
                    </label>
                    <InputComponent
                        type="email"
                        id="email"
                        onChange={handleChange}
                        value={formData.email}
                    />

                    <label htmlFor="password" className="text-base font-medium">
                        Password
                    </label>
                    <InputComponent
                        type="password"
                        id="password"
                        onChange={handleChange}
                        value={formData.password}
                    />

                    <p
                        className="text-blue-500 text-sm font-semibold cursor-pointer text-right"
                        onClick={() => navigate("/forgot-password")}
                    >
                        Forgot your password?{" "}
                    </p>

                    <Button
                        label={loading ? "Loading..." : "Log In"}
                        disabled={loading}
                        type="submit"
                        className="bg-blue-600 text-white rounded-md py-2 px-4 font-medium hover:bg-blue-600 transition duration-200"
                    />
                </form>
                <div className="flex gap-2 mt-5 items-center justify-center">
                    <p>Don&apos;t Have an account?</p>
                    <Link to="/sign-up">
                        <span className="text-blue-500">Sign up</span>
                    </Link>
                </div>
                {/* <p className="text-red-700 mt-5">
                    {error ? error || "Something went wrong!" : ""}
                </p> */}
            </div>

            {/* right side */}
            <div className="hidden lg:flex w-2/5 bg-cover bg-center bg-blue-100 h-full"></div>
        </section>
    );
}
