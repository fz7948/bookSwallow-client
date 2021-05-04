import * as commentsAPI from '../lib/api/comments';

const GET_COMMENTS = 'GET_COMMENTS';
const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
const GET_COMMENTS_ERROR = 'GET_COMMENTS_SUCCESS';

const CREATE_COMMENT = 'CREATE_COMMENT';
const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
const CREATE_COMMENT_ERROR = 'CREATE_COMMENT_ERROR';

const UPDATE_COMMENT = 'UPDATE_COMMENT';
const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS';
const UPDATE_COMMENT_ERROR = 'UPDATE_COMMENT_ERROR';

const DELETE_COMMENT = 'DELETE_COMMENT';
const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
const DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR';

export const getComments = (bookId) => async (dispatch) => {
  dispatch({ type: GET_COMMENTS });
  try {
    const comments = await commentsAPI.getComments(bookId);
    dispatch({
      type: GET_COMMENTS_SUCCESS,
      comments,
    });
  } catch (error) {
    dispatch({
      type: GET_COMMENTS_ERROR,
      error,
    });
  }
};

export const createComment = (bookId, token) => async (dispatch, getState) => {
  dispatch({ type: CREATE_COMMENT });
  try {
    const comment = await commentsAPI.createComment(bookId, token);

    dispatch({
      type: CREATE_COMMENT_SUCCESS,
      comments: getState.concat(comment),
    });
  } catch (error) {
    dispatch({
      type: CREATE_COMMENT_ERROR,
    });
  }
};

const initailState = {
  comments: {
    loading: false,
    data: null,
    error: null,
  },
};

export default function comments(state = initailState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: {
          loading: false,
          data: action.comments,
          error: null,
        },
      };
    case GET_COMMENTS_ERROR:
      return {
        ...state,
        comments: {
          loading: false,
          data: null,
          error: action.error,
        },
      };
    default:
      return state;
  }
}
