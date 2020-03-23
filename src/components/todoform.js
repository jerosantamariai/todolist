import React from "react";
import PropTypes from "prop-types";

const ToDoForm = props => {
    return (
        <div className="input-group mb-2">
            <div className="input-group-prepend">
            <select className="form-control" name = "done" onChange={props.handleChange}>
                <option value="">Done</option>
                <option value="true">Ready</option>
                <option value="false">No Ready</option>
            </select>
            </div>
            <input
                type="text"
                name="label"
                className="form-control"
                placeholder="Inserte la tarea aqui..."
                onKeyDown={props.handleKeyDown}
            />
        </div>
    )
}

ToDoForm.propTypes= {
    handleChange: PropTypes.func.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
}

export default ToDoForm;

