import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]); // State to store the list of todos
  const [newTodo, setNewTodo] = useState(""); // State to manage input field

  // Fetch todos from the backend
  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/todos");
      setTodos(response.data); // Update the state with the fetched todos
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Add a new todo
  const addTodo = async () => {
    if (!newTodo.trim()) return; // Prevent adding empty items
    try {
      const response = await axios.post("http://localhost:5000/api/todos", {
        title: newTodo,
      });

      // Update the state immediately with the new item
      setTodos([...todos, { id: response.data.id, title: newTodo, completed: 0 }]);
      setNewTodo(""); // Clear input field
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      
      // Update the state by filtering out the deleted item
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Fetch todos when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>To-Do List</h1>

      {/* Input Field */}
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new to-do..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* Display To-Do List */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span>{todo.title}</span>
            <button onClick={() => deleteTodo(todo.id)} style={{ color: "red" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
