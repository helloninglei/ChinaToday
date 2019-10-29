import { List, Map } from "immutable";
import { UPDATE_NEWS_LIST } from "./actionTypes";

const initialState = Map({
    newsList: List()
});

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEWS_LIST:
            return state.set("newsList", action.payload);
        default:
            return state;
    }
};

export default dataReducer;