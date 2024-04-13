import { BsCheck } from "react-icons/bs";
import Button from "@/components/Button";
import PropTypes from "prop-types";
import ToggleButton from "@/components/ToggleButton";
import { useState } from "react";

/* 
Core
$8/month
annual charge of $96

5 QR Codes/month

100 links/month

1 Link-in-bio page

Upgrade to Core
Everything in Free, plus:
QR Code customizations
30 days of click & scan data
Link & QR Code redirects
Growth
$29/month
annual charge of $348

10 QR Codes/month

500 links/month

2 Link-in-bio pages

Upgrade to Growth
Everything in Core, plus:
Complimentary custom domain*
Branded links
4 months of click & scan data
Bulk link shortening
Premium
$199/month
annual charge of $2,388

200 QR Codes/month

3,000 links/month

5 Link-in-bio pages

Upgrade to Premium
Everything in Growth, plus:
1 year of click & scan data
Custom campaign-level tracking
City-level & device type click & scan data
Mobile deep linking
 */
const planDetails = [
    {
        name: "Core",
        price: 8,
        monthly: 96,
        qrCodes: 5,
        links: 100,
        linkInBio: 1,
        features: [
            "QR Code customizations",
            "30 days of click & scan data",
            "Link & QR Code redirects",
        ],
    },
    {
        name: "Growth",
        price: 29,
        monthly: 348,
        qrCodes: 10,
        links: 500,
        linkInBio: 2,
        features: [
            "Complimentary custom domain*",
            "Branded links",
            "4 months of click & scan data",
            "Bulk link shortening",
        ],
    },
    {
        name: "Premium",
        price: 199,
        monthly: 2388,
        qrCodes: 200,
        links: 3000,
        linkInBio: 5,
        features: [
            "1 year of click & scan data",
            "Custom campaign-level tracking",
            "City-level & device type click & scan data",
            "Mobile deep linking",
        ],
    },
];

const Plans = () => {
    const [isMonthly, setIsMonthly] = useState(true);
    return (
        <section className="flex flex-col h-full pt-12">
            {/* header area */}
            <div className="flex flex-col items-center justify-center gap-6 bg-white pb-20">
                <h1 className="font-bold text-4xl text-center w-3/4 mx-auto">
                    Create more meaningful, measurable experiences with the
                    Bitly Connections Platform
                </h1>
                <p className="text-xl font-light text-center">
                    Upgrade to benefit so much more from your short links, QR
                    Codes & Link-in-bio
                </p>
                <div className="flex items-center justify-center gap-4">
                    <span
                        className={`text-sm font-semibold py-1 px-3 bg-gray-200 rounded-md ${
                            !isMonthly ? "bg-green-100 text-emerald-600" : ""
                        }`}
                    >
                        Save up to 34%
                    </span>
                    <span className={`text-lg ${!isMonthly && "font-bold"}`}>
                        Annually
                    </span>
                    <ToggleButton
                        state={isMonthly}
                        setState={setIsMonthly}
                        sameColor={true}
                    />
                    <span className={`text-lg ${isMonthly && "font-bold"}`}>
                        Monthly
                    </span>
                </div>
            </div>

            {/* plans section */}
            <div className="flex items-center justify-center relative bg-indigo-100/50">
                <div className="flex items-stretch justify-center gap-6 px-2 py-10 -mt-20 z-10">
                    {planDetails.map((plan, index) => (
                        <PlanCard key={index} {...plan} />
                    ))}
                </div>
            </div>

            <div className="text-sm flex flex-col items-center justify-center gap-1 py-10">
                <p>*Custom domain registration included with subscription</p>
                <p>
                    Your purchase may be subject to sales tax and will
                    automatically renew every month or year, depending on the
                    payment plan you&apos;ve chosen. All amounts shown are in
                    USD.
                </p>
            </div>
        </section>
    );
};

const PlanCard = ({
    name,
    price,
    monthly,
    qrCodes,
    links,
    linkInBio,
    features,
} = planDetails) => {
    return (
        <div className="flex flex-col justify-center bg-white rounded-sm shadow-lg p-10 border w-80">
            <h2 className="font-bold text-3xl mb-6 text-center">{name}</h2>
            <p className="text-blue-700 font-medium text-center mb-2">
                <span className="text-5xl font-bold">${price}</span>
                /month
            </p>
            <p className="text-sm font-light text-center">
                annual charge of ${monthly}
            </p>
            <div className="flex flex-col font-medium items-center justify-center my-4">
                <p>{qrCodes} QR Codes/month</p>
                <p>{links} links/month</p>
                <p>{linkInBio} Link-in-bio page</p>
            </div>

            <Button
                label={`Upgrade to ${name}`}
                className="bg-blue-600 text-white w-full py-2 rounded-sm hover:bg-blue-700"
            />
            <p className="font-semibold text-base mt-4 mb-2">
                Everything in{" "}
                {name === "Core"
                    ? "Free"
                    : name === "Growth"
                    ? "Core"
                    : "Growth"}
                , plus:
            </p>
            <div className="flex flex-col gap-1">
                {features.map((feature, index) => (
                    <p
                        key={index}
                        className="text-sm flex gap-3 items-center justify-start"
                    >
                        <BsCheck /> {feature}
                    </p>
                ))}
            </div>
        </div>
    );
};

PlanCard.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    monthly: PropTypes.number.isRequired,
    qrCodes: PropTypes.number.isRequired,
    links: PropTypes.number.isRequired,
    linkInBio: PropTypes.number.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Plans;