import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

<FontAwesomeIcon icon={faTrashAlt} />

function Todo(props) {
    return (
        <div className="input-group mb">
            <div className="input-group-text todoCheckBox">
                <input
                    className="form-check-input mt-0 "
                    id={props.id}
                    type="checkbox"
                    defaultChecked={props.completed}
                    onChange={() => props.toggleStatus(props.id)}
                />
            </div>
            <input type="text" className="form-control" value={props.name} />
            <button
                className="delete-btn"
                type="button"
                onClick={() => props.deleteTodo(props.id)}
            >
                <FontAwesomeIcon icon={faTrashAlt} />
            </button>
        </div>
    );
}

export default Todo;
