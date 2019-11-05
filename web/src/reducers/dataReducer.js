import { List, Map } from "immutable";
import {
    UPDATE_NEWS_LIST,
    UPDATE_TOTAL_COUNT,
    UPDATE_PAGE_NUMBER,
    UPDATE_SELECTED_NEWS,
    DISPLAY_NEWS_DETAIL
} from "./actionTypes";

const initialState = Map({
    newsList: List(),
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    selectedNews: {},
    showNewsDetail: false
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
            return state.set('selectedNews', action.payload);
        case DISPLAY_NEWS_DETAIL:
            return state.set("showNewsDetail", action.payload);
        default:
            return state;

    }
};

export default dataReducer;