import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/lib/axiosInstance';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/authSlice';

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            const res = await axiosInstance.post('/auth/google', {
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL,
            }, {
                withCredentials: true,
            });
            console.log(res);
            dispatch(setUser(res.data));
            navigate('/home');
        } catch (error) {
            console.log('could not login with google', error);
        }
    };
    return (
        <button
            type='button'
            onClick={handleGoogleClick}
            className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'
        >
            Continue with google
        </button>
    );
}
