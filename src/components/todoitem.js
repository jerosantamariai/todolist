import React from 'react';
import PropTypes from 'prop-types';

const ToDoItem = props => {
    return (
        <li className="list-group-item list-group-item-action">
            <a href="/#" className="text-reset"
                onClick={(e) => {
                    e.preventDefault();
                    props.completeToDo(props.pos);
                }}
            >
                {props.todo.label}&nbsp;
            {
                    props.todo.done ?
                        (
                            <span className="badge badge-success">Ready</span>
                        ) : (
                            <span className="badge badge-warning">No Ready</span>
                        )
                }
            </a >
            <i className="fa fa-trash float-right" onClick={() => props.handleClickTrash(props.pos)}></i>
        </li>
    )
}

ToDoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    handleClickTrash: PropTypes.func.isRequired,
    pos: PropTypes.number.isRequired
}

export default ToDoItem;