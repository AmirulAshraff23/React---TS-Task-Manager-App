import React, { useState } from 'react';
import Task from './Task';
import '../styles/App.css'; 

interface TaskItem {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
}

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [showWarning, setShowWarning] = useState(false); // Show warning for clear all

    const addTask = () => {
        if (newTaskDescription.trim() === '' || newTaskTitle.trim() === '') return;
        const newTask: TaskItem = {
            id: tasks.length + 1,
            title: newTaskTitle,
            description: newTaskDescription,
            isCompleted: false
        };
        setTasks([...tasks, newTask]);
        setNewTaskTitle('');
        setNewTaskDescription('');
    };

    const toggleCompleteTask = (id: number) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        ));
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const clearAllTasks = () => {
        setTasks([]); // Clear all tasks
        setShowWarning(false); // Hide warning after clear
    };

    return (
        <div>
            <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter task title"
                className="form-control mb-3"
            />
            <input
                type="text"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                placeholder="Enter task description"
                className="form-control mb-3"
            />
            <button className="btn btn-primary mb-3" onClick={addTask}>Add Task</button>

            {/* Clear all tasks button */}
            <button className="btn btn-danger mb-3" onClick={() => setShowWarning(true)}>Clear All Tasks</button>

            {showWarning && ( // Show warning when clear all button is clicked
                <div className="alert alert-warning">
                    <p>This will delete all current tasks! Are you sure?</p>
                    <button className="btn btn-danger" onClick={clearAllTasks}>Yes</button>
                    <button className="btn btn-secondary" onClick={() => setShowWarning(false)}>No</button>
                </div>
            )}

            {tasks.map((task: TaskItem) => (
                <Task
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    isCompleted={task.isCompleted}
                    onComplete={() => toggleCompleteTask(task.id)}
                    onDelete={() => deleteTask(task.id)}
                />
            ))}
        </div>
    );
};

export default TaskList;
