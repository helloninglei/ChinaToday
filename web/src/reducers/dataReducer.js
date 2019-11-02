import { List, Map } from "immutable";
import { UPDATE_NEWS_LIST, UPDATE_TOTAL_COUNT, UPDATE_PAGE_NUMBER } from "./actionTypes";

const initialState = Map({
    newsList: List(),
    pageNumber: 0,
    pageSize: 10,
    totalCount: 0
});

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEWS_LIST:
            console.log("UPDATE_NEWS_LIST:", action.payload);
            return state.set("newsList", action.payload);
        case UPDATE_TOTAL_COUNT:
            return state.set("totalCount", action.payload);
        case UPDATE_PAGE_NUMBER:
            return state.set("pageNumber", action.payload);
        default:
            return state;

    }
};

export default dataReducer;