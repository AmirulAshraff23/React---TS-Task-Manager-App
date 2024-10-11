import React from 'react';

const TaskList: React.FC = () => {
    const handleAddTask = () => {
        console.log("New task added!"); // We will make it better later
    };

    return (
        <div>
            <h2>Tasks</h2>
            <ul>
                <li>Task 1</li>
                <li>Task 2</li>
                <li>Task 3</li>
            </ul>
            <button onClick={handleAddTask} style={{ padding: '10px 20px', fontSize: '16px' }}>
                Add!
            </button>
        </div>
    );
};

export default TaskList;
