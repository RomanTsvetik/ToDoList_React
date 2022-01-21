import React, { useState } from "react";
import Todo from "./Todo";
import FilterTodos from "./FilterTodos";
import Form from "./Form";

//collection of all display actions in Map
const FILTER_ACTION = {
    All: () => true,
    Done: (todo) => todo.completed,
    Todo: (todo) => !todo.completed,
};

const filterNames = Object.keys(FILTER_ACTION);

function App(props) {
    const [todosDB, setTodos] = useState(props.todosDB);
    const [filter, setFilter] = useState("All");

    const todoList = todosDB
        .filter(FILTER_ACTION[filter])
        .map((todo) => (
            <Todo
                key={todo.id}
                id={todo.id}
                name={todo.name}
                completed={todo.completed}
                toggleStatus={toggleStatus}
                deleteTodo={deleteTodo}
            />
        ));

    function createTodo(name) {
        const newTodo = {
            id: Date.now(),
            name: name,
            completed: false,
            toggleStatus,
            className: "todo"
        };

        fetch("http://localhost:8000/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTodo),
        }).then((response) => response.json());

        setTodos([...todosDB, newTodo]);
    }

    function toggleStatus(id) {
        const updateTodo = todosDB.map((todo) => {
            if (id === todo.id) return { ...todo, completed: !todo.completed };

            return todo;
        });

        fetch(`http://localhost:8000/todos/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: !updateTodo.completed }),
        }).then((response) => response.json());

        setTodos(updateTodo);
    }

    function deleteTodo(id) {
        const updateTodoBD = todosDB.filter((todo) => id !== todo.id);

        fetch("http://localhost:8000/todos/" + id, {
            method: "DELETE",
        }).then((response) => response.json());

        setTodos(updateTodoBD);
    }

    const filterList = filterNames.map((name) => (
        <FilterTodos
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
    ));

    return (
        <div className="App  mt-5">
            <div className="container col-12">
                <h1>ToDo List</h1>
                <Form createTodo={createTodo} />
                <div className="row justify-content-between mb-3 filters">
                    {filterList}
                </div>
                <div className="row">{todoList}</div>
            </div>
        </div>
    );
}

export default App;
