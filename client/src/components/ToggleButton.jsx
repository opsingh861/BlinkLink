import PropTypes from "prop-types";

const ToggleButton = ({ state, setState, disabled = false }) => {
    const toggleButton = () => {
        if (disabled) return;

        setState((prev) => !prev);
    };

    return (
        <button
            className={`flex items-center justify-center relative w-12 h-6 rounded-full focus:outline-none ${
                state ? "bg-blue-500" : "bg-gray-400"
            } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
            onClick={toggleButton}
            type="button"
        >
            <span
                className={`inline-block w-5 h-5 bg-white rounded-full shadow-md transform duration-300 ${
                    state ? "translate-x-3" : "-translate-x-3"
                }`}
            />
        </button>
    );
};

ToggleButton.propTypes = {
    disabled: PropTypes.bool,
    state: PropTypes.bool.isRequired,
    setState: PropTypes.func.isRequired,
};

export default ToggleButton;
