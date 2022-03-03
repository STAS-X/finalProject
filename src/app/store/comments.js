import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentRequested: (state) => {
            state.error = null;
            state.isLoading = true;
        },
        commentRecived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentAdd: (state, action) => {
            state.entities.push(action.payload);
            state.isLoading = false;
        },
        commentRemove: (state, action) => {
            state.entities = state.entities.filter((c) => c._id !== action.payload);
            state.isLoading = false;
        }
    }
});

const { reducer: commentReducer, actions } = commentSlice;
const {
    commentRequested,
    commentRecived,
    commentRemove,
    commentAdd,
    commentRequestFailed
} = actions;

export const loadCommentsList = (pageId) => async (dispatch, getState) => {
    dispatch(commentRequested());
    try {
        const { content } = await commentService.getComments(pageId);
        dispatch(commentRecived(content));
    } catch (error) {
        dispatch(commentRequestFailed(error.message));
    }
};

export const createComment = (data) => async (dispatch, getState) => {
    dispatch(commentRequested());
    try {
        const { content } = await commentService.createComment(data);
        if (content) dispatch(commentAdd(content));
    } catch (error) {
        dispatch(commentRequestFailed(error.message));
    }
};

export const removeComment = (commentId) => async (dispatch, getState) => {
    // console.log(isOutDated(lastFetch));
        dispatch(commentRequested());
        try {
            const { content } = await commentService.removeComment(commentId);
            if (!content) dispatch(commentRemove(commentId));
        } catch (error) {
            dispatch(commentRequestFailed(error.message));
        }
    };

export const getCommentsList = () => (state) => {
    return state.comments.entities;
};
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;
export const getCommentByIds = (commentIds) => (state) => {
    if (state.comments.entities) {
        const commentsArray = [];
        for (const commentId of commentIds) {
            for (const comment of state.comments.entities) {
                if (comment._id === commentId) {
                    commentsArray.push(comment);
                    break;
                }
            }
        }
        return commentsArray;
    }
};

export default commentReducer;
