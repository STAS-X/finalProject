import React, { useState } from "react";
import PropTypes from "prop-types";
import api from "../../..api";

const ViewerCommentCard = ({ userId }) => {
    const [avatars] = useState(() => localStorage.getItem("avatars") || []);

    const [comments, setComments] = useState(() =>
        api.comments.fetchCommentsForUser(userId).then(
            (data) =>
                setComments(
                    data.map((user) => ({
                        ...user,
                        avatar:
                            avatars.filter((avatar) => avatar._id === userId)
                                .name ||
                            `${(Math.random() + 1)
                                .toString(36)
                                .substring(7)}.svg`
                    }))
                ) || []
        )
    );

    const handleCommentDelete = (commentId) => {
        api.comments.remove(commentId).then((data) =>
            setComments(
                data.sort((a, b) => {
                    if (a.created_at < b.created_at) return -1;
                    if (a.created_at > b.created_at) return 1;
                    return 0;
                })
            )
        );
    };

    if (comments.length === 0) return;

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h2>Comments</h2>
                <hr />
                <div className="bg-light card-body  mb-3">
                    <div className="row">
                        <div className="col">
                            <div className="d-flex flex-start ">
                                <img
                                    src="https://avatars.dicebear.com/api/avataaars/qweqwdas"
                                    className="rounded-circle shadow-1-strong me-3"
                                    alt="avatar"
                                    width="65"
                                    height="65"
                                />
                                <div className="flex-grow-1 flex-shrink-1">
                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <p className="mb-1 ">
                                                {"//User Name"}
                                                <span className="small">
                                                    {"//Published Time"}
                                                </span>
                                            </p>
                                            <button
                                                className="btn btn-sm text-primary d-flex align-items-center"
                                                onClick={() =>
                                                    handleCommentDelete()
                                                }
                                            >
                                                <i className="bi bi-x-lg"></i>
                                            </button>
                                        </div>
                                        <p className="small mb-0">
                                            {"//Comment content"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ViewerCommentCard.propTypes = {
    userId: PropTypes.string
};

export default ViewerCommentCard;
