import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import OAuth from '../components/OAuth';
import axiosInstance from '@/lib/axiosInstance';
import { setUser } from '@/redux/authSlice';

export default function Login() {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const res = await axiosInstance.post('/auth/login', formData,{
                withCredentials: true
            });
            // console.log(res.data);
            dispatch(setUser(res.data));
            setLoading(false);
            navigate('/home');
        } catch (error) {
            console.log(error.response.data.message);
            setLoading(false);
            setError(error.response.data.message);
        }
    };
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input
                    type='email'
                    placeholder='Email'
                    id='email'
                    className='bg-slate-100 p-3 rounded-lg'
                    onChange={handleChange}
                />
                <input
                    type='password'
                    placeholder='Password'
                    id='password'
                    className='bg-slate-100 p-3 rounded-lg'
                    onChange={handleChange}
                />
                <button
                    disabled={loading}
                    className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                >
                    {loading ? 'Loading...' : 'Sign In'}
                </button>
                <OAuth />
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Dont Have an account?</p>
                <Link to='/sign-up'>
                    <span className='text-blue-500'>Sign up</span>
                </Link>
            </div>
            <p className='text-red-700 mt-5'>
                {error ? error || 'Something went wrong!' : ''}
            </p>
        </div>
    );
}
