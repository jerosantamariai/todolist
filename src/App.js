import React, { useState, useEffect } from 'react';
import './App.css';
import ToDoList from './components/todolist';
import ToDoForm from './components/todoform';

function App() {
  const apiURL = "https://assets.breatheco.de/apis/fake/todos/user/jerosantamariai"

  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const [done, setDone] = useState(false);

  const [todos, setTodo] = useState([
    { label: 'Cras justo odio', done: false },
    { label: 'Dapibus ac facilisis in', done: false },
    { label: 'Morbi leo risus', done: true },
    { label: 'Porta ac consectetur ac', done: false },
    { label: 'Vestibulum at eros', done: true },
  ])

  const handleKeyDown = e => {
    if (e.keyCode === 13 && e.target.value !== "") { //si se hace enter o es distinto de vacio se ejecuta la tarea
      setTodo([...todos, { label: e.target.value, done: done !== '' ? done : false }]); //agrega una tarea con lo q agregue en label y la opxion del done
      e.target.value = ""; //despues limpio el input para poder escribir de nuevo y por eso se deja en false
      setDone(false);
    }
  }

  const handleChange = e => { //si selecciono una opcion en select, se vuelve true
    if (e.target.value === "") {
      setDone(false)

    }
    if (e.target.value === "false") {
      setDone(false)
    }
    if (e.target.value === "true") {
      setDone(true)
    }
  }

  const handleClickTrash = pos => {
    // console.log("eliminando la posicion: " + pos);
    let odos = todos.splice(pos, 1); // en esa posicion eliminar 1 elemento
    setTodo([...todos]);
  }

  const completeToDo = pos => {
    todos[pos].done = !todos[pos].done;
    setTodo([...todos]);
  }

  const getTodos = url => { //recibe un url, hago la peticion fetch y si hay un error manda el data
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        if (data.msg) {
          setError(data);
        }
        setTodo([...data]) //para q guarde en el arreglo la variable q viene por defeecto q se definio en const [todos]
      })
      .catch(error => {
        console.log(error);
      })
  }

  const createTodos = url => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.msg) {
          setError(data);
        }
        if (data.result) // si esta el resultado, hacer un setResult de la data
        {
          setResult(data);
          setError(null); // para q no muestre el error de q no existe el usuario
          getTodos(apiURL); //cargar denuevo la lista
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  const deleteTodos = url => { //
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.result) {
          setResult(data);
          setTodo([]); //cuando se hace click borra toda la lista
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  const updateTodos = url => {
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.msg) {
          setError(data);
        }
        if (data.result) // si esta el resultado, hacer un setResult de la data
        {
          setResult(data);
          setError(null); // para q no muestre el error de q no existe el usuario
          getTodos(apiURL); //cargar denuevo la lista
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    getTodos(apiURL);
  }, [])


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-center">
            <h1>ToDo List</h1>
          </div>
        </div>
        {
          !!error &&
          (
            <div className="alert alert-danger" role="alert">
              {error.msg}
              <div className="alert alert-warning alert-dismissible fade show" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          )
        }
        {
          !!result &&
          (
            <div className="alert alert-success" role="alert">
              {result.result}
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )
        }
        <div className="row pb-2">
          <div className="col">
            <button
              className="btn btn-primary btn-block btn-sm"
              onClick={() => createTodos(apiURL)}
            >
              Crear Lista
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-warning btn-block btn-sm"
              onClick={() => updateTodos(apiURL)}
            >
              Guardar Lista
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-danger btn-block btn-sm"
              onClick={() => deleteTodos(apiURL)}
            >
              Borrar Lista
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <ToDoForm handleChange={handleChange} handleKeyDown={handleKeyDown} done={done} />
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ToDoList todos={todos} handleClickTrash={handleClickTrash} completeToDo={completeToDo} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
