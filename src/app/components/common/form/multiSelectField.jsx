import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({
    options,
    onChange,
    name,
    label,
    defaultValue,
    error = ""
}) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  label: options[optionName].name,
                  value: options[optionName]._id
              }))
            : options;
    const getInputClasses = () => {
        return "basic-multi-select " + (error ? " is-invalid" : "");
    };
    const handleChange = (value) => {
        onChange({ name: name, value });
    };
    return (
        <div className="has-validation mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                defaultValue={defaultValue}
                options={optionsArray}
                className={getInputClasses()}
                classNamePrefix="select"
                onChange={handleChange}
                name={name}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
    defaultValue: PropTypes.array
};

export default MultiSelectField;
