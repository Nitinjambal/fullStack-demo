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
      const response = await axios.get('api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (task.trim()) {
      const newTodo = { id: Date.now(), task };
      try {
        const response = await axios.post('api/todos', newTodo);
        setTodos([...todos, response.data]);
        setTask('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`api/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#1a1a1a', 
    }}>
      <div style={{ 
        padding: '20px',
        border: "10px solid gray", 
        borderRadius: '8px', 
        width: '300px',
        textAlign: 'center',
        backgroundColor: '#333', 
        color: '#fff' 
      }}>
        <h1>Todo App</h1>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
          style={{ 
            marginBottom: '10px', 
            width: '80%',
            padding: '8px', 
            borderRadius: '4px', 
            border: '1px solid #ddd' 
          }}
        />
        <button 
          onClick={addTodo} 
          style={{ 
            marginBottom: '20px', 
            padding: '8px 16px',
            backgroundColor: '#007bff', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer' 
          }}
        >
          Add Task
        </button>
        <ul style={{ 
          listStyleType: 'none', 
          padding: 0,
          margin: 0
        }}>
          {todos.map(todo => (
            <li 
              key={todo.id} 
              style={{ 
                marginBottom: '10px', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center'
              }}
            >
              {todo.task}
              <button 
                onClick={() => deleteTodo(todo.id)} 
                style={{
                  backgroundColor: '#dc3545', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '4px', 
                  cursor: 'pointer', 
                  padding: '4px 8px' 
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
