import React from 'react';
import tick from '../assets/tick.png';
import not_tick from '../assets/not_tick.png';
import delete_icon from '../assets/delete.png';

const TodoItem = ({ id, text, completed, onToggleComplete, onRemove }) => {
  return (
    <div className="flex items-center my-3 gap-2">
      {/* Task completion toggle */}
      <div 
        className="flex flex-1 items-center gap-4 cursor-pointer" 
        onClick={() => onToggleComplete(id)} // Handle task completion toggle
      >
        <img
          src={completed ? tick : not_tick}
          alt={completed ? "Completed task" : "Incomplete task"}
          aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
          className="w-7 h-7"
        />
        <p className={`text-slate-700 ml-2 text-[17px] ${completed ? 'line-through' : ''}`}>
          {text}
        </p>
      </div>
      {/* Task deletion */}
      <img
        src={delete_icon}
        alt="Delete task"
        aria-label="Delete task"
        className="w-3.5 h-3.5 cursor-pointer"
        onClick={() => onRemove(id)} // Handle task removal
      />
    </div>
  );
};

export default TodoItem;