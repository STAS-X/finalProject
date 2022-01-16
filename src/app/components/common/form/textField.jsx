import React, { useState } from "react";
import PropTypes from "prop-types";

const Textfield = ({ label, type, name, value, error, onChange }) => {
    const [showPass, setShowPass] = useState(false);

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const getInputClassname = () => {
        return `form-control ${error ? "is-invalid" : ""}`;
    };

    const toggleShowPass = () => {
        setShowPass((prevState) => !prevState);
    };

    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <input
                    className={getInputClassname()}
                    type={showPass ? "text" : type}
                    id={name}
                    name={name}
                    onChange={handleChange}
                    value={value}
                />
                {type === "password" && (
                    <button
                        className="btn btn-outline-info"
                        type="button"
                        onClick={toggleShowPass}
                    >
                        <i
                            className={`bi bi-eye${showPass ? "-slash" : ""}`}
                        ></i>
                    </button>
                )}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

Textfield.defaultProps = {
    type: "text"
};

Textfield.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func
};

export default Textfield;
