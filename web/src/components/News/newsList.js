import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Table } from 'reactstrap';
import { List } from "immutable";
import MyPagenation from "../pagination"
import { EL_ENDPOINT } from '../../config'
import { UPDATE_TOTAL_COUNT } from '../../reducers/actionTypes'
const axios = require('axios');

function NewsList() {

    const {pageNumber, pageSize} = useSelector(state=>({
        pageNumber: state.data.get('pageNumber'),
        pageSize: state.data.get('pageSize'),
    }));

    const dispatch = useDispatch();

    const [newsList, setNewsList] = useState(List());

    useEffect(() => {
        axios({
            method: 'get',
            url: '/elasticsearch/article/govementNews/_search?from=' + `${pageNumber}` + '&size=' + `${pageSize}`,
            data: {
                "query": { "match_all": {} },
                "_source": ["title", "publish_time", 'publisher', 'content'],

            }
        })
            .then(function (response) {
                setNewsList(response.data.hits.hits);
                dispatch({type:UPDATE_TOTAL_COUNT, payload: response.data.hits.total})
            });
    });
    
    function displayTableRows() {
        return (
            newsList.map((newsItem, index)=>(
                <tr>
                    <td>{index+1}</td>
                    <td>{newsItem._source.title}</td>
                    <td>{newsItem._source.publish_time}</td>
                    <td>{newsItem._source.publisher}</td>
                </tr>
                )

            )
        )
    }

    

    return (
        <div>
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>PublishTime</th>
                    <th>Publisher</th>
                </tr>
                </thead>
                <tbody>
                {displayTableRows()}
                </tbody>
            </Table>
            <MyPagenation />
        </div>
    );
}

export default NewsList;