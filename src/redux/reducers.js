import { combineReducers } from 'redux';
import { SET_SEARCH_QUERY, SET_SEARCH_RESULTS } from './action-types';

const searchQuery = (state = "", action) => {
    switch(action.type){
        case SET_SEARCH_QUERY:
            return action.query;
        default:
            return state;
    }
};

const searchResults = (state = [], action) => {
    switch(action.type) {
        case SET_SEARCH_RESULTS: 
            return action.results;
        default:
            return state;
    }
};

export default combineReducers({
    searchQuery,
    searchResults,
});
