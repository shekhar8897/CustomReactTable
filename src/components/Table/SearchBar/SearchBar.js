import React from "react";
import styles from "./filterBlock.module.css";


const SearchBar = ({
    tableDataObject,
    handleQueriedValue,
    selectQueriedColumn,
}) => {
    return (
        <div className={styles.filterBlock}>
            <select name="select" onChange={selectQueriedColumn} >
                <option className={styles.optionBlock} value="SELECT" disabled selected>
                    SELECT
                </option>
                {tableDataObject.map((data) => (
                    <option
                        value={data.source}
                        name={data.columnName}
                        key={data.columnName}
                    >
                        {data.columnName}
                    </option>
                ))}
            </select>
            <input
                className={styles.searchBlock}
                onChange={handleQueriedValue}
                placeholder="Search..."
            />
        </div>
    );
};

export default SearchBar