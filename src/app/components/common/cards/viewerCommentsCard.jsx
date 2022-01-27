import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CommentCard from "./commentCard";
import SearchStatus from "../../ui/searchStatus";
import api from "../../../api";

const ViewerCommentCard = ({ users, newCommentId }) => {
    const [avatars] = useState(
        () => JSON.parse(localStorage.getItem("avatars")) || []
    );

    const [comments, setComments] = useState([]);

    useEffect(() => {
        handleUpdateComments();
        return () => {};
    }, [newCommentId]);

    const handleSortAndWrapArray = (arr) => {
        arr.sort((a, b) => {
            if (a.created_at < b.created_at) return -1;
            if (a.created_at > b.created_at) return 1;
            return 0;
        });
        const wrapComments =
            arr.map((comment) => ({
                ...comment,
                name: users.filter((user) => user._id === comment.userId)[0]
                    .name,
                avatar:
                    avatars.filter((avatar) => avatar._id === comment.userId)[0]
                        .name ||
                    `${(Math.random() + 1).toString(36).substring(7)}.svg`
            })) || [];
        return wrapComments;
    };

    const handleUpdateComments = () => {
        api.comments.fetchAll().then((data) => {
            console.log(data, "Добавление нового коммента");
            setComments(handleSortAndWrapArray(data));
        });
    };

    const handleCommentDelete = (commentId) => {
        api.comments.remove(commentId).then((data) => {
            console.log(data, "Без удаленного коммента");
            setComments(handleSortAndWrapArray(data));
        });
    };

    if (!comments) return <SearchStatus length={-3} />;

    return (
        <div className="card mb-3">
            {comments && comments.length > 0 && (
                <div className="card-body">
                    <h2>Comments</h2>
                    <hr />
                    {comments.map((comment) => (
                        <CommentCard
                            key={comment._id}
                            id={comment._id}
                            name={comment.name}
                            avatar={comment.avatar}
                            timeStamp={comment.created_at}
                            content={comment.content}
                            onCommentDelete={handleCommentDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

ViewerCommentCard.propTypes = {
    users: PropTypes.array,
    newCommentId: PropTypes.string
};

export default ViewerCommentCard;
