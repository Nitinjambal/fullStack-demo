import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (task.trim()) {
      const newTodo = { id: Date.now(), task };
      try {
        const response = await axios.post('/api/todos', newTodo);
        setTodos([...todos, response.data]);
        setTask('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div style={{ 
      marginLeft:"600px",
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh'
    }}>
      <div style={{ 
        padding: '20px',
        border: "20px solid gray", 
        width: '300px',
        textAlign: 'center'
      }}>
        <h1>Todo App</h1>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
          style={{ marginBottom: '10px', width: '80%' }}
        />
        <button onClick={addTodo} style={{ marginBottom: '20px' }}>Add Task</button>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {todos.map(todo => (
            <li key={todo.id} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {todo.task}
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
