import React from "react";
import PropTypes from "prop-types";
const ToDoItem = props => {
    return (
        <a href="#" className="list-group-item list-group-item-action">
            {props.todo.label}&nbsp;
            {
                props.todo.done ?
                    (
                        <span className="badge badge-success">Ready</span>
                    ) : (
                        <span className="badge badge-warning">No Ready</span>
                    )
            }
            <i className="fa fa-trash float-right"></i>
        </a >
    )
}
ToDoItem.propTypes = {
    todo: PropTypes.object.isRequired
}
export default ToDoItem;