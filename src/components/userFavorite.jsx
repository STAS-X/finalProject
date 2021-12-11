import React from 'react'
import PropTypes from 'prop-types'

const UserFavorite = ({ id, onUpdate, onFavotrite }) => {
    return (
        <div>
            <i
                className={onUpdate(id)}
                onClick={() => onFavotrite(id)}
                role="img"
                aria-label="Пользователь в избранном"
            />
        </div>
    )
}

UserFavorite.propTypes = {
    id: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onFavotrite: PropTypes.func.isRequired,
}

export default UserFavorite
