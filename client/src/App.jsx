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
import QrDetail from "./components/QrDetail";
import Qrcode from "./pages/Qrcode";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import PasteBin from "./pages/PasteBin";
import Campaigns from "./pages/campaigns";

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
                        <Route
                            path="/links/:shortUrl"
                            element={<LinkDetail />}
                        />
                        <Route path="/qrcode" element={<Qrcode />} />
                        <Route path="/qrcode/create" element={<CreateQR />} />
                        <Route
                            path="/qrcode/:shortUrl"
                            element={<QrDetail />}
                        />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/pastebin" element={<PasteBin />} />
                        <Route path="/campaigns" element={<Campaigns />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
