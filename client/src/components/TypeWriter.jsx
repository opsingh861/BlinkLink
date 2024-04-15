import { useEffect, useState } from "react";

import PropTypes from "prop-types";

const TypeWriter = ({ str = "BlinkLink" }) => {
    const string = str;
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const [blink, setBlink] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (index < string.length) {
                setText((prev) => prev + string[index]);
                setIndex((prev) => prev + 1);
            } else {
                const intervalId = setInterval(() => {
                    setBlink((prev) => !prev);
                }, 750);
                return () => clearInterval(intervalId);
            }
        }, 200);

        return () => clearTimeout(timeoutId);
    }, [index, string]);

    return (
        <section>
            <h1 className="text-5xl font-bold text-blue-600 h-20">
                {text}

                <span
                    className={`text-6xl leading-4 ${
                        blink ? "text-blue-900" : "text-blue-100"
                    }`}
                >
                    .
                </span>
            </h1>
        </section>
    );
};

TypeWriter.propTypes = {
    str: PropTypes.string,
};

export default TypeWriter;
