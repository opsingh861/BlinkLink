import PropTypes from "prop-types";

const InputComponent = ({
    type = "text",
    placeholder = "",
    value = "",
    onChange = () => { },
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
            className={`border border-gray-300 rounded-md py-2 px-4 font-light hover:border-blue-500 focus:outline-none ${className}`}
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
};

export default InputComponent;
