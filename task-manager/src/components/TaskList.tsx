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

    const addTask = () => {
        if (newTaskDescription.trim() === '') return; // Check for empty input
        const newTask: TaskItem = {
            id: tasks.length + 1, // Next number for job
            title: newTaskTitle, // Use user input for job name
            description: newTaskDescription, // Use user input
        };
        setTasks([...tasks, newTask]); // Add new job to list
        setNewTaskTitle(''); // Clear job input after adding
        setNewTaskDescription(''); // Clear input after adding
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
            <button className="btn btn-primary mb-3" onClick={addTask}>Add Task</button> {/* Button make new job */}

            {/* Show tasks here */}

            {tasks.map((task: TaskItem) => (
                <Task key={task.id} id={task.id} title={task.title} description={task.description} /> 
            ))}


        </div>
    );
};

export default TaskList;
