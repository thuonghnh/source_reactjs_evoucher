import React, { useState, useEffect } from 'react'
import PaginationClient from './PaginationClient';
import PaginationServer from './PaginationServer';
import './style.css';
const PaggingTest = () => {
    const [pageOfItems, setPageOfItems] = useState([])
    const [exampleItems, setExampleItems] = useState([...Array(150).keys()].map(i => ({ id: (i + 1), name: 'Item ' + (i + 1) })))
    useEffect(() => {
        let termData = [...exampleItems]
        setPageOfItems(termData.splice(0, 10));
    }, [])
    const onChangePageServer = (pager) => {
        // update state with new page of items
        const { pageIndex, pageSize } = pager;
        //api sẽ trả về data để map set state lại
        let termData = [...exampleItems]
        // console.log(termData.splice(pageIndex, pageSize))
        setPageOfItems(termData.splice(pageIndex, pageSize))
    }

    const onChangePageClient = (pageOfItems) => {
        // update state with new page of items
        setPageOfItems(pageOfItems)
    }

    return (
        <div>
            <div className="text-center">
                {pageOfItems.map(item =>
                    <div key={item.id}>{item.name}</div>
                )}
                <PaginationServer totalItems={exampleItems.length} onChangePage={onChangePageServer} />
                {/* <PaginationClient items={exampleItems} totalItems={exampleItems.length} onChangePage={onChangePageClient} /> */}
            </div>
        </div>
    )
}

export default PaggingTest
