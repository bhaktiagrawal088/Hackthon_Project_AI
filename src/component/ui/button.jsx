import PropTypes from "prop-types";

export function Button({ children, onClick, className }) {
    return (
      <button className={className} onClick={onClick}>
        {children}
      </button>
    );
  }
  
// PropTypes validation
Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
