import { BrowserRouter, Route, Routes } from "react-router-dom";

import Analytics from "./pages/Analytics";
import ComingSoon from "./pages/ComingSoon.jsx"; // Import your Not Found component
import CreateLink from "./pages/CreateLink";
import CreateQR from "./pages/CreateQR";
import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Links from "./pages/Links";
import Login from "./pages/Login";
import Plans from "./pages/Plans";
import PrivateRoute from "./components/PrivateRoute";
import Qrcode from "./pages/Qrcode";
import Signup from "./pages/Signup";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/sign-up" element={<Signup />} />
                    <Route path="/sign-in" element={<Login />} />
                    <Route path="/plans" element={<Plans />} />

                    <Route element={<PrivateRoute />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/links" element={<Links />} />
                        <Route path="/links/create" element={<CreateLink />} />
                        <Route path="/qrcode" element={<Qrcode />} />
                        <Route path="/qrcode/create" element={<CreateQR />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="*" element={<ComingSoon />} />
                    </Route>
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
