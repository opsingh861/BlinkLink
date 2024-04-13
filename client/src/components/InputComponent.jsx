import PropTypes from "prop-types";

const InputComponent = ({
    type = "text",
    placeholder = "",
    value = "",
    onChange = () => {},
    className,
    readOnly = false,
    ...rest
}) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            className={`border border-gray-300 rounded-md py-2 px-4 font-light focus:outline-none ${
                readOnly
                    ? "bg-gray-100 cursor-auto text-zinc-500"
                    : "focus:ring-2 focus:ring-blue-500 focus:ring-inset focus:border-transparent hover:border-gray-500 transition duration-200"
            } ${className}`}
            {...rest}
        />
    );
};

InputComponent.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    readOnly: PropTypes.bool,
};

export default InputComponent;
