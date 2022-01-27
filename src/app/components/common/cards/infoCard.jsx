import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const InfoCard = ({ name, id, avatar, profession, rate }) => {
    const history = useHistory();
    console.log(avatar);
    const handleEditUserProfile = () => {
        history.push(`/users/${id}/edit`);
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <button
                    className="btn btn-light btn-sm position-absolute top-0 end-0"
                    onClick={handleEditUserProfile}
                >
                    <i className="bi bi-gear"> </i>
                </button>
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={`https://avatars.dicebear.com/api/avataaars/${(
                            avatar || Math.random() + 1
                        )
                            .toString(36)
                            .substring(7)}.svg`}
                        className=" shadow-1-strong me-3"
                        width="150"
                    />
                    <div className="mt-3">
                        <h4>{name || "John"}</h4>
                        <p className="text-secondary mb-1">
                            {profession || "Доктор"}
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
                            <span className="ms-2">{rate || 5}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

InfoCard.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    profession: PropTypes.string,
    rate: PropTypes.number
};

export default InfoCard;
