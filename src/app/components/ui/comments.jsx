import { orderBy } from "lodash";
import React, { useEffect } from "react";
import CommentsList, { AddCommentForm } from "../common/comments";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import {
    getCommentsLoadingStatus,
    getCommentsList,
    loadCommentsList,
    createComment,
    removeComment
} from "../../store/comments";
import { useParams } from "react-router-dom";
import { getAuthUser } from "../../store/users";

const Comments = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, []);

    const comments = useSelector(getCommentsList());
    const isLoading = useSelector(getCommentsLoadingStatus());
    const { _id: authId } = useSelector(getAuthUser());

    const handleSubmit = (data) => {
        if (data.content && data.content.trim() !== "") {
            dispatch(
                createComment({
                    ...data,
                    _id: nanoid(),
                    pageId: userId,
                    created_at: Date.now(),
                    userId: authId
                })
            );
        }
    };
    const handleRemoveComment = (id) => {
        dispatch(removeComment(id));
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoading ? (
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            "Loading..."
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
