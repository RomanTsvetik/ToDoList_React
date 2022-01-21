import React from "react"; 

function FilterTodos(props) {

    return (
        <button type="button"
            onClick={() => props.setFilter(props.name)}
            className="filterButton"
        >
            {props.name}
        </button>
    )
}

export default FilterTodos