import { List, Map } from "immutable";
import { UPDATE_NEWS_LIST, UPDATE_TOTAL_COUNT } from "./actionTypes";

const initialState = Map({
    newsList: List(),
    pageNumber: 0,
    pageSize: 20,
    totalCount: 0
});

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEWS_LIST:
            return state.set("newsList", action.payload);
        case UPDATE_TOTAL_COUNT:
            return state.set("totalCount", action.payload);
        default:
            return state;

    }
};

export default dataReducer;