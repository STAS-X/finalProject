import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    value,
    name,
    onChange,
    defaultOption,
    options,
    error
}) => {
    const getInputClassname = () => {
        return `form-select ${error ? "is-invalid" : ""}`;
    };
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const optionsArray =
    !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => {
                return ({
                    name: optionName,
                    value: options[optionName]._id
                });
            })
            : options.map((option) => {
                return ({
                    name: option.name,
                    value: option._id
                });
            });

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select
                className={getInputClassname()}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray && optionsArray.map((option) => (
                    <option
                        key={option.name + "_" + option.value}
                        value={option.value}
                    >
                        {option.name}
                    </option>
                ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

SelectField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    defaultOption: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default SelectField;
