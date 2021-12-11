import React from 'react'
import PropTypes from 'prop-types'

const UserDelete = ({ id, onDelete }) => {
    return (
        <button className={'btn btn-danger m-2'} onClick={() => onDelete(id)}>
            Удалить
        </button>
    )
}

UserDelete.propTypes = {
    id: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default UserDelete
