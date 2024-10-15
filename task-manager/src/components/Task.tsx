import React from 'react';

interface TaskProps {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    onComplete: () => void;
    onDelete: () => void;
}

const Task: React.FC<TaskProps> = ({ id, title, description, isCompleted, onComplete, onDelete }) => {
    return (
        <div className={`task ${isCompleted ? 'completed-task' : ''}`}> {/* Conditionally add class */}
            <div className="task-text"> 
                <h4>{title}</h4> 
                <p>{description}</p> 
            </div>
            
            <input
                type="checkbox"
                className="task-checkbox"  
                checked={isCompleted}
                onChange={onComplete}
            />
            
            {isCompleted && <span className="complete-text">Complete</span>} 

            <button className="task-delete" onClick={onDelete}>X</button> 
        </div>
    );
};

export default Task;
