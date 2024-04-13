import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import { FcGoogle } from "react-icons/fc";
import { app } from "../lib/firebase";
import axiosInstance from "@/lib/axiosInstance";
import { setUser } from "@/redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            const res = await axiosInstance.post(
                "/auth/google",
                {
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                },
                {
                    withCredentials: true,
                }
            );
            console.log(res);
            dispatch(setUser(res.data));
            navigate("/home");
        } catch (error) {
            console.log("could not login with google", error);
        }
    };
    return (
        <button
            type="button"
            onClick={handleGoogleClick}
            className="px-6 py-2 cursor-pointer flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md shadow-sm"
        >
            <FcGoogle />
            Continue with google
        </button>
    );
}
