import React from 'react'
import PropTypes from 'prop-types'

const UserQualities = ({ qualities }) => {
    return qualities.map((item) => (
        <span
            className={'badge rounded-pill m-1 bg-' + item.color}
            key={item._id}
        >
            {item.name}
        </span>
    ))
}

UserQualities.propTypes = {
    qualities: PropTypes.array.isRequired,
}

export default UserQualities
