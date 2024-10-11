import React from 'react';
import './styles/App.css'; // You can create this file for your styles
import TaskList from './components/TaskList';


const App: React.FC = () => {
    return (
        <div className="container">
            <h1>Task Management App</h1>
            <TaskList />
        </div>
    );
};

export default App;