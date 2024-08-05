import { SET_SEARCH_QUERY, SET_SEARCH_RESULTS } from "./action-types";

export const setSearchQuery = (query) => ({
    type: SET_SEARCH_QUERY,
    query,
});

export const setSearchResults = (results) => ({
    type: SET_SEARCH_RESULTS,
    results,
});

export const fetchSearchResults = (query, token) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`https://your-api-endpoint/movies?search=${query}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            dispatch(setSearchResults(data));
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
};


