import React from "react";
import PropTypes from "prop-types";
import ToDoItem from "./todoitem";
const ToDoList = props => {
    return (
        <div className="list-group">
            {
                props.todos.map((todo, i) =>{
                    return <ToDoItem todo={todo} />
                })
            }
        </div>
    )
}
ToDoList.propTypes = {
    todos: PropTypes.array.isRequired
}
export default ToDoList;