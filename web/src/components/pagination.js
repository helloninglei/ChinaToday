import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import {useSelector} from "react-redux";


function MyPagenation() {

    const {pageNumber, pageSize, totalCount} = useSelector(state=>({
        pageNumber: state.data.get('pageNumber'),
        pageSize: state.data.get('pageSize'),
        totalCount: state.data.get('totalCount')
    }));

    const totalPage = Math.ceil(totalCount/pageSize);
    const minPage = Math.max(1, pageNumber-3);
    const maxPage = Math.min(totalPage, pageNumber-minPage+10);

    function getPageItems() {

        return (
            Array(maxPage-minPage).fill(0).map((page, index)=>(
                <PaginationItem>
                    <PaginationLink href="#">
                        {minPage+index}
                    </PaginationLink>
                </PaginationItem>
            ))
        )
    }

    return (<Pagination aria-label="Page navigation example">
        <PaginationItem>
            <PaginationLink first href="#" />
        </PaginationItem>
        <PaginationItem>
            <PaginationLink previous href="#" />
        </PaginationItem>
        {getPageItems()}
        <PaginationItem>
            <PaginationLink next href="#" />
        </PaginationItem>
        <PaginationItem>
            <PaginationLink last href="#" />
        </PaginationItem>
    </Pagination>)

}

export default MyPagenation