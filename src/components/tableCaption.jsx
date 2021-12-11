import React from 'react'
import PropTypes from 'prop-types'

const TableCaption = ({ count, onPhrase }) => {
    return (
        <h2>
            <span
                className={
                    'badge rounded-pill bg-' +
                    (count > 0 ? 'primary' : 'danger')
                }
            >
                {count > 0
                    ? `${count} ${onPhrase(count)} с тобой сегодня`
                    : 'Никто с тобой сегодня не тусанет'}
            </span>
        </h2>
    )
}

TableCaption.propTypes = {
    count: PropTypes.number.isRequired,
    onPhrase: PropTypes.func.isRequired,
}

export default TableCaption
