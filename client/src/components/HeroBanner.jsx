import React from "react";

const HeroBanner = () => {
    return (
        <>
            <section className="flex justify-between gap-40 items-center">
                <div className="left-side my-auto gap-12 flex flex-col px-6 items-start py-20">
                    <h1 className="font-extrabold text-6xl">
                        Build stronger digital
                        <span className="text-orange-500"> connections</span>
                    </h1>
                    <p className="text-xl">
                        Use our URL shortener, QR Codes, and Link-in-bio pages
                        to engage your audience and connect them to the right
                        information. Build, edit, and track everything inside
                        the Bitly Connections Platform.
                    </p>

                    <button className="px-9 py-3 bg-blue-600 rounded-sm text-white">
                        Get started
                    </button>
                </div>

                <div className="right-side">
                    <div className="h-96 w-96 bg-blue-600"></div>
                </div>
            </section>
            <div className="flex items-center justify-between gap-12 px-12 py-4">
                {/* show 5 boxes of same color and h w */}
                {[1, 2, 3, 4, 5].map((item, index) => (
                    <div key={index} className="h-20 w-60 bg-blue-500"></div>
                ))}
            </div>
        </>
    );
};

export default HeroBanner;
