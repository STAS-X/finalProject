import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProfessionList } from "../../store/professions";
import { getAuthUser, getUserbyId } from "../../store/users";

const UserCard = ({ id }) => {
    const history = useHistory();
    const currentUser = useSelector(getAuthUser());
    const user = useSelector(getUserbyId(id));
    const professions = useSelector(getProfessionList());

    const buttonStyle = {
        zIndex: 1 // Поправляем поведение иконки для четкого реагирования на мышь
    };

    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };
    return (
        <div className="card mb-3">
            {currentUser && (
                <div className="card-body">
                    {currentUser._id === user._id && (
                        <button
                            className="position-absolute top-0 end-0 btn btn-light btn-sm"
                            style={buttonStyle}
                            onClick={handleClick}
                        >
                            <i className="bi bi-gear"></i>
                        </button>
                    )}
                    <div className="d-flex flex-column align-items-center text-center position-relative">
                        <img
                            src={user.image}
                            className="rounded-circle"
                            width="150"
                        />
                        <div className="mt-3">
                            <h4>{user.name}</h4>
                            <p className="text-secondary mb-1">
                                {
                                    professions.find(
                                        (prof) => prof._id === user.profession
                                    ).name
                                }
                            </p>
                            <div className="text-muted">
                                <i
                                    className="bi bi-caret-down-fill text-primary"
                                    role="button"
                                ></i>
                                <i
                                    className="bi bi-caret-up text-secondary"
                                    role="button"
                                ></i>
                                <span className="ms-2">{user.rate}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
UserCard.propTypes = {
    id: PropTypes.string
};

export default UserCard;
