import LinkItem from "@/components/LinkItem";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const LinkDetail = () => {
    let { linkId } = useParams();

    console.log(linkId);

    const items = useSelector((state) => state.links.items);

    // let item = items.find((item) => item?.title === linkId);
    let item = items[0];

    if (!item) return;

    return (
        <section className="rounded-sm mt-10 overflow-y-auto">
            <div className="mx-auto w-11/12">
                {/* back to list */}
                <div className="flex items-center gap-2 mb-5">
                    <button
                        onClick={() => {
                            window.history.back();
                        }}
                        className="flex items-center gap-1 text-blue-700 hover:underline"
                    >
                        <RiArrowGoBackFill />
                        Back to list
                    </button>
                </div>
                <div className="mb-5">
                    <div className="flex flex-col gap-4">
                        <LinkItem
                            title={item.title}
                            shortUrl={item.shortUrl}
                            url={item.url}
                            clicks={item.clicks}
                            date={Date.parse(item.createdAt)}
                            iconUrl={item.logo}
                        />
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

export default LinkDetail;
