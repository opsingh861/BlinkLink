import PropTypes from "prop-types";

const InputComponent = ({
    type = "text",
    placeholder = "",
    value = "",
    onChange = () => { },
    className = "",
    ...rest
}) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`border border-gray-300 rounded-md py-2 px-4 font-light focus:outline-none focus:border-blue-500 ${className}`}
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
