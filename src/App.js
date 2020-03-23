import React, { useState } from 'react';
import './App.css';
import ToDoList from './components/todolist';
import ToDoForm from './components/todoform';

function App() {

  const [done, setDone] = useState(false);
  const [todos, setTodo] = useState([
    { label: 'Cras justo odio', done: true },
    { label: 'Dapibus ac facilisis in', done: false },
    { label: 'Morbi leo risus', done: true },
    { label: 'Porta ac consectetur ac', done: false },
    { label: 'Vestibulum at eros', done: false },
  ])

  const handleKeyDown = e => {
    if (e.keyCode === 13 && e.target.value !== ""){
      setTodo([...todos, {label: e.target.value, done: done}]);
      e.target.value = "";
      setDone("");
    }
  }
  const handleChange = e => {
      if(e.target.value === ""){
        setDone("")
      }
      if(e.target.value === "false"){
        setDone(false)
      }
      if(e.target.value === "true"){
        setDone(true)
      }
  }




  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-center">
            <h1>ToDo List</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ToDoForm handleChange={handleChange} handleKeyDown={handleKeyDown} />
            <br></br>
            <ToDoList todos={todos} />
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
