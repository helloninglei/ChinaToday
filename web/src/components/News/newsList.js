import React, {useEffect, useCallback} from 'react';
import { useMappedState, useDispatch } from "redux-react-hook";
import { Table } from 'reactstrap';
import { EL_ENDPOINT } from '../../config'
import { UPDATE_TOTAL_COUNT, UPDATE_NEWS_LIST } from '../../reducers/actionTypes'
const axios = require('axios');



function NewsList() {
    const mapState = useCallback(state => ({
        newsList: state.data.get('newsList'),
        pageSize: state.data.get('pageSize'),
        pageNumber: state.data.get('pageNumber')
    }));

    const dispatch = useDispatch();

    const { newsList, pageSize,  pageNumber} = useMappedState(mapState);

    useEffect(() => {
        axios({
            method: 'get',
            url: '/elasticsearch/article/govementNews/_search?from=' + `${pageNumber * pageSize}` + '&size=' + `${pageSize}`,
            data: {
                "query": { "match_all": {} },
                "_source": ["title", "publish_time", 'publisher', 'content'],

            }
        }).then(function (response) {
                console.log(response.data.hits.total);
                dispatch({type:UPDATE_NEWS_LIST, payload: response.data.hits.hits})
                dispatch({type:UPDATE_TOTAL_COUNT, payload: response.data.hits.total})
            });
    },[]);

    function selectNews(newsItem) {
      dispatch({type:"UPDATE_SELECTED_NEWS", payload: newsItem._source});
      dispatch({type:"DISPLAY_NEWS_DETAIL", payload:true})
    };

    function displayTableRows() {
        return (
            newsList.map((newsItem, index)=>(
                <tr onClick={()=>{selectNews(newsItem)}}>
                    <td>{index+1}</td>
                    <td>{newsItem._source.title}
                        <div>
                            <span style={{"font-size": "12px"}}>{newsItem._source.publisher}</span>
                            <span style={{"font-size": "12px", "margin-left": "10px"}}>{newsItem._source.publish_time}</span>
                        </div>
                    </td>
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
                </tr>
                </thead>
                <tbody>
                {displayTableRows()}
                </tbody>
            </Table>
        </div>
    );
}

export default NewsList;