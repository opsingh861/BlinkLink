import PropTypes from "prop-types";

const ModalLayout = ({ children }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-md px-6 py-8 max-w-lg w-full min-w-[50%]">
                {children}
            </div>
        </div>
    );
};

ModalLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default ModalLayout;
