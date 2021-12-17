import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items: { ...items },
    onItemSelect,
    valueProperty,
    contentProperty,
    selectedItem
}) => {
    return (
        <ul className="list-group">
            {Object.keys(items).map((item) => {
                // eslint-disable-next-line no-unused-vars
                const { [valueProperty]: id, [contentProperty]: content } =
                    items[item];
                return (
                    <li
                        key={content}
                        className={
                            "list-group-item" +
                            (JSON.stringify(items[item]) ===
                            JSON.stringify(selectedItem)
                                ? " active"
                                : "")
                        }
                        onClick={() => onItemSelect(items[item])}
                        role="button"
                    >
                        {content}
                    </li>
                );
            })}
        </ul>
    );
};

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    selectedItem: PropTypes.object,
    onItemSelect: PropTypes.func,
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired
};

export default GroupList;
