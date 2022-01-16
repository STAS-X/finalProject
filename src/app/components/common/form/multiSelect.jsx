import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const MultiSelectField = ({ options, onChange, name, label, defaultValue, error }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                label: options[optionName].name,
                value: options[optionName]._id
            }))
            : options;

    const getInputClassname = () => {
        return `basic-multi-select ${error ? "is-invalid" : ""}`;
    };

    const handleChange = (value) => {
        onChange({ name: name, value });
    };

    return (
        <div className="mb-4">
            <label className="form-label" htmlFor={name}>
                {label}
            </label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                name={name}
                defaultValue={defaultValue}
                options={optionsArray}
                onChange={handleChange}
                className={getInputClassname()}
                classNamePrefix="select"
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

MultiSelectField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
    defaultValue: PropTypes.array,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onChange: PropTypes.func
};

export default MultiSelectField;
