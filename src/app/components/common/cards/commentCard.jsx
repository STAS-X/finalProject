import React from "react";
import calculatedatediff from "../../../utils/diffdatecalculator";
import PropTypes from "prop-types";

const CommentCard = ({
    name,
    id,
    avatar,
    timeStamp,
    content,
    onCommentDelete
}) => {
    return (
        <div className="bg-light card-body mb-3">
            <div className="row" id={id}>
                <div className="col">
                    <div className="d-flex flex-start ">
                        <img
                            src={`https://avatars.dicebear.com/api/avataaars/${avatar}`}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">
                                        {name}
                                        <span className="small">
                                            {"  " + calculatedatediff(timeStamp)}
                                        </span>
                                    </p>
                                    <button
                                        className="btn btn-sm text-primary d-flex align-items-center"
                                        onClick={() => onCommentDelete(id)}
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                                <p className="small mb-0">{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

CommentCard.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    timeStamp: PropTypes.number.isRequired,
    onCommentDelete: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired
};

export default CommentCard;
