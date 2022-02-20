import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const NavProfile = ({ currentUser }) => {
    const [isOpen, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen((prev) => !prev);
    };
    const getClassToggle = () => {
        if (isOpen) return "show";
    };

    return (
        <div className="dropdown" onClick={toggleMenu}>
            {currentUser && (
                <>
                    <div className="btn dropdown-toggle d-flex align-items-center">
                        <div className="me-2">{currentUser.name}</div>
                        <img
                            src={currentUser.image}
                            height="40"
                            alt=""
                            className="img-responsive rounded-circle"
                        />
                    </div>
                    <div className={`w-100 dropdown-menu ` + getClassToggle()}>
                        <Link
                            to={`/users/${currentUser._id}`}
                            className="dropdown-item"
                        >
                            Profile
                        </Link>
                        <Link to="/logout" className="dropdown-item">
                            Log Out
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};
NavProfile.propTypes = {
    currentUser: PropTypes.object
};

export default NavProfile;
