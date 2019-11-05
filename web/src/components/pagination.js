import React, {useCallback} from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useMappedState, useDispatch } from "redux-react-hook";
import {UPDATE_NEWS_LIST, UPDATE_PAGE_NUMBER, UPDATE_TOTAL_COUNT} from "../reducers/actionTypes";
const axios = require('axios');


function MyPagenation() {

    const dispatch = useDispatch();

    const mapState = useCallback(state => ({
        totalCount: state.data.get('totalCount'),
        pageSize: state.data.get('pageSize'),
        pageNumber: state.data.get('pageNumber')
    }));

    const { totalCount, pageSize,  pageNumber} = useMappedState(mapState);

    function getPageItems() {
        const totalPage = Math.floor(totalCount/pageSize);
        const minPage = Math.max(0, pageNumber-5);
        const maxPage = Math.min(totalPage, minPage+10);
        return (
            Array(maxPage-minPage).fill(0).map((page, index)=>(
                <PaginationItem>
                    <PaginationLink href="#" onClick={()=>{setPage(minPage+ index)}}>
                        {minPage+index+1}
                    </PaginationLink>
                </PaginationItem>
            ))
        )
    }

    function setPage(page) {
        const url = '/elasticsearch/article/govementNews/_search?from=' + `${page * pageSize}` + '&size=' + `${pageSize}`;
        axios({
            method: 'get',
            url: url,
            data: {
                "query": { "match_all": {} },
                "_source": ["title", "publish_time", 'publisher', 'content'],

            }
        }).then(function (response) {
            dispatch({type: UPDATE_PAGE_NUMBER, payload: page});
            dispatch({type: UPDATE_NEWS_LIST, payload: response.data.hits.hits});
            dispatch({type: UPDATE_TOTAL_COUNT, payload: response.data.hits.total})
        });
    }

    return (
        <Pagination
            aria-label="Page navigation example"
            style={{ "align-items": "center", "justify-content": "center", "margin-bottom": "10px" }}
        >
            <PaginationItem>
                <PaginationLink first href="#" onClick={()=>{setPage(0)}} />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink previous href="#" onClick={()=>{Math.max(setPage(pageNumber-1), 0)}} />
            </PaginationItem>
            {getPageItems()}
            <PaginationItem>
                <PaginationLink next href="#" onClick={()=>{setPage(Math.min(Math.ceil(totalCount/pageSize), pageNumber+1))}}/>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink last href="#" onClick={()=>{setPage(Math.floor(totalCount/pageSize))}}/>
            </PaginationItem>
        </Pagination>
    )
}

export default MyPagenation