import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'

const UserPaging = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
    const pageCount = Math.ceil(itemsCount / pageSize)
    console.log(pageCount)
    const pages = _.range(1, pageCount + 1)
    if (pageCount < 2) return null
    console.log(pages)

    return (
        <nav>
            <ul className="pagination">
                {pages.map((page) => {
                    return (
                        <li
                            className={
                                'page-item' +
                                (page === currentPage ? ' active' : '')
                            }
                            key={'page_' + page}
                        >
                            <button
                                className="page-link rounded-pill"
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

UserPaging.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
}

export default UserPaging
