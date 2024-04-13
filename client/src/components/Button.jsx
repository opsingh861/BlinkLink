import PropTypes from "prop-types";

const Button = ({
    label = "",
    className = "",
    onClick = () => {},
    disabled = false,
    icon = null,
    type = "button",
    ...rest
}) => {
    return (
        <button
            className={`px-6 py-2 cursor-pointer flex items-center justify-center gap-2 ${className}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {label}
            {icon}
            {rest.children}
        </button>
    );
};

Button.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    icon: PropTypes.element,
    type: PropTypes.string,
};

export default Button;
