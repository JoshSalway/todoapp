import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import todoIcon from '../assets/todo_icon.png';
import TodoItem from './TodoItem';

const Todo = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [input, setInput] = useState('');

  // Save todos to local storage when they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const add = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return; // Prevent empty or whitespace-only tasks

    const newTodo = {
      id: uuidv4(),
      text: trimmedInput,
      completed: false,
    };

    setTodos([...todos, newTodo]); // Add the new todo object
    setInput(''); // Clear input field
  };

  const remove = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id)); // Remove task by id
  };

  const onToggleComplete = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo, 
            completed: !todo.completed,
          };
        } else {
          return todo;
        }
      })
    )
  }

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      {/* Title */}
      <div className="flex items-center mt-7 gap-2">
        <img src={todoIcon} alt="Todo Icon" className="w-6 h-6" />
        <h1 className="text-3xl font-semibold">Add a task</h1>
      </div>
      
      {/* Input box */}
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)} // Handle input changes
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add your task"
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium"
        >
          ADD +
        </button>
      </div>
      
      {/* Todo list */}
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
            onToggleComplete={onToggleComplete} // Pass toggle function
            onRemove={remove} // Pass remove function
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;