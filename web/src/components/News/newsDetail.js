import React, { useCallback } from 'react'
import { useMappedState } from 'redux-react-hook'
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';


function NewsDetail() {
    const mapState = useCallback(state => ({selectedNews: state.data.get("selectedNews")}));
    const { selectedNews } = useMappedState(mapState);

    return (
        <div dangerouslySetInnerHTML={{__html: selectedNews.content}}></div>
    )
}

export default NewsDetail