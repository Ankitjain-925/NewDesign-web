import {
    GET_QUESTION_REQUEST,
    GET_QUESTION_FAIL,
    GET_QUESTION_SUCCESS,
} from "../actiontypes";

const data = {
    question: {},
};

const Questions = (state = data, action) => {
    switch (action.type) {
        case GET_QUESTION_REQUEST:
            return { question: { QUESTION: false } };
        case GET_QUESTION_SUCCESS:
            return { question: { ...action.payload } };
        case GET_QUESTION_FAIL:
            return { question: { QUESTION: false } };
        default:
            return state;
    }
};
export default Questions;