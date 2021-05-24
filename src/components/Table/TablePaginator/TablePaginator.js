import React from "react";
import paginatorStyles from "./paginator.module.css"

const TablePaginator = ({setRowsPerPage, totalItems, handlePaginationValue, totalPages, changePage, currentPage}) => {

    const handleInput = (event) => {
        setRowsPerPage(event.target.value)
        handlePaginationValue(event.target.value)
    }

    const changeRowsPerPage = () => {
        handlePaginationValue()
    }

    const nextPage = () => {
        if(currentPage < totalPages - 1)
            changePage(currentPage + 1)
    }

    const previousPage = () => {
        if(currentPage > 0)
            changePage(currentPage - 1)
    }

    return(
        <div className={paginatorStyles.paginatedBox}>

            <div className={paginatorStyles.paginatedItemLeft}>
                <div className="show-items-number">
                    <p>Total Items : {totalItems}</p>
                </div>
            </div>

            <div className={paginatorStyles.paginatedItemRight}>
                <div className={paginatorStyles.showPages}>
                    <p>Items Per Page:</p>
                    <input name="rowsPerPage" type="number" placeholder={5} onChange={handleInput} min={1} max={totalItems}/>
                    {/* <button onClick={changeRowsPerPage}>ok</button> */}
                </div>
                
                <div className={paginatorStyles.showPages}>
                    <button onClick={previousPage}>
                        <i className="fas fa-angle-left" />
                    </button>
                    <div>
                        <p>{currentPage + 1} of {totalPages}</p>
                    </div>
                    <button  onClick={nextPage}>
                        <i className="fas fa-angle-right"/>
                    </button>
                </div>
            </div>

        </div>
    )
}


export default TablePaginator
