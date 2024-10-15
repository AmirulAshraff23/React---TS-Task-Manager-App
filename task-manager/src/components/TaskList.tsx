import React, { useState } from 'react';
import Task from './Task'; // Make sure this path is correct

interface TaskItem {
    id: number; // number for each job
    title: string; // job name
    description: string; // what job say
}

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<TaskItem[]>([]);  // List of jobs
    const [newTaskTitle, setNewTaskTitle] = useState(''); // New task name
    const [newTaskDescription, setNewTaskDescription] = useState(''); // New task description
    const [showWarning, setShowWarning] = useState(false); // Control showing the warning

    // Function to add a new task
    const addTask = () => {
        if (newTaskDescription.trim() === '' || newTaskTitle.trim() === '') return; // Check for empty input
        const newTask: TaskItem = {
            id: tasks.length + 1, // Next number for job
            title: newTaskTitle, // Use user input for job name
            description: newTaskDescription, // Use user input
        };
        setTasks([...tasks, newTask]); // Add new job to list
        setNewTaskTitle(''); // Clear job input after adding
        setNewTaskDescription(''); // Clear input after adding
    };

    // Function to clear all tasks
    const clearAllTasks = () => {
        setTasks([]); // Clear all tasks
        setShowWarning(false); // Hide the warning after clearing
    };

    return (
        <div>
            {/* Input for job name */}
            <input
                type="text"
                value={newTaskTitle} // Use state for job name input
                onChange={(e) => setNewTaskTitle(e.target.value)} // Update job name state
                placeholder="Enter task title" // Tell user what to do
                className="form-control mb-3" // Bootstrap styling
            />

            {/* Input for job description */}
            <input
                type="text"
                value={newTaskDescription} // Use state for description input
                onChange={(e) => setNewTaskDescription(e.target.value)} // Update description state
                placeholder="Enter task description" // Tell user what to do
                className="form-control mb-3" // Bootstrap styling
            />
            
            {/* Button to add a new task */}
            <button className="btn btn-primary mb-3" onClick={addTask}>Add Task</button> {/* Button make new job */}

            {/* Button to trigger the warning for clearing all tasks */}
            <button className="btn btn-danger mb-3" onClick={() => setShowWarning(true)}>Clear All Tasks</button>

            {/* Show the warning when the user clicks 'Clear All Tasks' */}
            {showWarning && (
                <div className="alert alert-warning">
                    <p>This will delete all current tasks! Are you sure?</p>
                    <button className="btn btn-danger" onClick={clearAllTasks}>Yes</button>
                    <button className="btn btn-secondary" onClick={() => setShowWarning(false)}>No</button>
                </div>
            )}

            {/* Show tasks here */}
            {tasks.map((task: TaskItem) => (
                <Task key={task.id} id={task.id} title={task.title} description={task.description} /> 
            ))}
        </div>
    );
};

export default TaskList;
