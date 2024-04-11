import PropTypes from "prop-types";
const Divider = ({ className = "" }) => {
    return (
        <div className={`h-[1px] bg-gray-300 w-full px-4 ${className}`}></div>
    );
};

Divider.propTypes = {
    className: PropTypes.string,
};

export default Divider;
