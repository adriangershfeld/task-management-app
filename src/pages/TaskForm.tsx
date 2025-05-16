// TaskForm page for creating and editing tasks
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import { Task, TaskStatus, TaskPriority } from '../types';
import Navbar from '../components/Navbar';

const TaskForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addTask, updateTask, getTask } = useTasks();
  const { user } = useAuth();
  const isEditMode = Boolean(id);

  // Initial form state
  const initialFormState = {
    title: '',
    description: '',
    status: TaskStatus.TODO,
    priority: TaskPriority.MEDIUM,
    dueDate: new Date().toISOString().split('T')[0]
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // If editing, load task data
  useEffect(() => {
    if (isEditMode) {
      const taskToEdit = getTask(id || '');
      if (taskToEdit) {
        setFormData({
          title: taskToEdit.title,
          description: taskToEdit.description,
          status: taskToEdit.status,
          priority: taskToEdit.priority,
          dueDate: new Date(taskToEdit.dueDate).toISOString().split('T')[0]
        });
      } else {
        navigate('/');
      }
    }
  }, [id, isEditMode, getTask, navigate]);

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (isEditMode && id) {
      const existingTask = getTask(id);
      if (existingTask) {
        updateTask({
          ...existingTask,
          ...formData,
          dueDate: new Date(formData.dueDate).toISOString()
        });
      }
    } else {
      addTask({
        ...formData,
        dueDate: new Date(formData.dueDate).toISOString(),
        userId: user?.sub || ''
      });
    }
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <div className="task-form-container">
        <h2>{isEditMode ? 'Edit Task' : 'Create New Task'}</h2>
        <form className="task-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value={TaskStatus.TODO}>{TaskStatus.TODO}</option>
                <option value={TaskStatus.IN_PROGRESS}>{TaskStatus.IN_PROGRESS}</option>
                <option value={TaskStatus.COMPLETED}>{TaskStatus.COMPLETED}</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value={TaskPriority.LOW}>{TaskPriority.LOW}</option>
                <option value={TaskPriority.MEDIUM}>{TaskPriority.MEDIUM}</option>
                <option value={TaskPriority.HIGH}>{TaskPriority.HIGH}</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={errors.dueDate ? 'error' : ''}
            />
            {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => navigate('/')}>Cancel</button>
            <button type="submit" className="submit-btn">{isEditMode ? 'Update Task' : 'Create Task'}</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TaskForm;
