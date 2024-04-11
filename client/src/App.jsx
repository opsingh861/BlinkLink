import { BrowserRouter, Route, Routes } from "react-router-dom";

import CreateLink from "./pages/CreateLink";
import CreateQR from "./pages/CreateQR";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Links from "./pages/Links";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound.jsx"; // Import your Not Found component
import PrivateRoute from "./components/PrivateRoute";
import Qrcode from "./pages/Qrcode";
import Signup from "./pages/Signup";
import Analytics from "./pages/Analytics";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/sign-up" element={<Signup />} />
                    <Route path="/sign-in" element={<Login />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/links" element={<Links />} />
                        <Route path="/links/create" element={<CreateLink />} />
                        <Route path="/qrcode" element={<Qrcode />} />
                        <Route path="/qrcode/create" element={<CreateQR />} />
                        <Route path="/analytics" element={<Analytics />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
