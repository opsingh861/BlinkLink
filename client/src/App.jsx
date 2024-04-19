import { BrowserRouter, Route, Routes } from "react-router-dom";

import Analytics from "./pages/Analytics";
import CreateLink from "./pages/CreateLink";
import CreateQR from "./pages/CreateQR";
import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import LinkDetail from "./components/LinkDetail";
import Links from "./pages/Links";
import Plans from "./pages/Plans";
import PrivateRoute from "./components/PrivateRoute";
import Qrcode from "./pages/Qrcode";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <div>
            <Toaster position="top-right" reverseOrder={false} />

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/sign-up" element={<Signup />} />
                    <Route path="/sign-in" element={<Signin />} />
                    <Route path="/plans" element={<Plans />} />
                    <Route path="*" element={<Error404 />} />

                    <Route element={<PrivateRoute />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/links" element={<Links />} />
                        <Route path="/links/create" element={<CreateLink />} />
                        <Route path="/links/:linkId" element={<LinkDetail />} />
                        <Route path="/qrcode" element={<Qrcode />} />
                        <Route path="/qrcode/create" element={<CreateQR />} />
                        <Route path="/analytics" element={<Analytics />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;