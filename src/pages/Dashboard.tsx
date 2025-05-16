// Dashboard page displays user's tasks and filter controls
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import TaskList from '../components/TaskList';
import { TaskStatus } from '../types';

const Dashboard: React.FC = () => {
  const { tasks, deleteTask } = useTasks();
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter tasks to only those belonging to the current user
  const userTasks = tasks.filter(task => task.userId === user?.sub);

  // Apply status filter
  const filteredTasks = statusFilter === 'all' 
    ? userTasks 
    : userTasks.filter(task => task.status === statusFilter);

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-header">
        <h1>My Tasks</h1>
        <Link to="/task/new" className="create-task-btn">Create New Task</Link>
      </div>
      <div className="filter-controls">
        <label>Filter by status:</label>
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value={TaskStatus.TODO}>{TaskStatus.TODO}</option>
          <option value={TaskStatus.IN_PROGRESS}>{TaskStatus.IN_PROGRESS}</option>
          <option value={TaskStatus.COMPLETED}>{TaskStatus.COMPLETED}</option>
        </select>
      </div>
      <div className="tasks-container">
        <TaskList tasks={filteredTasks} onDelete={deleteTask} />
      </div>
    </div>
  );
};

export default Dashboard;
