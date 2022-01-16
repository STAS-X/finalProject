import React from "react";
import PropTypes from "prop-types";

const Searchfield = ({ type, label, name, value, holder, error, onChange }) => {
    const getInputClassname = () => {
        return `form-control col ${error ? "is-invalid" : ""}`;
    };

    return (
        <div className="form-group">
            <div className="mb-4 row">
                <label className="col col-md-auto col-form-label" htmlFor={name}>{label}</label>
                <div className="col-sm-8 has-validation">
                    <input
                        className={getInputClassname()}
                        type={type}
                        id={name}
                        name={name}
                        value={value}
                        placeholder={holder}
                        onChange={onChange}
                    />
                    {error && <div className="invalid-feedback">{error}</div>}
                </div>
            </div>
        </div>
    );
};

Searchfield.defaultProps = {
    type: "text"
};

Searchfield.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
    holder: PropTypes.string,
    onChange: PropTypes.func
};

export default Searchfield;
