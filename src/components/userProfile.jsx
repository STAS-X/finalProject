import React from 'react'
import PropTypes from 'prop-types'

const UserProfile = ({ profile }) => {
    return <td>{profile}</td>
}

UserProfile.propTypes = {
    profile: PropTypes.any.isRequired,
}

export default UserProfile
