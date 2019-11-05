import { List, Map } from "immutable";
import {
    UPDATE_NEWS_LIST,
    UPDATE_TOTAL_COUNT,
    UPDATE_PAGE_NUMBER,
    UPDATE_SELECTED_NEWS
} from "./actionTypes";

const initialState = Map({
    newsList: List(),
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    selectedNews: {}
});

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEWS_LIST:
            return state.set("newsList", action.payload);
        case UPDATE_TOTAL_COUNT:
            return state.set("totalCount", action.payload);
        case UPDATE_PAGE_NUMBER:
            return state.set("pageNumber", action.payload);
        case UPDATE_SELECTED_NEWS:
            console.log("UPDATE_SELECTED_NEWS:", action.payload);
            return state.set('selectedNews', action.payload);
        default:
            return state;

    }
};

export default dataReducer;