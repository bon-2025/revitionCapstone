import React from "react";

/**
 * ButtonInput is a reusable button component that can act as a normal button or a submit button.
 * It supports custom styling, labels, click handlers, and additional props.
 *
 * @param {Object} props - Component props
 * @param {string} props.label - Label text for the button (used if buttonText is not provided)
 * @param {string} props.id - ID attribute for the button element
 * @param {'button' | 'submit'} [props.type='button'] - Button type: "button" or "submit"
 * @param {string} [props.className=''] - Additional CSS classes for styling
 * @param {string} props.buttonText - Text displayed on the button (overrides label)
 * @param {function} props.onButtonClick - Click handler function for non-submit buttons
 * @param {...Object} rest - Any other props passed to the button element
 *
 * @returns {JSX.Element} A styled button input
 */
const ButtonInput = ({
  label,
  id,
  type = "button",
  className = "", // optional additional styling classes
  buttonText,
  onButtonClick,
  ...rest
}) => {
  // Combine default bootstrap classes with optional custom className
  const btnClass = `form-control btn ${className || "btn-secondary"}`;

  return (
    <div className="mb-3">
      <button
        id={id}
        type={type === "submit" ? "submit" : "button"} // Submit buttons ignore onClick
        className={btnClass}
        onClick={type !== "submit" ? onButtonClick : undefined} // Only attach handler for non-submit
        {...rest} // Spread remaining props for flexibility
      >
        {/* Display buttonText first, then label, then fallback to "Submit" */}
        {buttonText || label || "Submit"}
      </button>
    </div>
  );
};

export default ButtonInput;
