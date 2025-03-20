import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import Navbar from '../components/Navbar';
import './TaskDetail.css';

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTask, deleteTask } = useTasks();
  
  const task = getTask(id || '');

  if (!task) {
    return (
      <>
        <Navbar />
        <div className="task-detail">
          <h2>Task not found</h2>
          <Link to="/" className="back-btn">Back to Dashboard</Link>
        </div>
      </>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
      navigate('/');
    }
  };

  return (
    <>
      <Navbar />
      <div className="task-detail">
        <div className="detail-header">
          <h2>{task.title}</h2>
          <div className="detail-actions">
            <Link to={`/task/edit/${task.id}`} className="edit-btn">Edit</Link>
            <button className="delete-btn" onClick={handleDelete}>Delete</button>
          </div>
        </div>

        <div className="detail-info">
          <div className="detail-row">
            <span className="detail-label">Status:</span>
            <span className={`detail-value status-${task.status.toLowerCase().replace(' ', '-')}`}>
              {task.status}
            </span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Priority:</span>
            <span className={`detail-value priority-${task.priority.toLowerCase()}`}>
              {task.priority}
            </span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Due Date:</span>
            <span className="detail-value">
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Created:</span>
            <span className="detail-value">
              {new Date(task.createdAt).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="task-description">
          <h3>Description</h3>
          <p>{task.description}</p>
        </div>
        
        <Link to="/" className="back-btn">Back to Dashboard</Link>
      </div>
    </>
  );
};

export default TaskDetail;
