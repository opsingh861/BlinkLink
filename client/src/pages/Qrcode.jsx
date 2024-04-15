import Divider from "@/components/Divider";
import EmptyComponent from "@/components/EmptyComponent";
import QrCodeItem from "@/components/QrCodeItem";
import { useNavigate } from "react-router-dom";

const Links = () => {
    const navigation = useNavigate();

    const isEmpty = false;

    if (isEmpty) {
        return (
            <EmptyComponent
                header="Connect your audience with a simple scan"
                description="
            Create a QR Code from any short link. Then edit, customize, and track your QR Codes here."
                image="src/assets/qrc-list-empty.png"
                button={{
                    label: "Create a QR Code",
                    onClick: () => {
                        navigation("create");
                    },
                }}
                scta={{ label: "Learn more" }}
            />
        );
    }

    const items = [
        {
            title: "Google",
            shortUrl: "google",
            url: "https://www.google.com",
            clicks: 100,
            createdAt: "2021-08-01T00:00:00.000Z",
            logo: "src/assets/qrcode.svg",
        },
        {
            title: "Facebook",
            shortUrl: "facebook",
            url: "https://www.facebook.com",
            clicks: 200,
            createdAt: "2021-08-01T00:00:00.000Z",
            logo: "src/assets/qrcode.svg",
        },
        {
            title: "Twitter",
            shortUrl: "twitter",
            url: "https://www.twitter.com",
            clicks: 300,
            createdAt: "2021-08-01T00:00:00.000Z",
            logo: "src/assets/qrcode.svg",
        },
    ];
    return (
        <section className="rounded-sm mt-10 overflow-y-auto">
            <div className="mx-auto w-4/5">
                <div className="mb-5">
                    <h1 className="font-bold text-4xl mt-4 mb-2 sticky">
                        QR Codes
                    </h1>
                    <Divider className="mb-4" />
                    <div className="flex flex-col gap-4">
                        {items.map((item, index) => (
                            <QrCodeItem
                                key={index}
                                title={item.title}
                                shortUrl={item.shortUrl}
                                url={item.url}
                                clicks={item.clicks}
                                date={Date.parse(item.createdAt)}
                                iconUrl={item.logo}
                            />
                        ))}
                    </div>
                    <div className="text-center mt-4 flex items-center justify-center">
                        <div className="inline-block w-1/12 border-b border-black"></div>
                        <p className="inline-block mx-2 font-light text-sm">
                            You&apos;ve reached the end of your QR codes
                        </p>
                        <div className="inline-block w-1/12 border-b border-black"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Links;
