import React from 'react';
import { Link } from 'react-router-dom';
import { Task } from '../types';
import './TaskList.css';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete }) => {
  const getPriorityClass = (priority: string): string => {
    switch (priority) {
      case 'High':
        return 'priority-high';
      case 'Medium':
        return 'priority-medium';
      case 'Low':
        return 'priority-low';
      default:
        return '';
    }
  };

  const getStatusClass = (status: string): string => {
    switch (status) {
      case 'To Do':
        return 'status-todo';
      case 'In Progress':
        return 'status-progress';
      case 'Completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks yet. Create one!</p>
      ) : (
        tasks.map(task => (
          <div className="task-item" key={task.id}>
            <div className="task-header">
              <h3 className="task-title">
                <Link to={`/task/${task.id}`}>{task.title}</Link>
              </h3>
              <div className="task-actions">
                <Link to={`/task/edit/${task.id}`} className="edit-btn">Edit</Link>
                <button 
                  className="delete-btn" 
                  onClick={() => onDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="task-description">{task.description}</p>
            <div className="task-footer">
              <span className={`task-priority ${getPriorityClass(task.priority)}`}>
                {task.priority}
              </span>
              <span className={`task-status ${getStatusClass(task.status)}`}>
                {task.status}
              </span>
              <span className="task-due-date">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
