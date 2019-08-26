import {combineReducers} from 'redux';

import {OPEN_ROOT_MODAL, CLOSE_ROOT_MODAL} from './action_types';

const rootModalVisible = (state = false, action) => {
    switch (action.type) {
    case OPEN_ROOT_MODAL:
        return true;
    case CLOSE_ROOT_MODAL:
        return false;
    default:
        return state;
    }
};

const message = (state = '', action) => {
    switch (action.type) {
    case OPEN_ROOT_MODAL:
        return action.message;
    case CLOSE_ROOT_MODAL:
        return '';
    default:
        return state;
    }
};

export default combineReducers({
    rootModalVisible,
    message,
});

