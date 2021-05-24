import React, { useEffect, useState } from "react"
import sortTableData from "./TableSort"
import tableStyles from "./table.module.css"
import SearchBar from "./SearchBar/SearchBar"
import TablePaginator from "./TablePaginator/TablePaginator"

const getCellValue = (item, rowData) => {
    switch (item.rowType) {
        case "bool":
            return rowData[item.source] ? item.boolValue[0] : item.boolValue[1];
        default:
            return rowData[item.source];
    }
};

const TableHeader=(props)=>{

    const [caretDirection,setCaretDirection]=useState(props.sortOrder);
    
    function changeDirection(event){
        event.preventDefault();
        caretDirection==="asc"?setCaretDirection("desc"):setCaretDirection("asc");
        props.sortData(event,props.item.source);
        
    }

    return(
        <th  onClick={changeDirection}>
        {props.item.columnName}
            <span>
                <i className={
                        caretDirection === "desc"
                            ? "fas fa-caret-down"
                            : "fas fa-caret-up"
                    }
                ></i>
            </span>
        </th>
    );
}

const Table = ({ dummyData, tableDataObject, searchable, pagination, draggable }) => {
    const [sortOrder, setSortOrder] = useState("desc");
    const [queriedValue, setQueriedValue] = useState("");
    const [queriedColumn, setQueriedColumns] = useState("body");
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [pageNumber, setPageNumber] = useState(0)
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        setApiData(dummyData);
        getPaginatedData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dummyData]);

    /* -------------sort start------------------ */

    const sortData = (event,source) => {
        
        event.preventDefault();
        changeSortOrder();
        dummyData = sortTableData(apiData, sortOrder, source);
        setApiData(dummyData);
        
    };

    const changeSortOrder = () => {
        if (sortOrder === "desc") setSortOrder("asc");
        else setSortOrder("desc");
    };

    /* ---------------sort end------------------*/

    /* ------------- filter -------------*/
    const filterJSONData = (query) => {
        if (!checkInputValue(query)) {
                dummyData = dummyData.filter((rowData) =>
                    rowData[queriedColumn].toString()
                        .toLowerCase()
                        .includes(query.toLowerCase())
                )
            setPageNumber(0)
            setApiData(dummyData)
        }
        else{
            getPaginatedData(pageNumber * rowsPerPage,pageNumber*rowsPerPage + rowsPerPage) 
        }

    };

    const selectQueriedColumn = (event) => {
        setQueriedColumns(event.target.value);
    };

    const handleQueriedValue = (event) => {
        setQueriedValue(event.target.value);
        filterJSONData(event.target.value);
    };
    /*  -------------- filter end ----------------*/


    const checkInputValue = (query) => {
        return query === ""
    }

    /* --------------------Pagination start-----------------*/
    const handlePaginationValue = (value) => {
        if(value==="")
            getPaginatedData(0 * 5,(parseInt(0 * 5) +parseInt(5)))
        else
            getPaginatedData(0 * value,(parseInt(0 * value) +parseInt(value)))
        setPageNumber(0)
    }

    const changePage = (value) => {
        setPageNumber(parseInt(value))
        getPaginatedData(value * rowsPerPage,(parseInt(value * rowsPerPage) +parseInt(rowsPerPage)))
        
    }

    const getPaginatedData = (startIndex=0,endIndex=rowsPerPage) => {
        dummyData = dummyData.slice(startIndex,endIndex)
        setApiData(dummyData)
    }

    /*---------pagination end-----------------------*/

    return (
        <div>
            {searchable && (
                <SearchBar
                    tableDataObject={tableDataObject}
                    queriedValue={queriedValue}
                    selectQueriedColumn={selectQueriedColumn}
                    handleQueriedValue={handleQueriedValue}
                />
            )}

            <table key={"table09"} className={tableStyles.tableBlock}>
                <thead>
                    <tr>
                        {tableDataObject.map((item) => (
                            <TableHeader key={item.columnName} item={item} sortOrder={sortOrder} sortData={sortData}/>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {apiData.map((rowData) => (
                        <tr key={rowData.id}>
                            {tableDataObject.map((item, index) => (
                                <td key={index}>{getCellValue(item, rowData)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                pagination &&
                    <TablePaginator handlePaginationValue={handlePaginationValue} 
                        setRowsPerPage={setRowsPerPage} 
                        totalItems={dummyData.length}
                        totalPages={Math.ceil((dummyData.length)/rowsPerPage)}
                        changePage={changePage}
                        currentPage={pageNumber}
                    />
            }
        </div>
    );
};

export default Table;