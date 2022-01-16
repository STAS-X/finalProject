import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, onChange, error, children }) => {
    const handleChange = () => {
        onChange({ name: name, value: !value });
    };

    const getInputClassname = () => {
        return `form-check-input ${error ? "is-invalid" : ""}`;
    };

    return (
        <div className="form-check mb-4">
            <input
                className={getInputClassname()}
                type="checkbox"
                value=""
                id="flexCheckDefault"
                checked={value}
                onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
                {children}
            </label>
            {error && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </div>
    );
};

CheckBoxField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    error: PropTypes.string,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default CheckBoxField;
