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
                const { [valueProperty]: id, [contentProperty]: content } =
                    items[item];
                //  console.log(content, rest);
                return (
                    <li
                        key={id}
                        className={
                            "list-group-item" +
                            (items[item] === selectedItem ? " active" : "")
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
