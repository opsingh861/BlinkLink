import { Link, useNavigate } from "react-router-dom";

import Button from "@/components/Button";
import Divider from "@/components/Divider";
import InputComponent from "@/components/InputComponent";
import OAuth from "../components/OAuth";
import TypeWriter from "@/components/TypeWriter";
import axiosInstance from "@/lib/axiosInstance";
import { setUser } from "@/redux/authSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function Signup() {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
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

            const res = await axiosInstance.post("/auth/signup", formData, {
                withCredentials: true,
            });
            console.log(res.data.data);
            dispatch(setUser(res.data.data));
            setLoading(false);
            toast.success("Logged in successfully");
            navigate("/home");
        } catch (error) {
            console.log(error);
            let errorMessage = error?.response?.data?.message;
            console.log(errorMessage);
            setLoading(false);
            errorMessage =
                errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
            toast.error(errorMessage);
        }
    };
    return (
        <section className="flex w-full h-screen bg-white">
            {/* left side */}
            <div className="flex flex-col mx-auto justify-center w-1/3 md:w-1/2 lg:w-1/3">
                <h1 className="text-3xl font-semibold my-7">
                    Create your account
                </h1>
                <OAuth />

                {/* or button */}
                <div className="flex items-center justify-center gap-4 my-5">
                    <Divider />
                    <p className="text-gray-500">OR</p>
                    <Divider />
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <label htmlFor="name" className="text-base font-medium">
                        Name
                    </label>
                    <InputComponent
                        type="text"
                        id="name"
                        onChange={handleChange}
                        value={formData.name}
                    />

                    <label htmlFor="username" className="text-base font-medium">
                        Username
                    </label>
                    <InputComponent
                        type="text"
                        id="username"
                        onChange={handleChange}
                        value={formData.username}
                    />
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
                        label={loading ? "Loading..." : "Create free account"}
                        disabled={loading}
                        type="submit"
                        className="bg-blue-600 text-white rounded-md py-2 px-4 font-medium hover:bg-blue-600 transition duration-200"
                    />
                </form>
                <div className="flex gap-2 mt-5 items-center justify-center">
                    <p>Already have an account?</p>
                    <Link to="/sign-in">
                        <span className="text-blue-500">Sign in</span>
                    </Link>
                </div>
            </div>

            {/* right side */}
            <div className="hidden lg:flex w-2/5 bg-cover bg-center bg-blue-100 h-full items-center justify-center">
                <TypeWriter />
            </div>
        </section>
    );
}