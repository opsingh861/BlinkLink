import Button from "@/components/Button";
import PropTypes from "prop-types";

const EmptyComponent = ({
    header = "",
    description = "",
    image = "",
    button = {
        label: "",
        onClick: () => {},
    },
    scta = { label: "", onClick: () => {} },
}) => {
    return (
        <section className="flex flex-col gap-6 items-center justify-center">
            <div className="px-4 py-6">
                {image ? (
                    <img src={image} alt="Shorten links" />
                ) : (
                    <div className="h-60 w-96 bg-gray-200 my-4"></div>
                )}
            </div>
            <h1 className="font-bold text-4xl">{header}</h1>
            <p className="text-xl font-light max-w-xl text-center">
                {description}
            </p>
            <Button label={button.label} onClick={button.onClick} />
            <p
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={scta.onClick}
            >
                {scta.label}
            </p>
        </section>
    );
};

EmptyComponent.propTypes = {
    header: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    button: PropTypes.shape({
        label: PropTypes.string,
        onClick: PropTypes.func,
    }),
    scta: PropTypes.shape({
        label: PropTypes.string,
        onClick: PropTypes.func,
    }),
};
export default EmptyComponent;
