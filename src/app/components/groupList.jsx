import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ items }) => {
    return (
        <ul className='list-group'>
            {Object.keys(items).map((item) => {
                return (<li className='list-group-item'>{item}</li>);
            })}
        </ul>
    );
};

GroupList.propTypes = {
    items: PropTypes.object.isRequired
};

export default GroupList;
