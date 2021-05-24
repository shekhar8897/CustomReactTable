import React, { useEffect, useState } from 'react'
import Table from "../Table/table"

const MyTable = () => {

    const [dummyData, setDummyData] = useState([])
    useEffect(() => {

        fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json())
        .then(json => setDummyData(json) )
            
    }, [])


    let tableDataObject = [
        {
            columnName: "Id",
            source: "id",
            rowType: "default",
        },
        {
            columnName: "albumId",
            source: "albumId",
            rowType: "default",
        },
        {
            columnName: "Title",
            source: "title",
            rowType:"default",
        },
        {
            columnName: "Url",
            source: "url",
            rowType:"default",
        },
        {
            columnName: "thumbnail Url",
            source: "thumbnailUrl",
            rowType:"default",
        },
    ]

    return (
        <div>
            <Table dummyData={dummyData} 
                tableDataObject={tableDataObject} 
                searchable 
                pagination 
                draggable
            />
        </div>
    )
}

export default MyTable
