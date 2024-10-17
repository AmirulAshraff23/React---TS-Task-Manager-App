import React, { useState } from 'react';
import '../src/styles/App.css';
import TaskList from './components/TaskList';
import { TaskItem } from './components/TaskList'; // Import TaskItem type

const App: React.FC = () => {
    // Specify the type for tasks state
    const [tasks, setTasks] = useState<TaskItem[]>([]); // Create state for tasks

    return (
        <div className="container">
            <h1>Task Management App</h1>
            <p>Time to get work done</p>
            <TaskList tasks={tasks} setTasks={setTasks} /> {/* Pass setTasks prop */}
        </div>
    );
};

export default App;
