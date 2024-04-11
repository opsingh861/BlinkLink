import Divider from "@/components/Divider";
import EmptyComponent from "@/components/EmptyComponent";
import LinkItemComponent from "@/components/LinkItemComponent";
import axiosInstance from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Links = () => {
    const navigation = useNavigate();
    const [items, setItems] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const fetchLinks = async () => {
        try {
            const res = await axiosInstance.get("/links/getlinks", {
                withCredentials: true
            });
            setItems(res.data.links);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log(items)
        fetchLinks();
    }, []);

    useEffect(() => {
        setIsEmpty(items.length === 0);
    }, [items]);

    return (
        <section className="px-40 rounded-sm mt-10">
            {isEmpty && (
                <EmptyComponent
                    header="Shorten Links"
                    description="Create short links for your website, social media, and more."
                    button={{
                        label: "Get Started",
                        onClick: () => {
                            navigation("create");
                        },
                    }}
                    scta={{ label: "Learn more" }}
                />
            )}
            {!isEmpty && (
                <div className="mb-5">
                    <h1 className="font-bold text-4xl mt-4 mb-2">Links</h1>
                    <Divider className="mb-4" />
                    <div className="flex flex-col gap-4">
                        {items.map((item, index) => (
                            <LinkItemComponent
                                key={index}
                                title={item.title}
                                shortUrl={item.shortUrl}
                                url={item.url}
                                clicks={item.clicks}
                                date={Date.parse(item.createdAt)}

                            />
                        ))}
                    </div>
                    <div className="text-center mt-4 flex items-center justify-center">
                        <div className="inline-block w-1/12 border-b border-black"></div>
                        <p className="inline-block mx-2 font-light text-sm">
                            You&apos;ve reached the end of your links
                        </p>
                        <div className="inline-block w-1/12 border-b border-black"></div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Links;
