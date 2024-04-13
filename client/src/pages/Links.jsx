import { useDispatch, useSelector } from "react-redux";

import Divider from "@/components/Divider";
import EmptyComponent from "@/components/EmptyComponent";
import LinkItemComponent from "@/components/LinkItemComponent";
import { fetchLinks } from "@/redux/linksSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Links = () => {
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const { items, isLoading, error } = useSelector((state) => state.links);
    const isEmpty = items.length === 0;

    useEffect(() => {
        dispatch(fetchLinks());
    }, [dispatch]);

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
                                iconUrl={item.logo}
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
