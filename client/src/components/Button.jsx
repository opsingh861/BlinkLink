import PropTypes from "prop-types";

const Button = ({
    label = "",
    className = "",
    onClick = () => { },
    disabled = false,
    icon = null,
}) => {
    return (
        <button
            className={`px-6 py-2 cursor-pointer ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
            {icon}
        </button>
    );
};

Button.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    icon: PropTypes.element,
};

export default Button;
