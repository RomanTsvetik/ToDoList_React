import React, {useState} from "react";

function Form(props) {
    //fixing initial state for the input
    const [name, setName] = useState('')

    function handleChange(e) {
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.createTodo(name);
        setName('')
    }


    return (
        <form
            onSubmit={handleSubmit}
            className="row justify-content-between mt-3 mb-3 todoForm"
        >
            <input
                type="text"
                id="new-todo-input"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
                placeholder="What needs to be done?"
                className="col-9"
            />
            <button type="submit" className="col-2 button add-btn">
                Add
            </button>
        </form>
    );
}

export default Form;
