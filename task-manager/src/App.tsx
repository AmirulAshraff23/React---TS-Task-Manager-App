import React from 'react';
import '../src/styles/App.css' // You can create this file for your styles
import TaskList from './components/TaskList';


const App: React.FC = () => {
    return (
        <div className="container">
            <h1>Task Management App</h1>
            <p> Time to get work done</p>
            <TaskList />
        </div>
    );
};

export default App;
