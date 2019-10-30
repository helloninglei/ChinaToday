import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import { List } from "immutable";
import {EL_ENDPOINT} from '../../config'
const axios = require('axios');

function NewsList() {
    // 声明一个叫 "count" 的 state 变量
    const [newsList, setNewsList] = useState(List());

    useEffect(() => {
        axios({
            method: 'get',
            url: '/elasticsearch/article/govementNews/_search',
            data: {
                "query": { "match_all": {} },
                "_source": ["title", "publish_time", 'publisher', 'content']

            }
        })
            .then(function (response) {
                console.log(response)
            });
    });

    return (
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
            </tbody>
        </Table>
    );
}

export default NewsList;