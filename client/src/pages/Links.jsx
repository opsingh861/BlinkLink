import { useDispatch, useSelector } from "react-redux";

import Divider from "@/components/Divider";
import EmptyComponent from "@/components/EmptyComponent";
import LinkItem from "@/components/LinkItem";
import { fetchLinks } from "@/redux/linksSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";

const Links = () => {
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const { items, isLoading, error } = useSelector((state) => state.links);
    const isEmpty = items.length === 0;

    useEffect(() => {
        // Check if items are empty before fetching
        if (isEmpty) {
            dispatch(fetchLinks());
        }
    }, [dispatch, isEmpty]);

    if (isLoading) {
        // Show loading indicator while data is being fetched
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        );
    }

    if (isEmpty) {
        return (
            <EmptyComponent
                header="Shorten Links"
                description="Create short links for your website, social media, and more."
                image="src/assets/links-list-empty.png"
                button={{
                    label: "Get Started",
                    onClick: () => {
                        navigation("create");
                    },
                }}
                scta={{ label: "Learn more" }}
            />
        );
    }
    return (
        <section className="rounded-sm mt-10 overflow-y-auto">
            <div className="mx-auto w-11/12">
                <div className="mb-5">
                    <h1 className="font-bold text-4xl mt-4 mb-2 sticky">
                        Links
                    </h1>
                    <Divider className="mb-4" />
                    <div className="flex flex-col gap-4">
                        {items.map((item, index) => (
                            <LinkItem
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
            </div>
        </section>
    );
};

export default Links;
