import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios.get(API_URL).then((response) => setTodos(response.data));
  }, []);

  const addTodo = () => {
    axios.post(API_URL, { title: newTodo }).then((response) => {
      setTodos([...todos, response.data]);
      setNewTodo('');
    });
  };

  const updateTodo = (id, completed) => {
    const todo = todos.find((t) => t.id === id);
    axios.put(`${API_URL}/${id}`, { ...todo, completed: !completed }).then(() => {
      setTodos(
        todos.map((t) => (t.id === id ? { ...t, completed: !completed } : t))
      );
    });
  };

  const deleteTodo = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setTodos(todos.filter((t) => t.id !== id));
    });
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
              onClick={() => updateTodo(todo.id, todo.completed)}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
